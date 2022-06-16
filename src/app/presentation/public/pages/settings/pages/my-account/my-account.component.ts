import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthStatusService } from 'src/app/application/Auth/AuthStatus.service';
import { Nullable } from 'src/app/domain/Shared/types/Nullable.type';
import { User } from 'src/app/domain/User/User.mode';

@Component({
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent implements OnInit, OnDestroy {
  public user: Nullable<User>;
  private userSubscription!: Subscription;

  constructor(private authStatus: AuthStatusService) {}

  ngOnInit(): void {
    this.userSubscriber();
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  private userSubscriber(): void {
    this.userSubscription = this.authStatus.user$.subscribe({
      next: (user) => {
        this.user = user;
      },
    });
  }
}
