import { NotNullValueObject } from './NotNull.valueObject';

export class UUID extends NotNullValueObject<string> {
  constructor(value: string) {
    super(value, 'UUID');
  }

  public isSame(other: UUID): boolean {
    return this.value === other.value;
  }
}
