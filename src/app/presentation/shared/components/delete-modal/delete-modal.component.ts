import { Component, EventEmitter, OnInit } from '@angular/core';
import { IModal } from '../../modules/modal/modal.interface';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent
  implements OnInit, IModal<InitialState, boolean>
{
  initialState!: InitialState;
  responseEmitter: EventEmitter<boolean> = new EventEmitter();
  closeEmitter: EventEmitter<void> = new EventEmitter();

  constructor() {}

  onSubmit(): void {
    this.responseEmitter.emit(true);
  }

  hide(): void {
    this.closeEmitter.emit();
  }

  ngOnInit(): void {}
}

interface InitialState {
  title: string;
}
