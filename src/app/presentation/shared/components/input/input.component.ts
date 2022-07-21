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
  @Input() typeConstant: 'text' | 'password' = 'text';

  public type: 'text' | 'password' = 'text';

  public isPassword = false;
  public isVisible = false;

  // value accesor functions
  onTouched!: (value: string) => void;
  onChange!: (value: string) => void;

  constructor() {}
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}

  ngOnInit(): void {
    this.isPassword = this.typeConstant === 'password';
    this.type = this.typeConstant;
  }

  public hasError(): boolean {
    return this.formControl.invalid && this.formControl.touched;
  }

  public error(): string {
    return this.formControl.hasError('required')
      ? 'El campo es requerido'
      : this.formControl.hasError('email')
      ? 'El campo debe ser un email'
      : this.formControl.hasError('minlength')
      ? `Minimo de caracteres invalido`
      : this.formControl.hasError('maxlength')
      ? `Maximo de caracteres invalido`
      : '';
  }

  public onClear(event: MouseEvent): void {
    console.log('Press');
    event.preventDefault();
    event.stopPropagation();
    this.formControl.setValue('');

    this.input?.nativeElement.focus();
  }

  public changeVisibility(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.isVisible = !this.isVisible;
    this.type = this.isVisible ? 'text' : 'password';
  }
}
