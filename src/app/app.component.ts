import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';

import { io } from 'socket.io-client';

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
  title = 'webapp';

  constructor(
    private meta: Meta,
    private domService: DOMService,
    private alert: AlertService,
    private router: Router
  ) {
    // this.addMetaTags();
    this.initSocket();
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

  private addMetaTags(): void {
    if (!this.domService.isBrowser()) return;

    this.meta.addTag({ name: 'description', content: 'Podcast de ciencia' });
    this.meta.addTag({
      name: 'keywords',
      content: 'podcast, ciencia, física, biología, arqueología, astronomía',
    });

    // make a preview url for social media
    const url = `${window.location.origin}${window.location.pathname}`;
    this.meta.addTag({ name: 'og:url', content: url });
    this.meta.addTag({
      name: 'og:title',
      content: 'Coffeebreak: señal y ruido',
    });
    this.meta.addTag({ name: 'og:description', content: 'Podcast de ciencia' });
    this.meta.addTag({
      name: 'og:image',
      content: 'https://coffeebreakpodcast.app/assets/images/cover.png',
    });
    this.meta.addTag({ name: 'og:image:type', content: 'image/png' });
    this.meta.addTag({ name: 'og:image:width', content: '630' });
    this.meta.addTag({ name: 'og:image:height', content: '630' });
    this.meta.addTag({ name: 'og:image:alt', content: 'Coffeebreak' });
    this.meta.addTag({ name: 'og:type', content: 'website' });
    this.meta.addTag({ name: 'og:site_name', content: 'Coffeebreak' });
    this.meta.addTag({ name: 'og:locale', content: 'es_ES' });
  }
}
