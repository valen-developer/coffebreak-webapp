import { EventEmitter, Input } from '@angular/core';

export abstract class IModal<T, U> {
  abstract initialState: T;
  abstract responseEmitter: EventEmitter<U>;
  abstract closeEmitter: EventEmitter<void>;
  abstract onSubmit(): void;
  abstract hide(): void;
}
