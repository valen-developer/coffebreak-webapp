import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements OnInit, OnDestroy {
  public formControl = new FormControl('');
  private formControlSubscription!: Subscription;

  @Output() searchEmitter = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    this.formControlSubscription = this.formControl.valueChanges
      .pipe(debounceTime(400))
      .subscribe({
        next: (value) => this.onChangeValue(value),
      });
  }

  ngOnDestroy(): void {
    this.formControlSubscription?.unsubscribe();
  }

  public onChangeValue(value: string): void {
    this.searchEmitter.emit(value);
  }
}
