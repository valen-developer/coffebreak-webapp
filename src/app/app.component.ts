import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { io } from 'socket.io-client';

import { SwUpdate } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { PlaylistDTO } from './domain/Playlist/Playlist.model';
import { Events } from './domain/PodcastEpisode/constants/Events';
import { PodcastEpisodeDTO } from './domain/PodcastEpisode/PodcastEpisode.model';
import { AlertService } from './presentation/shared/modules/alert/alert.service';
import { DOMService } from './presentation/shared/services/dom.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Coffeebreak: Señal y ruido';

  constructor(
    private swUpdate: SwUpdate,
    private domService: DOMService,
    private alert: AlertService,
    private router: Router
  ) {
    this.subscribeToUpdates();
  }

  private initSocket(): void {
    if (!this.domService.isBrowser()) return;

    const socket = io(environment.socketUrl);
    socket.on('connect', () => {
      console.log('Connected');
    });

    socket.on(Events.NEW_EPISODE, (episode: PodcastEpisodeDTO) => {
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

  private subscribeToUpdates(): void {
    if (!this.domService.isBrowser()) return;

    const window = this.domService.getWindow();

    this.swUpdate.versionUpdates.subscribe({
      next: () => {
        this.alert.info({
          message: `Actualización disponible 🎉`,
          subtitle: `Pulse para actualizar`,
          autoclose: false,
          onClick: () => {
            if (!window) return;

            window?.location?.reload();
          },
        });
      },
    });
  }
}
