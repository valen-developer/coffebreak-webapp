import { Nullable } from '../../Shared/types/Nullable.type';
import { ValueObject } from '../../Shared/valueObjects/ValueObject.interface';

export class PlaylistOwn implements ValueObject {
  public readonly value: Nullable<string>;

  constructor(value: Nullable<string>) {
    this.value = value;
  }
}
