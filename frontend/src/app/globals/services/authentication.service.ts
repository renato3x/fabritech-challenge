import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly baseUrl: string = environment.backendUrl

  constructor(
    private http: HttpClient
  ) { }

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
