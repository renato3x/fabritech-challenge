import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Token } from '../models/Token';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly baseUrl: string = environment.backendUrl
  private jwtHelper = new JwtHelperService()

  constructor(
    private http: HttpClient
  ) { }

  get isTokenValid() {
    const token = this.getToken()
    const isValid = !this.jwtHelper.isTokenExpired(token.token)
    return of(isValid)
  }

  signup(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/register`, user)
  }

  signin(user: Partial<User>) {
    return this.http.post<Token>(`${this.baseUrl}/login`, user)
    .pipe(
      tap(this.saveToken)
    )
  }

  saveToken(token: Token) {
    localStorage.setItem('token', JSON.stringify(token))
  }

  getToken() {
    return JSON.parse(localStorage.getItem('token') as string) as Token
  }
}
