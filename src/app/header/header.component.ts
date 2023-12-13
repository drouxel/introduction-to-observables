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
  public user$!: Observable<User | undefined>;

  constructor( private _userStore: UserStore) {}

  public ngOnInit(): void {
    this.user$ = this._userStore.getUser();
  }
}
