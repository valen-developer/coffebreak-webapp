import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import {
  arrow,
  computePosition,
  ComputePositionConfig,
  flip,
  MiddlewareData,
  offset,
  Placement,
  shift,
} from '@floating-ui/dom';
import { TooltipComponent } from './tooltip/tooltip.component';

@Directive({
  selector: '[Tooltip]',
})
export class TooltipDirective implements OnChanges {
  @Input() text: string = 'tooltip';
  @Input() placement: Placement = 'bottom';

  private toolTipRef!: ComponentRef<TooltipComponent>;
  private toolTipElement!: HTMLElement;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private componentFactoryResolver: ComponentFactoryResolver,
    private containerRef: ViewContainerRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.buildToolTipComponent();

    this.positionedTooltip().then(() => this.addListeners());
  }

  private buildToolTipComponent(): void {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(TooltipComponent);

    const componentRef = this.containerRef.createComponent(componentFactory);
    this.toolTipRef = componentRef;

    if (!this.toolTipRef) return;

    const tooltipComponent = this.toolTipRef.instance as TooltipComponent;
    tooltipComponent.text = this.text;
  }

  private async positionedTooltip(): Promise<void> {
    if (!this.toolTipRef) return;

    const toolTipElement = this.toolTipRef.instance.tooltip;
    const arrowElement = this.toolTipRef.instance.arrow;

    const computeOptions: Partial<ComputePositionConfig> = {
      placement: this.placement,
      middleware: [
        flip(),
        shift(),
        offset(8),
        arrow({ element: arrowElement.nativeElement, padding: 5 }),
      ],
    };

    const computedPosition = await computePosition(
      this.el.nativeElement,
      toolTipElement.nativeElement,
      computeOptions
    );

    const { x, y, middlewareData, placement } = computedPosition;

    this.renderer.setStyle(toolTipElement.nativeElement, 'left', `${x}px`);
    this.renderer.setStyle(toolTipElement.nativeElement, 'top', `${y}px`);

    this.setArrowPosition(
      arrowElement.nativeElement,
      placement,
      middlewareData
    );
  }

  private setArrowPosition(
    arrow: HTMLElement,
    placement: Placement,
    middlewareData: MiddlewareData
  ): void {
    const arrowData = middlewareData.arrow;

    if (!arrowData) return;

    const { x: arrowX, y: arrowY } = arrowData;

    const staticSide = {
      top: 'bottom',
      right: 'left',
      bottom: 'top',
      left: 'right',
    }[placement.split('-')[0]];

    this.renderer.setStyle(arrow, 'left', `${(arrowX ?? 0) + 3}px`);
    this.renderer.setStyle(arrow, 'top', `${arrowY ?? ''}px`);

    if (!staticSide) return;

    this.renderer.setStyle(arrow, staticSide, '-4px');
  }

  private showArrow(): void {
    const tooltip = this.toolTipRef.instance.tooltip.nativeElement;
    this.renderer.setStyle(tooltip, 'display', 'flex');
  }

  private hideArrow(): void {
    const tooltip = this.toolTipRef.instance.tooltip.nativeElement;
    this.renderer.setStyle(tooltip, 'display', 'none');
  }

  private addListeners(): void {
    const mouseenterListener = this.renderer.listen(
      this.el.nativeElement,
      'mouseenter',
      () => {
        this.positionedTooltip();
        this.showArrow();
      }
    );

    const mouseleaveListener = this.renderer.listen(
      this.el.nativeElement,
      'mouseleave',
      () => {
        this.hideArrow();
      }
    );
  }
}
