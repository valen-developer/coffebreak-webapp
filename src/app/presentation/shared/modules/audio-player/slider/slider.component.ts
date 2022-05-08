import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit, OnChanges {
  @Input() percent = 0;

  @Output() changeEmitter: EventEmitter<number> = new EventEmitter<number>();

  public formControl: FormControl;

  constructor(private fb: FormBuilder) {
    this.formControl = this.fb.control([this.percent * 100]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.formControl.setValue((this.percent ?? 0) * 100, { emitEvent: false });
  }

  ngOnInit(): void {
    this.formControl.valueChanges.pipe(debounceTime(300)).subscribe({
      next: (value) => this.onChange(value),
    });
  }

  public onChange(value: number): void {
    const percent = value / 100;
    this.changeEmitter.emit(percent);
  }
}
