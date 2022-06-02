import {
  Component,
  ComponentRef,
  ElementRef,
  OnInit,
  Renderer2,
  RendererFactory2,
  Type,
  ViewChild,
} from '@angular/core';
import { ModalDirective } from './modal.directive';
import { IModal } from './modal.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @ViewChild('wrapper') private wrapperElement!: ElementRef<HTMLDivElement>;
  @ViewChild('container') private containerElement!: ElementRef<HTMLDivElement>;
  @ViewChild(ModalDirective) private modal!: ModalDirective;
  public display = false;

  private componentRef!: ComponentRef<IModal<any, any>>;
  private renderer: Renderer2;

  private hideOnBackgroundClick = true;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  ngOnInit(): void {}

  public show<T, U>(
    component: Type<IModal<T, U>>,
    initialState: T,
    hideOnBackgroundClick = true
  ): Promise<U> {
    this.display = true;
    this.hideOnBackgroundClick = hideOnBackgroundClick;

    const viewContainer = this.modal.viewComponentRef;
    viewContainer.clear();
    this.componentRef = viewContainer.createComponent<IModal<T, U>>(component);
    this.componentRef.instance.initialState = initialState;

    return new Promise((resolve, reject) => {
      this.componentRef.instance.responseEmitter.subscribe((data: U) => {
        resolve(data);
        this.hide();
      });

      this.componentRef.instance.closeEmitter.subscribe(() => {
        this.hide();
      });
    });
  }

  public hide() {
    this.addFadeOutAnimation().then(() => {
      this.componentRef.destroy();
      this.display = false;
      this.removeFadeOutAnimation();
    });
  }

  public onBackgroundClick(event: MouseEvent) {
    if (!this.hideOnBackgroundClick) return;

    const target = event?.target as HTMLElement;
    let classes: string[] = [];
    target?.classList.forEach((className) => {
      classes.push(className);
    });

    const isBackground = classes.includes('modal-wrapper');
    if (isBackground) this.hide();
  }

  private addFadeOutAnimation(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.renderer.listen(
        this.wrapperElement.nativeElement,
        'animationend',
        () => {
          resolve();
        }
      );

      this.renderer.addClass(
        this.containerElement.nativeElement,
        'animate__fadeOutUp'
      );

      this.renderer.addClass(
        this.wrapperElement.nativeElement,
        'animate__fadeOut'
      );
    });
  }

  private removeFadeOutAnimation(): void {
    this.renderer.removeClass(
      this.containerElement.nativeElement,
      'animate__fadeOutUp'
    );

    this.renderer.removeClass(
      this.wrapperElement.nativeElement,
      'animate__fadeOut'
    );
  }
}
