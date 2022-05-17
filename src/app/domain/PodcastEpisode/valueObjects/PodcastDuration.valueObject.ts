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

  public toHHMMSS(): string {
    const hours = Math.floor(this.value / 3600);
    const minutes = Math.floor((this.value - hours * 3600) / 60);
    const seconds = this.value - hours * 3600 - minutes * 60;

    const hourFixed = hours < 10 ? `0${hours}` : hours;
    const minuteFixed = minutes < 10 ? `0${minutes}` : minutes;
    const secondFixed = seconds < 10 ? `0${seconds}` : seconds;

    return `${hourFixed}:${minuteFixed}:${secondFixed}`;
  }

  override toString(): string {
    // return "x horas y y minutos";
    const hours = Math.floor(this.value / 3600);
    const minutes = Math.floor((this.value - hours * 3600) / 60);

    return `${hours} horas y ${minutes} minutos`;
  }
}
