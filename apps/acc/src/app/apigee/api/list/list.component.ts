import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ApiStore } from '../api.store';
import { ApiHttpService } from '../api-http.service';

@Component({
  providers: [ApiHttpService],
  selector: 'app-apigee-api-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  readonly apiStore = inject(ApiStore);

  constructor() {
    this.reload();
  }

  reload() {
    this.apiStore.loadApis();
  }
}
