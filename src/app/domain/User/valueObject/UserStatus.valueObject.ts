import { NotNullValueObject } from '../../Shared/valueObjects/NotNull.valueObject';

export type USER_STATUS = 'ACTIVE' | 'INACTIVE';

export class UserStatus extends NotNullValueObject<USER_STATUS> {
  constructor(value: USER_STATUS) {
    super(value, 'UserStatus');

    this.verify();
  }

  private verify(): void {
    this.isValid();
  }

  private isValid(): void {
    const isValid = this.value === 'ACTIVE' || this.value === 'INACTIVE';

    if (isValid) return;

    // TODO: make custom error
    throw new Error(`UserStatus is invalid.`);
  }

  public isActive(): boolean {
    return this.value === 'ACTIVE';
  }
}
