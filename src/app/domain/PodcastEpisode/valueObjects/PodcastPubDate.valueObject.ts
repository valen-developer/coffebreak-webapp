import { DateValueObject } from '../../Shared/valueObjects/Date.valueObject';

export class PodcastPubDate extends DateValueObject {
  constructor(value: Date) {
    super(value, 'PodcastPubDate');
  }

  public static fromString(value: string): PodcastPubDate {
    return new PodcastPubDate(new Date(value));
  }
}
