import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent implements OnInit {
  @ViewChild('tooltip', { static: true }) tooltip!: ElementRef<HTMLElement>;
  @ViewChild('arrow', { static: true }) arrow!: ElementRef<HTMLElement>;

  public text: string = 'tooltip';

  constructor() {}

  ngOnInit(): void {}
}
