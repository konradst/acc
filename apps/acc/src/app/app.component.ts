import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthComponent } from '@konradst/angular-gis';

@Component({
  imports: [RouterModule, AuthComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'acc';
}
