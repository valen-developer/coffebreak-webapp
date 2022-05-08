import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavbarAudioController } from '../shared/modules/audio-player/services/navbar-audio-controller.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss'],
})
export class PublicComponent implements OnInit {
  public showAudioPlayer$!: Observable<boolean>;

  constructor(private navbarAudioController: NavbarAudioController) {
    this.showAudioPlayer$ = this.navbarAudioController.show$;
  }

  ngOnInit(): void {}
}
