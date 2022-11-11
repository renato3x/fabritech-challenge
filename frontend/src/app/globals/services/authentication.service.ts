import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
