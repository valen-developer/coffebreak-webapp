export interface PodcastEpisodeQuery {
  uuid_equals?: string;
  title_contains?: string;
  pubDate_lte?: Date;
  pubDate_gte?: Date;
  description_contains?: string;
  duration_lte?: number;
  duration_gte?: number;
}
