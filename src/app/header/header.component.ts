import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UserStore } from '../user.store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  public currentUser$!: Observable<User>;

  /**
   * first, fill in the form and click submit user checking the console.
   * then change `this.currentUser$ = this._userStore.getCurrentUser();` to
   * `this.currentUser$ = this._userStore.getUser();`
   * can you spot the difference?
   * once you have finished doing this, set back currentUser to `this._userStore.getCurrentUser()`
   * go to the user-form.component and follow the instructions
   */

  constructor( private _userStore: UserStore) {}

  public ngOnInit(): void {
    this.currentUser$ = this._userStore.getCurrentUser();

    // have a look here to a what happens while the currentUser is undefined
    this.currentUser$.subscribe(user => console.log('current user is', user));
    // first, fill in the form and click submit user checking the console.
    // then change `this.currentUser$ = this._userStore.getCurrentUser();` to
    // `this.currentUser$ = this._userStore.getUser();`
    // can you spot the difference?
  }
}
