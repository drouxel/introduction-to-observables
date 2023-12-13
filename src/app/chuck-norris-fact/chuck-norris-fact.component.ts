import { Component, inject, OnDestroy, OnInit, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button'
import { combineLatest, map, Observable, share, withLatestFrom, BehaviorSubject, switchMap } from 'rxjs';
import { UserStore } from '../user.store';
import { User } from '../models/user.model';
import { Fact } from '../interfaces/fact.interface';

/**
 * Instructions:
 * click on the refresh button and have a look in the console
 * now hide the component and open it anew then submit another user, look in the console
 * repeat previous step many times
 */

@Component({
  selector: 'app-chuck-norris-fact',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatButtonModule],
  templateUrl: './chuck-norris-fact.component.html',
  styleUrl: './chuck-norris-fact.component.scss'
})
export class ChuckNorrisFactComponent implements OnInit, OnDestroy {
  public fact$!: Observable<string>;
  public pimpedFact$!: Observable<string>;
  public ultraPimpedFact$!: Observable<string>;

  private _refresh$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);


  private _httpClient: HttpClient = inject(HttpClient);
  private _userStore: UserStore = inject(UserStore);
  
  
  private destroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    this.fact$ = this._refresh$.asObservable().pipe(
      switchMap(() => this.getRandomFact()),
      share()
    )
    // have a look at the network see what happens without the share()

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

    
    this.fact$.subscribe({
      next: (fact) => console.log('the fact is : ', fact),
      error: (err) => console.error('error'),
      complete: () => console.warn('mission complete') 
    })
    
    this.ultraPimpedFact$.pipe(
        //takeUntilDestroyed(this.destroyRef)
      ).subscribe({
        next: (fact) => console.log('the ultraPimpedFact is : ', fact),
        error: (err) => console.error('error'),
        complete: () => console.warn('ultraPimpedFact complete') 
    })
  }

  public ngOnDestroy(): void {
      // this._refresh$.complete();
  }

  public refresh(): void {
    this._refresh$.next(true);
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
