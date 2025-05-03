import { computed, Injectable, signal } from "@angular/core";
import { LoginRequest } from "./login-request";
import { LoginResponse } from "./login-response";
import { BehaviorSubject, filter, Observable, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";

const TOKEN_KEY = "token_xhs"

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private _authStatusSignal = signal(false);
  authStatusSignal = computed(() => this._authStatusSignal());

  private _authStatus = new BehaviorSubject(false);
  authStatus = this._authStatus.asObservable();

  private setAuthStatus(v: boolean) {
    this._authStatusSignal.set(v)
    this._authStatus.next(v)
  }

  login(loginReq: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>("/api/Admin/Login", loginReq).pipe(
      tap((o) => {
        if(!o.success) return;

        localStorage.setItem(TOKEN_KEY, o.token);
        this.setAuthStatus(true)
      })
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(TOKEN_KEY)
    return token !== null
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY)
    this.setAuthStatus(false)
  }
}
