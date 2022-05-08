import { ValueObject } from '../../Shared/valueObjects/ValueObject.interface';

export class PodcastImageUrl implements ValueObject {
  public readonly value: string;

  constructor(value: string) {
    this.value = value;
  }
}
