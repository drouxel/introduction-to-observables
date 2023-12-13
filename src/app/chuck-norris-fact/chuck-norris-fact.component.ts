import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { combineLatest, map, Observable, share, withLatestFrom } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserStore } from '../user.store';
import { User } from '../models/user.model';
import { Fact } from '../interfaces/fact.interface';

/**
 * Instructions:
 * - open the app and have a look at the left hand side, you should see a chuck norris fact displayed
 * - submit the user in the form and see what happens
 * - hide and re-open the chuck norris component
 * - have a look at what happens
 */

@Component({
  selector: 'app-chuck-norris-fact',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './chuck-norris-fact.component.html',
  styleUrl: './chuck-norris-fact.component.scss'
})
export class ChuckNorrisFactComponent implements OnInit {
  public fact$!: Observable<string>;
  public pimpedFact$!: Observable<string>;
  public ultraPimpedFact$!: Observable<string>;


  private _httpClient: HttpClient = inject(HttpClient);
  private _userStore: UserStore = inject(UserStore);
  
  public ngOnInit(): void {
    this.fact$ = this.getRandomFact()
    // have a look at the network see what happens without the share()
    //.pipe(share());

    // this will only get triggered by fact$
    this.pimpedFact$ = this.fact$.pipe(
      withLatestFrom(this._userStore.getCurrentUser()),
      map(([fact, user]) => this.getPimpedFact(fact, user))
      )

    // this will be triggered by fact$ OR currentUser
    this.ultraPimpedFact$ = combineLatest([
      this.fact$,
      this._userStore.getCurrentUser()
    ]).pipe(
      map(([fact, user]) => this.getPimpedFact(fact, user))
    )
  }

  private getPimpedFact(originalFact: string, user?: User): string {
    if(!user) {
      return originalFact
    }
    return originalFact.replace(new RegExp(/[C][h][u][c][k]/g), `${user?.surname}`).replace(new RegExp(/[N][o][r][r][i][s]/g),`${user?.name}` )
  }
  
  private getRandomFact(): Observable<string> {
    return this._httpClient.get<Fact>('https://chuckn.neant.be/api/rand').pipe(
      map(fact => fact.joke)
    );
  }
}
