import { NotNullValueObject } from '../../Shared/valueObjects/NotNull.valueObject';

export class UserName extends NotNullValueObject<string> {
  constructor(value: string) {
    super(value, 'UserName');
  }
}
