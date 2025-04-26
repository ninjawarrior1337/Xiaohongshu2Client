import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpHeaders, provideHttpClient, withInterceptors } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { authInterceptor } from './auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([
      (req, next) => next(req.clone({url: (new URL(req.url, environment.baseUrl)).toString()})),
      authInterceptor
    ])),
  ],
};
