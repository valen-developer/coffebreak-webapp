import { PodcastEpisode } from '../../PodcastEpisode/PodcastEpisode.model';
import { Playlist } from '../Playlist.model';

export abstract class PlaylistRepository {
  public abstract save(
    playlist: Playlist,
    image: Blob | File
  ): Promise<Playlist>;
  public abstract update(playlist: Playlist): Promise<void>;
  public abstract delete(uuid: string): Promise<void>;

  public abstract getPlaylist(uuid: string): Promise<Playlist>;
  public abstract getPlaylistByOwn(own: string): Promise<Playlist[]>;
  public abstract getChannels(): Promise<Playlist[]>;

  public abstract getEpisodes(playlist: string): Promise<PodcastEpisode[]>;
  public abstract addEpisode(
    playlist: Playlist,
    episode: PodcastEpisode
  ): Promise<void>;
  public abstract removeEpisode(
    playlist: Playlist,
    episode: PodcastEpisode
  ): Promise<void>;
}
