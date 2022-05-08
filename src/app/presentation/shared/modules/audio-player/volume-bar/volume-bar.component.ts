import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-volume-bar',
  templateUrl: './volume-bar.component.html',
  styleUrls: ['./volume-bar.component.scss'],
})
export class VolumeBarComponent implements OnInit {
  @Input() percent = 0;

  @Output() volumeChangeEmitter = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  public onVolumeChange(value: number): void {
    this.volumeChangeEmitter.emit(value);
  }
}
