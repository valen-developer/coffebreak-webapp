import { Component } from '@angular/core';
import { UserLogger } from './application/Auth/UserLogger.service';

import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { DOMService } from './presentation/shared/services/dom.service';
import { Events } from './domain/PodcastEpisode/constants/Events';
import { AlertService } from './presentation/shared/modules/alert/alert.service';
import { PlaylistDTO } from './domain/Playlist/Playlist.model';
import {
  PodcastEpisode,
  PodcastEpisodeDTO,
} from './domain/PodcastEpisode/PodcastEpisode.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'webapp';

  constructor(
    private domService: DOMService,
    private alert: AlertService,
    private router: Router
  ) {
    this.initSocket();
  }

  private initSocket(): void {
    if (!this.domService.isBrowser()) return;

    const socket = io(environment.socketUrl);
    socket.on('connect', () => {
      console.log('Connected');
    });

    socket.on(Events.NEW_EPISODE, (episode: PodcastEpisodeDTO) => {
      console.log(
        '🚀 ~ file: app.component.ts ~ line 33 ~ AppComponent ~ socket.on ~ episode',
        episode
      );
      this.alert.info({
        message: `Nuevo episodio 🥳`,
        subtitle: episode.title,
        autoclose: false,
        onClick: () => {
          this.router.navigate(['/episode', episode.uuid]);
        },
      });
    });

    socket.on(Events.NEW_CHANNEL, (channel: PlaylistDTO) => {
      this.alert.info({
        message: `Nuevo canal: ${channel.name} añadido`,
        subtitle: `${channel.name} - ${channel.episodes?.length} episodios`,
        autoclose: false,
        onClick: () => {
          this.router.navigate(['/playlist', channel.uuid]);
        },
      });
    });
  }
}
