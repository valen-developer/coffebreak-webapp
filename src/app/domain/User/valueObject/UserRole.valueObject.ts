import { NotNullValueObject } from '../../Shared/valueObjects/NotNull.valueObject';

export type USER_ROLE = 'ADMIN' | 'USER';

export class UserRole extends NotNullValueObject<USER_ROLE> {
  constructor(value: USER_ROLE) {
    super(value, 'UserRole');

    this.validate();
  }

  private validate(): void {
    this.isValid();
  }

  private isValid(): void {
    const isValid = this.value === 'ADMIN' || this.value === 'USER';

    if (isValid) return;

    // TODO: make custom error
    throw new Error(`UserRole is invalid.`);
  }
}
