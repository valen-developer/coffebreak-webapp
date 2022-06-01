import { NotNullValueObject } from '../../Shared/valueObjects/NotNull.valueObject';

export class UserEmail extends NotNullValueObject<string> {
  constructor(value: string) {
    super(value, 'UserEmail');
    this.validate();
  }

  private validate(): void {
    if (!UserEmail.isValid(this.value)) {
      // TODO: make custom error
      throw new Error('email inválido');
    }
  }

  public static isValid(email: string): boolean {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  }
}
