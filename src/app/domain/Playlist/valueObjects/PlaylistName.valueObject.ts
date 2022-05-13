import { NotNullValueObject } from '../../Shared/valueObjects/NotNull.valueObject';

export class PlaylistName extends NotNullValueObject<string> {
  constructor(value: string) {
    super(value, 'PlaylistName');
  }
}
