import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import {MatToolbarModule} from "@angular/material/toolbar"
import {MatIconModule} from "@angular/material/icon"
import {MatButtonModule} from "@angular/material/button"
import { AuthService } from '../auth/auth.service';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, MatIconModule, MatToolbarModule, MatButtonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false
  private destroySubject = new Subject<boolean>() 

  constructor(public authService: AuthService) {
    this.authService.authStatus.pipe(
      takeUntil(this.destroySubject)
    ).subscribe({
      next: (v) => {
        this.isLoggedIn = v
      }
    })
  }

  logout() {
    this.authService.logout()
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated()
  }

  ngOnDestroy(): void {
    this.destroySubject.next(true)
    this.destroySubject.complete()
  }
}
