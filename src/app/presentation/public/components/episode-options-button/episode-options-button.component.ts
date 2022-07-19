import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { computePosition, flip, offset, shift } from '@floating-ui/dom';
import { debounceTime, fromEvent, Subscription } from 'rxjs';
import { DOMService } from 'src/app/presentation/shared/services/dom.service';

@Component({
  selector: 'app-episode-options-button',
  templateUrl: './episode-options-button.component.html',
  styleUrls: ['./episode-options-button.component.scss'],
})
export class EpisodeOptionsButtonComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('optionsButton', { static: true })
  private optionButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('options', { static: true })
  private optionDiv!: ElementRef<HTMLDivElement>;
  @ViewChild('playlists', { static: true })
  private isOptionsOpen = false;

  @Output() addPlaylistEmitter = new EventEmitter<null>();

  private isClickDocument = false;
  private documentClickSubscription!: Subscription;

  constructor(private domService: DOMService, private renderer: Renderer2) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.computeOptionPosition();

    const document = this.domService.getDocument();
    if (document)
      this.documentClickSubscription = fromEvent(document, 'click').subscribe({
        next: () => {
          if (!this.isClickDocument) {
            this.isClickDocument = true;
            return;
          }
          this.closeOptions();
          this.isOptionsOpen = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.documentClickSubscription?.unsubscribe();
  }

  private computeOptionPosition(): void {
    const isBrowser = this.domService.isBrowser();
    if (!isBrowser) return;

    computePosition(
      this.optionButton.nativeElement,
      this.optionDiv.nativeElement,
      {
        placement: 'bottom',
        middleware: [offset(10), shift({ padding: 10 }), flip()],
      }
    ).then((computed) => {
      const { x, y } = computed;

      this.renderer.setStyle(this.optionDiv.nativeElement, 'left', `${x}px`);
      this.renderer.setStyle(this.optionDiv.nativeElement, 'top', `${y}px`);
    });
  }

  private closeOptions(): void {
    this.renderer.setStyle(this.optionDiv.nativeElement, 'display', 'none');
  }

  private openOptions(): void {
    this.computeOptionPosition();
    this.renderer.setStyle(this.optionDiv.nativeElement, 'display', 'block');
  }

  public toggleOptions(): void {
    this.isClickDocument = false;

    if (this.isOptionsOpen) this.closeOptions();
    if (!this.isOptionsOpen) this.openOptions();

    this.isOptionsOpen = !this.isOptionsOpen;
  }

  public onAddToPlaylist(): void {
    this.addPlaylistEmitter.emit();
    this.toggleOptions();
  }
}
