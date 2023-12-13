import { Injectable } from '@angular/core'
import { User } from "./models/user.model";
import { BehaviorSubject, filter, Observable, tap } from 'rxjs';

/**
 * mediator class to share a User entity through the app
 */
@Injectable({
    providedIn: 'root'
})
export class UserStore {
    private _user$: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);

    public getCurrentUser(): Observable<User> {
        return this.getUser().pipe(
            filter(user => !!user)
        ) as Observable<User>;
    }

    public getUser(): Observable<User | undefined> {
        return this._user$.asObservable();
    }

    public setUser(user?: User): void {
        this._user$.next(user);
    }
}