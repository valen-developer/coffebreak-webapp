import { NotNullValueObject } from "./NotNull.valueObject";

export class DateValueObject extends NotNullValueObject<Date> {
  constructor(value: Date, name: string) {
    super(value, name);
  }

  ifAfter(date: Date): boolean {
    return this.value.getTime() > date.getTime();
  }
}
