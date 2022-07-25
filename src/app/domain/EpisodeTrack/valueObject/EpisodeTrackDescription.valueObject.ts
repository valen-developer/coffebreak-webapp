import { NotNullValueObject } from '../../Shared/valueObjects/NotNull.valueObject';

export class EpisodeTrackDescription extends NotNullValueObject<string> {
  constructor(value: string) {
    super(value, 'EpisodeTrackDescription');
  }
}
