import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserUpdater } from 'src/app/application/User/UserUpdater';
import { User } from 'src/app/domain/User/User.mode';
import { blobToDataUrl } from 'src/app/helpers/blobToDataUrl';
import { AlertService } from 'src/app/presentation/shared/modules/alert/alert.service';
import { IModal } from 'src/app/presentation/shared/modules/modal/modal.interface';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss'],
})
export class EditProfileModalComponent
  implements
    OnInit,
    IModal<{ user: User; imageUrl?: string }, { user: User; file?: File }>
{
  public initialState!: { user: User; imageUrl?: string };
  public responseEmitter: EventEmitter<{ user: User; file?: File }> =
    new EventEmitter();
  public closeEmitter: EventEmitter<void> = new EventEmitter();

  public form: FormGroup;
  public emailControl: FormControl;
  public nameControl: FormControl;

  public image!: File;
  public imageUrl!: string;

  constructor(
    private fb: FormBuilder,
    private userUpdater: UserUpdater,
    private alert: AlertService
  ) {
    this.form = this.fb.group({
      name: [null],
      email: [null],
    });

    this.emailControl = this.form.get('email') as FormControl;
    this.nameControl = this.form.get('name') as FormControl;
  }

  async onSubmit(): Promise<void> {
    const { name, email } = this.form.value;
    const { user } = this.initialState;

    try {
      const newUser = new User({
        uuid: user.uuid.value,
        name: name ?? user.name.value,
        email: email ?? user.email.value,
        role: user.role.value,
        password: user.password.value,
        status: user.status.value,
      });

      this.responseEmitter.emit({ user: newUser, file: this.image });
      await this.userUpdater.update({
        user: newUser,
        image: this.image,
      });

      this.alert.success({
        message: 'Perfil actualizado',
        subtitle: 'El perfil se ha actualizado correctamente',
      });

      this.hide();
    } catch (error: any) {
      this.alert.danger({
        message: 'Error al actualizar el perfil',
        ...(error.message ? { subtitle: error.message } : {}),
      });
    }
  }

  hide(): void {
    this.closeEmitter.emit();
  }

  ngOnInit(): void {
    const { imageUrl, user } = this.initialState;

    this.emailControl.setValue(user?.email.value ?? null);
    this.nameControl.setValue(user?.name.value ?? null);

    if (!imageUrl) return;
    this.imageUrl = imageUrl;
  }

  public async onDropFile(event: any): Promise<void> {
    const file = event.target?.files[0];
    if (!file) return;

    this.image = file;
    this.imageUrl = await blobToDataUrl(file);
  }
}
