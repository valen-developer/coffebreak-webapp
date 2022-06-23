import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthStatusService } from 'src/app/application/Auth/AuthStatus.service';
import { Nullable } from 'src/app/domain/Shared/types/Nullable.type';
import { User } from 'src/app/domain/User/User.mode';
import { ModalComponent } from 'src/app/presentation/shared/modules/modal/modal.component';
import { EditProfileModalComponent } from '../../components/edit-profile-modal/edit-profile-modal.component';

@Component({
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent implements OnInit, OnDestroy {
  @ViewChild('modal', { static: true }) modal!: ModalComponent;

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

  public async onEditProfile(): Promise<void> {
    if (!this.user) return;

    this.modal
      .show(EditProfileModalComponent, {
        user: this.user,
      })
      .then((response) => this.modal.hide());
  }
}
