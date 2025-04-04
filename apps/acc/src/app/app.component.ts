import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthComponent } from '@konradst/angular-gis';
import { NavLeftComponent } from './nav/left/nav-left.component';

@Component({
  imports: [RouterModule, AuthComponent, NavLeftComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'acc';
}
