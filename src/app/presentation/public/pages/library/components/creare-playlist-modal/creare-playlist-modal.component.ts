import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlaylistCreator } from 'src/app/application/Playlist/PlaylistCreator';
import { IModal } from 'src/app/presentation/shared/modules/modal/modal.interface';

@Component({
  selector: 'app-creare-playlist-modal',
  templateUrl: './creare-playlist-modal.component.html',
  styleUrls: ['./creare-playlist-modal.component.scss'],
})
export class CrearePlaylistModalComponent implements OnInit, IModal<any, any> {
  public initialState: any;
  public responseEmitter: EventEmitter<any> = new EventEmitter();
  public closeEmitter: EventEmitter<void> = new EventEmitter();

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private playlistCreator: PlaylistCreator
  ) {
    this.form = this.buildForm();
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      name: [''],
      description: [''],
    });
  }

  onSubmit(): void {
    this.responseEmitter.emit(this.initialState);
  }

  hide(): void {
    this.closeEmitter.emit();
  }

  ngOnInit(): void {}
}
