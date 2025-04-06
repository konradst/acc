import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EnvironmentStore } from '../environment.store';
import { EnvironmentHttpService } from '../environment-http.service';

@Component({
  providers: [EnvironmentHttpService],
  selector: 'app-apigee-environment-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  readonly environmentStore = inject(EnvironmentStore);

  constructor() {
    this.reload();
  }

  reload() {
    this.environmentStore.loadEnvironments();
  }
}
