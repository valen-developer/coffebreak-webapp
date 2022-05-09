import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit {
  public episodes = new Array(10).fill(0).map((_, index) => index);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const uuid = this.getUuid();
  }

  private getUuid(): string {
    return this.route.snapshot.paramMap.get('uuid') ?? '';
  }
}
