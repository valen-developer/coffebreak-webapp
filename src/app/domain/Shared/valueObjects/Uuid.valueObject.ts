import { NotNullValueObject } from "./NotNull.valueObject";

export class UUID extends NotNullValueObject<string> {
  constructor(value: string) {
    super(value, "UUID");
  }
}
