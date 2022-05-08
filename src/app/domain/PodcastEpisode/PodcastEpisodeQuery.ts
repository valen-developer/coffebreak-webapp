export interface PodcastEpisodeQuery {
  title_contains?: string;
  pubDate_lte?: Date;
  pubDate_gte?: Date;
  description_contains?: string;
  duration_lte?: number;
  duration_gte?: number;
}
