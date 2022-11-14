import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../models/Client';
import { AddressService } from './address.service';
import { KinshipsService } from './kinships.service';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private readonly baseUrl: string = `${environment.backendUrl}/client`

  constructor(
    private http: HttpClient,
    private kinshipsService: KinshipsService,
    private addressService: AddressService
  ) { }

  getAll(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl)
  }

  getById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl}/${id}`)
  }

  create(client: Client): Observable<Client> {
    return this.kinshipsService
    .create(client.kinships)
    .pipe(
      mergeMap(kinships => {
        client.kinships = kinships
        return this.addressService.create(client.address)
      }),
      mergeMap(address => {
        client.address = address
        return this.http.post<Client>(this.baseUrl, client)
      })
    )
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
  }

  private hasKinship(client: Client): boolean {
    return client.kinships.length > 0
  }
}
