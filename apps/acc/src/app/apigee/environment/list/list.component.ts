import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EnvironmentStore } from '../environment.store';
import { EnvironmentHttpService } from '../environment-http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Environment } from '../environment';

@Component({
  providers: [EnvironmentHttpService],
  selector: 'app-apigee-environment-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  readonly environmentStore = inject(EnvironmentStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  constructor() {
    this.reload();
  }

  reload() {
    this.environmentStore.loadEnvironments();
  }

  listKVMs(environment: Environment) {
    this.router.navigate([environment.environment, 'keyvaluemap'], {
      relativeTo: this.route,
    });
  }
}
