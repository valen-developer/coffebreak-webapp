import { Component } from '@angular/core';
import { UserLogger } from './application/Auth/UserLogger.service';

import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { DOMService } from './presentation/shared/services/dom.service';
import { Events } from './domain/PodcastEpisode/constants/Events';
import { AlertService } from './presentation/shared/modules/alert/alert.service';
import { PlaylistDTO } from './domain/Playlist/Playlist.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'webapp';

  constructor(
    private domService: DOMService,
    private userLogger: UserLogger,
    private alert: AlertService
  ) {
    this.tryLogin();
    this.initSocket();
  }

  private tryLogin(): void {
    this.userLogger.loginWithToken().catch(() => {});
  }

  private initSocket(): void {
    if (!this.domService.isBrowser()) return;

    const socket = io(environment.socketUrl);
    socket.on('connect', () => {
      console.log('Connected');
    });

    socket.on(Events.NEW_CHANNEL, (data: PlaylistDTO) => {
      this.alert.info({
        message: `Nuevo canal: ${data.name} añadido`,
        subtitle: `${data.name} - ${data.episodes?.length} episodios`,
      });
    });
  }
}
