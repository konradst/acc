import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthComponent } from '@konradst/angular-gis';
import { OrganizationComponent } from './apigee/organization/organization.component';

@Component({
  imports: [RouterModule, AuthComponent, OrganizationComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'acc';
}
