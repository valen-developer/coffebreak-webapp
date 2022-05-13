import { NotNullValueObject } from '../../Shared/valueObjects/NotNull.valueObject';

export class PlaylistDescription extends NotNullValueObject<string> {
  constructor(value: string) {
    super(value, 'PlaylistDescription');
  }
}
