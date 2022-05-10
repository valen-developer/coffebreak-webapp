import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteToolService } from 'src/app/presentation/shared/services/route-tool.service';
import { ScrollService } from 'src/app/presentation/shared/services/scroll.service';

@Component({
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit {
  public episodes = new Array(10).fill(0).map((_, index) => index);

  public previousUrl = '/';

  constructor(
    private route: ActivatedRoute,
    private routeTool: RouteToolService,
    private scrollService: ScrollService
  ) {}

  ngOnInit(): void {
    this.scrollService.scrollToTop();
    this.previousUrl = this.routeTool.getPreviousUrl();
    const uuid = this.getUuid();
  }

  private getUuid(): string {
    return this.route.snapshot.paramMap.get('uuid') ?? '';
  }
}
