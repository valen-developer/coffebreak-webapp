import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthStatusService } from 'src/app/application/Auth/AuthStatus.service';
import { ImageGetter } from 'src/app/application/Shared/ImageGetter';
import { Nullable } from 'src/app/domain/Shared/types/Nullable.type';
import { User } from 'src/app/domain/User/User.mode';

@Component({
  selector: 'app-circle-profile',
  templateUrl: './circle-profile.component.html',
  styleUrls: ['./circle-profile.component.scss'],
})
export class CircleProfileComponent implements OnInit, OnDestroy {
  public imageUrl: Nullable<string>;

  public initials: string = 'CB';
  public randomColor: string;

  private user: Nullable<User>;
  private userSubscription!: Subscription;

  constructor(
    private authStatus: AuthStatusService,
    private imageGetter: ImageGetter
  ) {
    this.randomColor = this.generateRandomColor();
  }

  ngOnInit(): void {
    this.userSubscriber();
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  private userSubscriber(): void {
    this.userSubscription = this.authStatus.user$.subscribe({
      next: (user: Nullable<User>) => {
        if (!user) return this.resetComponent();
        this.user = user;
        this.buildInitials(user.name.value);

        this.getImageUrl();
      },
    });
  }

  private resetComponent(): void {
    this.imageUrl = null;
    this.initials = 'CB';
  }

  private async getImageUrl(): Promise<void> {
    if (!this.user) return;
    this.imageUrl = await this.imageGetter.getDataUrlFromEntity(
      this.user.uuid.value
    );
  }

  private buildInitials(userName: string): void {
    const hasTwoWords = userName.split(' ').length > 1;

    if (hasTwoWords) {
      const firstName = userName.split(' ')[0];
      const lastName = userName.split(' ')[1];
      this.initials = `${firstName[0]}${lastName[0]}`;
    }

    if (!hasTwoWords) {
      this.initials = userName[0] + userName[1];
    }
  }

  private generateRandomColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
}
