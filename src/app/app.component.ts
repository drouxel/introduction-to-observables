import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Observable, debounceTime, map, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  ////////////////////
  /// Instructions ///
  ////////////////////

  /**
   * In this second step we change the value inside our `observable$` to an object and create another observable 
   * that will listen to the changes and map the value to only what we need
   * a bit like observable would be a newspaper and we only wanted to subscribe to the sports pages
   */

  public observable$ = new Observable<{value: number}>((subscriber) => {
    // you should also try commenting out .next() without timeout to get a glance at toto value
    subscriber.next({value: 1});
    subscriber.next({value: 2});
    subscriber.next({value: 3});
    setTimeout(() => {
      subscriber.next({value: 4});
      subscriber.complete()
    }, 2000);
    subscriber.next({value: 5});
    setTimeout(() => {
      subscriber.next({value: 6})
    }, 1000)
  })
  // now let's add a pipe(tap()) to see what is happening here
  .pipe(
    tap(value => console.warn('value in tap is ', value)),
    //share()
  )

  public toto: number = 0
  public toto$!: Observable<number>;

  public ngOnInit(): void {
    this.observable$.subscribe({
      next(x) {
        console.log('got value ', x);
      },
      error(err) {
        console.error('something wrong occurred: ' + err);
      },
      complete() {
        console.log('done');
      },
    });

    console.log('toto just after subscribe', this.toto);


    this.toto$ = this.observable$.pipe(
      map( x => x.value),
      debounceTime(300)
    );
    this.toto$.subscribe((value) => console.error('value inside toto$ is', value))

    // remember to experiment multiplying subscriptions on _observable$

  }
}
