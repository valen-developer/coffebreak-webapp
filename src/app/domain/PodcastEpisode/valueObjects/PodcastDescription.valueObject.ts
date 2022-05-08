import { NotNullValueObject } from '../../Shared/valueObjects/NotNull.valueObject';

export class PodcastDescription extends NotNullValueObject<string> {
  constructor(value: string) {
    super(value, 'PodcastTitle');
  }
}
