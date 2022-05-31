import { DateValueObject } from '../../Shared/valueObjects/Date.valueObject';

export class PodcastPubDate extends DateValueObject {
  constructor(value: Date) {
    super(value, 'PodcastPubDate');
  }

  public static fromString(value: string): PodcastPubDate {
    return new PodcastPubDate(new Date(value));
  }

  public toDDMMYYYY(): string {
    return this.value.toLocaleDateString('es-Es', {
      day: 'numeric',
      month: '2-digit',
      year: 'numeric',
    });
  }
}
