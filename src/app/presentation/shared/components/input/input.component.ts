import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true,
    },
  ],
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @ViewChild('input', { static: true }) input!: ElementRef<HTMLInputElement>;

  @Input() placeholder: string = 'Introduce tu texto';
  @Input() formControl: FormControl = new FormControl('');

  // value accesor functions
  onTouched!: (value: string) => void;
  onChange!: (value: string) => void;

  constructor() {}
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}

  ngOnInit(): void {}

  public onClear(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.formControl.setValue('');

    this.input?.nativeElement.focus();
  }
}
