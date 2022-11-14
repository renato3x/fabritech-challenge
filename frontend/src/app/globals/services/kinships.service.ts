import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Kinship } from '../models/Kinship';

@Injectable({
  providedIn: 'root'
})
export class KinshipsService {

  private readonly baseUrl: string = `${environment.backendUrl}/kinship`

  constructor(
    private http: HttpClient
  ) { }

  create(kinships: Kinship[]): Observable<Kinship[]> {
    return this.http.post<Kinship[]>(this.baseUrl, kinships)
  }
}
