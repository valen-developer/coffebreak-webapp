import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  Renderer2,
} from '@angular/core';
import { Nullable } from 'src/app/domain/Shared/types/Nullable.type';

const dropzoneClassStyle = {
  onDragging: 'dragging',
};

@Directive({
  selector: '[appDropzone]',
})
export class DropzoneDirective {
  private file!: File;

  @Output() private fileEmitter = new EventEmitter<File>();

  constructor(private renderer2: Renderer2, private el: ElementRef) {}

  @HostListener('dragover', ['$event']) onDragEnter(event: DragEvent) {
    this._preventDefault(event);
    if (this.file) return;
    this.changeBorder('secondary');
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event: DragEvent) {
    if (this.file) return;

    this._preventDefault(event);
    this.changeBorder('--text-secondary');
  }

  @HostListener('drop', ['$event']) onDrop(event: DragEvent) {
    this.renderer2.removeClass(
      this.el.nativeElement,
      dropzoneClassStyle.onDragging
    );
    if (!event) return;

    const { dataTransfer } = event;
    if (!dataTransfer) return;

    this._preventDefault(event);
    const isValid = this.isValidFile(dataTransfer.files);
    if (!isValid) return this.changeBorder('danger');

    this.changeBorder('succes');
    this.file = dataTransfer.files[0];
    this.fileEmitter.emit(this.file);
  }

  private _preventDefault(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  private isValidFile(file: Nullable<FileList>): boolean {
    if (!file) return false;

    if (file.length > 1) return false;
    if (!file[0]?.name) return false;

    const extension = this.fileExtension(file[0].name);
    const validExtensions = ['png', 'jpg', 'jpeg'];

    const isValidExtension = validExtensions.includes(extension);

    return isValidExtension;
  }

  private changeBorder(color: string): void {
    this.renderer2.setStyle(
      this.el.nativeElement,
      'border-color',
      `var(--${color})`
    );
  }

  private fileExtension(fileName: string): string {
    const split = fileName.split('.');
    return split[split.length - 1];
  }
}
