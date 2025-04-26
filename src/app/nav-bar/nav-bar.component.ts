import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import {MatToolbarModule} from "@angular/material/toolbar"
import {MatIconModule} from "@angular/material/icon"
import {MatButtonModule} from "@angular/material/button"
import { AuthService } from '../auth/auth.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, MatIconModule, MatToolbarModule, MatButtonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isLoggedIn: boolean = false

  constructor(public authService: AuthService) {
    authService.authStatus.pipe(
      takeUntil()
    ).subscribe({
      next: (v) => {
        this.isLoggedIn = v
      }
    })
  }
}
