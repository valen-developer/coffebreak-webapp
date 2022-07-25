import { NotNullValueObject } from '../../Shared/valueObjects/NotNull.valueObject';

export class EpisodeTrackTime extends NotNullValueObject<string> {
  constructor(value: string) {
    super(value, 'EpisodeTrackTime');

    this.isValidFormat(value);
  }

  private isValidFormat(value: string): void {
    //Format valid: 00:00:00
    const isValid = /^\d{2}:\d{2}:\d{2}$/.test(value);

    if (!isValid)
      throw new Error(`Invalid format for EpisodeTrackTime: ${value}`);
  }

  public toSeconds(): number {
    const [hours, minutes, seconds] = this.value
      .split(':')
      .map((v) => parseInt(v));

    return hours * 3600 + minutes * 60 + seconds;
  }
}
