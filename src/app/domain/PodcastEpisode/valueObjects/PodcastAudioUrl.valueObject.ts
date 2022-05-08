import { NotNullValueObject } from '../../Shared/valueObjects/NotNull.valueObject';

export class PodcastAudioUrl extends NotNullValueObject<string> {
  constructor(value: string) {
    super(value, 'PodcastAudioUrl');
  }
}
