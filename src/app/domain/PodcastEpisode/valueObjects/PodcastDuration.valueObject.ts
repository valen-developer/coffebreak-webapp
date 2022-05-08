import { NotNullValueObject } from '../../Shared/valueObjects/NotNull.valueObject';

export class PodcastDuration extends NotNullValueObject<number> {
  constructor(value: number) {
    super(value, 'PodcastDuration');
  }

  /**
   *
   * @param value HH:MM:SS format
   */
  public static fromString(value: string): PodcastDuration {
    if (value.split(':').length !== 3)
      throw new Error('PodcastDuration.fromString: invalid format');

    const [hours, minutes, seconds] = value.split(':');

    return new PodcastDuration(
      parseInt(hours, 10) * 60 * 60 +
        parseInt(minutes, 10) * 60 +
        parseInt(seconds, 10)
    );
  }
}
