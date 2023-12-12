import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

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
   * In this first step, we create an observable and set it to emit up to 6 times (.next)
   * we will have a look at what happens at runtime by adding breakpoint in the debugger
   */

  public ngOnInit(): void {
    // example taken from https://rxjs.dev/guide/observable
    const observable$ = new Observable((subscriber) => {
      // add breakpoint here 👇
      subscriber.next(1);
      // add breakpoint here 👇
      subscriber.next(2);
      // add breakpoint here 👇
      subscriber.next(3);
      setTimeout(() => {
        // add breakpoint here 👇
        subscriber.next(4);
        subscriber.complete()
        // 👆 comment this after having had a look at the chain of events
        // 👇 and ununcomment this bit to check the differenc ein the subscribe object 
        // subscriber.error('it\'s over mate');
      }, 2000);
      // add breakpoint here 👇
      subscriber.next(5);
      setTimeout(() => {
        // add breakpoint here 👇
        subscriber.next(6)
      }, 1000)
    });
    // please take time to play along with the definition of the Observable, removing the .next() 
    // that do not have a timeout or reverse the values in the timeouts to 
    // you may also remove the breakpoints to see in which order the console.logs get called

    // add breakpoint here 👇
    console.warn('just before subscribe')

    // please try without the subscribe 1st, just to see what happens
    // add breakpoint here 👇
    observable$.subscribe({
      next(x) {
        // add breakpoint here 👇
        console.log('got value ', x);
      },
      error(err) {
        // add breakpoint here 👇
        console.error('something wrong occurred: ' + err);
      },
      complete() {
        // add breakpoint here 👇
        console.log('done');
      },
    })

    console.warn('just after subscribe')
  }
}
