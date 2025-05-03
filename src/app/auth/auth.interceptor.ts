import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router)
  const token = localStorage.getItem("token_xhs") ?? ""
  
  const newReq = req.clone({
    setHeaders: {
      "Authorization": `Bearer ${token}`
    }
  })
  
  return next(newReq).pipe(
    catchError((err, _c) => {
      if(err instanceof HttpErrorResponse && err.status === 401) {
        router.navigate(["/login"])
      }

      return throwError(() => err)
    })
  );
};
