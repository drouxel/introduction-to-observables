import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { UserStore } from '../user.store';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    FormsModule, 
    MatInputModule, 
    MatFormFieldModule, 
    MatDatepickerModule, 
    MatNativeDateModule,
    MatButtonModule
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {

  public userForm: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _userStore: UserStore) {
    this.userForm = this._formBuilder.group({
      name: ['Rouxel', Validators.required],
      surname:  ['Damien', Validators.required],
      birthdate: [new Date('08/08/1987')]
    })
  }

  public updateUser(): void {
    if (this.userForm.valid) {
      this._userStore.setUser(this.userForm.value)
    }
  }

  public clearUser(): void {
    this._userStore.setUser();
  }
}
