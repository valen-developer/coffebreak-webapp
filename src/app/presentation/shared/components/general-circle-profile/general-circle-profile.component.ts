import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-circle-profile',
  templateUrl: './general-circle-profile.component.html',
  styleUrls: ['./general-circle-profile.component.scss'],
})
export class GeneralCircleProfileComponent implements OnInit {
  @Input() name!: string;
  @Input() uuid!: string;

  public initials = 'CB';
  public backgroundColor = this.randomColor();

  constructor() {}

  ngOnInit(): void {
    this.setInitials();
  }

  private randomColor(): string {
    const randomIndex = Math.floor(Math.random() * randomPastelColors.length);

    return randomPastelColors[randomIndex];
  }

  private setInitials(): void {
    if (!this.name) return;

    const names = this.name.split(' ');

    const hasMoreThanOneName = names.length > 1;

    if (!hasMoreThanOneName) {
      this.initials = names[0].slice(0, 2);
      return;
    }

    const firstName = names[0].slice(0, 1);
    const lastName = names[1].slice(0, 1);

    this.initials = `${firstName}${lastName}`.toUpperCase();
  }
}

const randomPastelColors = [
  '#f44336',
  '#e91e63',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722',
  '#9e9e9e',
  '#607d8b',
];
