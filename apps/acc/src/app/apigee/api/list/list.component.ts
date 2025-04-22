import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ApiStore } from '../api.store';
import { ApiHttpService } from '../api-http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Api } from '../api';

@Component({
  providers: [ApiHttpService],
  selector: 'app-apigee-api-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  readonly apiStore = inject(ApiStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  constructor() {
    this.reload();
  }

  reload() {
    this.apiStore.loadApis();
  }

  listKVMs(api: Api) {
    this.router.navigate([api.name, 'keyvaluemap'], { relativeTo: this.route });
  }
}
