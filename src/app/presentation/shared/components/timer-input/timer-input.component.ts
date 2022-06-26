import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-timer-input',
  templateUrl: './timer-input.component.html',
  styleUrls: ['./timer-input.component.scss'],
})
export class TimerInputComponent implements OnChanges {
  @Input() label!: string;
  @Input() control: FormControl = new FormControl(0);
  @Input() min = 0;
  @Input() max = 60;

  @Output() valueEmitter: EventEmitter<number> = new EventEmitter();

  constructor() {
    this.control.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      const isGreaterThanMax = value > this.max;
      const isLessThanMin = value < this.min;

      if (isGreaterThanMax) {
        this.control.setValue(this.max, { emitEvent: false });
      }

      if (isLessThanMin) {
        this.control.setValue(this.min, { emitEvent: false });
      }

      this.emit();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {}

  public onAdd(event: MouseEvent): void {
    event.preventDefault();

    const { value } = this.control;
    if (value >= this.max) return;

    this.control.setValue(this.control.value + 1);
    this.emit();
  }

  public onSubtract(event: MouseEvent): void {
    event.preventDefault();

    const { value } = this.control;
    if (value <= this.min) return;

    this.control.setValue(this.control.value - 1);
    this.emit();
  }

  private emit(): void {
    this.valueEmitter.emit(this.control.value);
  }
}
