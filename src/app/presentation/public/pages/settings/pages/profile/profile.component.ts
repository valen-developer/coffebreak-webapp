import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthStatusService } from 'src/app/application/Auth/AuthStatus.service';
import { ImageGetter } from 'src/app/application/Shared/ImageGetter';
import { Nullable } from 'src/app/domain/Shared/types/Nullable.type';
import { User } from 'src/app/domain/User/User.mode';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  public user: Nullable<User>;
  public userImage: Nullable<string>;
  private userSubscription!: Subscription;

  constructor(
    private authStatus: AuthStatusService,
    private imageGetter: ImageGetter
  ) {}

  ngOnInit(): void {
    this.userSubscriber();
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  private userSubscriber(): void {
    this.userSubscription = this.authStatus.user$.subscribe({
      next: async (user) => {
        if (!user) return;
        this.user = user;
        this.userImage = await this.getImage(user);
      },
    });
  }

  private async getImage(user: User): Promise<Nullable<string>> {
    return this.imageGetter.getDataUrlFromEntity(user.uuid.value);
  }
}
