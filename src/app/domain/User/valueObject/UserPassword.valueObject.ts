import { NotNullValueObject } from '../../Shared/valueObjects/NotNull.valueObject';
import { ValueObject } from '../../Shared/valueObjects/ValueObject.interface';

export class UserPassword implements ValueObject {
  public readonly value: string;
  constructor(value: string) {
    this.value = value;
  }

  public static validate(value: string): void {
    this.isValidLong(value);
    this.isValidComposed(value);
  }

  private static isValidLong(value: string): void {
    const MIN_LONG = 8;
    const MAX_LONG = 20;

    const isValid = value.length >= MIN_LONG && value.length <= MAX_LONG;

    if (isValid) return;

    // TODO: make custom error
    throw new Error(
      `La contraseña debe tener entre ${MIN_LONG} y ${MAX_LONG} caracteres`
    );
  }

  private static isValidComposed(value: string): void {
    // should contain at least: one lowercase, one upper, one number
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    const isValid = regex.test(value);

    if (isValid) return;

    // TODO: make custom error
    throw new Error(
      `La contraseña debe tener al menos una letra minúscula, una mayúscula y un número`
    );
  }
}
