import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthStatusService } from 'src/app/application/Auth/AuthStatus.service';
import { Nullable } from 'src/app/domain/Shared/types/Nullable.type';
import { User } from 'src/app/domain/User/User.mode';

@Component({
  templateUrl: './settings-home.component.html',
  styleUrls: ['./settings-home.component.scss'],
})
export class SettingsHomeComponent implements OnInit, OnDestroy {
  public user: Nullable<User>;
  private userSubscription!: Subscription;

  public userLinks: Link[] = [
    {
      label: 'Mi Cuenta',
      url: 'my-account',
    },
    {
      label: 'Cambiar Contraseña',
      url: 'change-password',
    },
    {
      label: 'Ajustes',
      url: 'app',
    },
  ];

  public appLinks: Link[] = [
    {
      label: 'About',
    },
  ];

  constructor(private authStatus: AuthStatusService) {}

  ngOnInit(): void {
    this.susbcribeToUser();
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  private susbcribeToUser(): void {
    this.userSubscription = this.authStatus.user$.subscribe({
      next: (user) => {
        this.user = user;
      },
    });
  }

  public logout(): void {
    this.authStatus.logout();
  }
}

interface Link {
  label: string;
  url?: string;
}
