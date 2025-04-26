import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

import { Router, RouterLink } from "@angular/router";
import { AuthService } from "./auth.service";
import { LoginRequest } from "./login-request";

@Component({
  selector: "app-login",
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    RouterLink,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  form = new FormGroup({
    username: new FormControl("", { nonNullable: true }),
    password: new FormControl("", { nonNullable: true }),
  });

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    const loginRequest: LoginRequest = {
      username: this.form.controls.username.value,
      password: this.form.controls.password.value,
    };

    this.authService.login(loginRequest).subscribe({
      next: (res) => {
        if (res.success) {
          this.router.navigate(["/"]);
        }
      },
    });
  }
}
