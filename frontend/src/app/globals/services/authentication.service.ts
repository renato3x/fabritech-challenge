import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
    private http: HttpClient,
    private router: Router
  ) { }

  get isTokenValid() {
    const token = this.getToken()
    const isValid = !this.jwtHelper.isTokenExpired(token?.token)
    return of(isValid)
  }

  get userData() {
    const token = this.getToken()
    const user = this.jwtHelper.decodeToken(token?.token)
    delete user.iat
    delete user.exp
    return of(user as Partial<User>)
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

  signout() {
    const token: Token = {
      token: '',
      type: ''
    }

    localStorage.setItem('token', JSON.stringify(token))
    this.router.navigateByUrl('/signin')
  }

  saveToken(token: Token) {
    localStorage.setItem('token', JSON.stringify(token))
  }

  getToken() {
    const token = localStorage.getItem('token')

    if (token) {
      return JSON.parse(token) as Token
    }

    return null
  }
}
