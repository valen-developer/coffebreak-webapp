import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlaylistCreator } from 'src/app/application/Playlist/PlaylistCreator';
import { Playlist } from 'src/app/domain/Playlist/Playlist.model';
import { blobToDataUrl } from 'src/app/helpers/blobToDataUrl';
import { IModal } from 'src/app/presentation/shared/modules/modal/modal.interface';

@Component({
  selector: 'app-creare-playlist-modal',
  templateUrl: './creare-playlist-modal.component.html',
  styleUrls: ['./creare-playlist-modal.component.scss'],
})
export class CrearePlaylistModalComponent
  implements
    OnInit,
    IModal<{ playlist?: Playlist; title: string }, NewPlaylistModalResponse>
{
  public initialState: { playlist?: Playlist; title: string } = {
    title: 'Crear nueva playlist',
  };
  public responseEmitter: EventEmitter<NewPlaylistModalResponse> =
    new EventEmitter();
  public closeEmitter: EventEmitter<void> = new EventEmitter();

  public form: FormGroup;
  public image!: File;
  public imageUrl!: string;

  constructor(private fb: FormBuilder) {
    this.form = this.buildForm();
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      name: [''],
      description: [''],
    });
  }

  onSubmit(): void {
    const { name, description } = this.form.value;

    this.responseEmitter.emit({
      name,
      description,
      image: this.image,
    });
  }

  hide(): void {
    this.closeEmitter.emit();
  }

  ngOnInit(): void {
    const { playlist } = this.initialState;
    if (!playlist) return;

    this.form.patchValue({
      name: playlist.name.value,
      description: playlist.description.value,
    });
  }

  public onDropFile(file: File): void {
    this.image = file;
    this.setImageUrl();
  }

  public onSelectFile(event: any): void {
    const file = event.target.files[0];
    this.image = file;
    this.setImageUrl();
  }

  private async setImageUrl(): Promise<void> {
    if (!this.image) {
      this.imageUrl = '';
      return;
    }
    const imageUrl = await blobToDataUrl(this.image);
    this.imageUrl = imageUrl;
  }
}

export interface NewPlaylistModalResponse {
  name: string;
  description: string;
  image: File;
}
