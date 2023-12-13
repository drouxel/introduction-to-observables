import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './header/header.component';
import { UserFormComponent } from './user-form/user-form.component';
import { ChuckNorrisFactComponent } from './chuck-norris-fact/chuck-norris-fact.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, UserFormComponent, ChuckNorrisFactComponent, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public displayChuckNorris = true;

  public toggleChuckNorris(): void {
    this.displayChuckNorris = !this.displayChuckNorris
  }
}
