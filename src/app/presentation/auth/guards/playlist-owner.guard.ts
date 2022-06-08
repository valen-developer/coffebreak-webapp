import { Injectable, OnDestroy } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthStatusService } from 'src/app/application/Auth/AuthStatus.service';
import { PlaylistFinder } from 'src/app/application/Playlist/PlaylistFinder';
import { Nullable } from 'src/app/domain/Shared/types/Nullable.type';
import { User } from 'src/app/domain/User/User.mode';

@Injectable({
  providedIn: 'root',
})
export class PlaylistOwnerGuard implements CanActivate {
  constructor(
    private router: Router,
    private authStatus: AuthStatusService,
    private playlistFinder: PlaylistFinder
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const user = this.authStatus.getUser();
    const playlistUrl = '/library';

    const playlistUuid = route.paramMap.get('uuid');
    if (!playlistUuid) return this.navigate(playlistUrl);

    const playlist = await this.playlistFinder.getPlaylist(playlistUuid);
    if (!playlist) return this.navigate(playlistUrl);

    const hasOwner = playlist.getOwn()?.value ? true : false;
    if (!hasOwner) return true;

    const isOwner = playlist.getOwn().value === user?.uuid.value;
    if (!isOwner) return this.navigate(playlistUrl);

    return true;
  }

  private navigate(url: string): boolean {
    this.router.navigateByUrl(url);
    return false;
  }
}
