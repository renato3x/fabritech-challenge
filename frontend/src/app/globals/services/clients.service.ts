import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../models/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private readonly baseUrl: string = `${environment.backendUrl}/client`

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl)
  }
}
