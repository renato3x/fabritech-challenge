import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthenticationService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken()

    if (token) {
      const requestCopy = request.clone({
        setHeaders: {
          Authorization: `${token.type} ${token.token}`
        }
      })

      return next.handle(requestCopy)
    }


    return next.handle(request)
  }
}
