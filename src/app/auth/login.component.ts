import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import {MatFormFieldModule} from "@angular/material/form-field"
import {MatInputModule} from "@angular/material/input"
import {MatButtonModule} from "@angular/material/button"


import { RouterLink } from '@angular/router';
import { LoginRequest } from './login-request';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatFormFieldModule, RouterLink, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form = new FormGroup({
    username: new FormControl("", {nonNullable: true}),
    password: new FormControl("", {nonNullable: true})
  })

  constructor() {}

  onSubmit(): void {
    const loginRequest: LoginRequest = {
      username: this.form.controls.username.value,
      password: this.form.controls.password.value
    }
  }
}
