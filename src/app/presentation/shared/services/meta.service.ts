import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { DOMService } from './dom.service';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  constructor(private domService: DOMService, private meta: Meta) {}

  public setMetaForRRSS(rrssMetaDto: RRSSMeta): void {
    if (!this.domService.isBrowser()) return;
    /**
     * <!-- link preview for facebook -->
    <meta property="og:title" content="Coffeebreak: señal y ruido" />
    <meta property="og:description" content="Podcast de ciencia" />
    <meta
      property="og:image"
      content="https://coffeebreakpodcast.app/assets/images/cover.png"
    />
    <meta property="og:url" content="https://coffeebreakpodcast.app/explore" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Coffeebreak" />
    <meta property="og:locale" content="es_ES" />
     */

    this.meta.updateTag({ name: 'og:title', content: rrssMetaDto.title });
    this.meta.updateTag({
      name: 'og:description',
      content: rrssMetaDto.description,
    });
    this.meta.updateTag({ name: 'og:image', content: rrssMetaDto.image });
    this.meta.updateTag({ name: 'og:url', content: rrssMetaDto.url });

    /**
     * <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@coffeebreak" />
    <meta name="twitter:creator" content="@coffeebreak" />
    <meta name="twitter:title" content="Coffeebreak: señal y ruido" />
    <meta name="twitter:description" content="Podcast de ciencia" />
    <meta
      name="twitter:image"
      content="https://coffeebreakpodcast.app/assets/images/cover.png"
    />
    <meta name="twitter:url" content="https://coffeebreakpodcast.app" />
    <meta name="twitter:label1" content="Podcast" />
    <meta name="twitter:data1" content="Coffeebreak" />
    <meta name="twitter:label2" content="Ciencia" />
     */

    this.meta.updateTag({ name: 'twitter:title', content: rrssMetaDto.title });
    this.meta.updateTag({
      name: 'twitter:description',
      content: rrssMetaDto.description,
    });
    this.meta.updateTag({ name: 'twitter:image', content: rrssMetaDto.image });
    this.meta.updateTag({ name: 'twitter:url', content: rrssMetaDto.url });
  }

  public setOriginals(): void {
    this.setMetaForRRSS({
      title: 'Coffeebreak: señal y ruido',
      description: 'Podcast de ciencia',
      image: 'https://coffeebreakpodcast.app/assets/images/cover.png',
      url: 'https://coffeebreakpodcast.app/home',
    });
  }
}

export interface RRSSMeta {
  title: string;
  description: string;
  image: string;
  url: string;
}

/**
 *
    <!-- link preview for facebook -->
    <meta property="og:title" content="Coffeebreak: señal y ruido" />
    <meta property="og:description" content="Podcast de ciencia" />
    <meta
      property="og:image"
      content="https://coffeebreakpodcast.app/assets/images/cover.png"
    />
    <meta property="og:url" content="https://coffeebreakpodcast.app/explore" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Coffeebreak" />
    <meta property="og:locale" content="es_ES" />

    <!-- link preview for twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@coffeebreak" />
    <meta name="twitter:creator" content="@coffeebreak" />
    <meta name="twitter:title" content="Coffeebreak: señal y ruido" />
    <meta name="twitter:description" content="Podcast de ciencia" />
    <meta
      name="twitter:image"
      content="https://coffeebreakpodcast.app/assets/images/cover.png"
    />
    <meta name="twitter:url" content="https://coffeebreakpodcast.app" />
    <meta name="twitter:label1" content="Podcast" />
    <meta name="twitter:data1" content="Coffeebreak" />
    <meta name="twitter:label2" content="Ciencia" />
 */
