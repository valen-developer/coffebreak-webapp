import { NotNullValueObject } from '../../Shared/valueObjects/NotNull.valueObject';

export class PodcastTitle extends NotNullValueObject<string> {
  constructor(value: string) {
    super(value, 'PodcastTitle');
  }
}
