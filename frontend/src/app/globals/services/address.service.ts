import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../models/Address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private readonly baseUrl: string = `${environment.backendUrl}/address`

  constructor(
    private http: HttpClient
  ) { }

  create(address: Address): Observable<Address> {
    return this.http.post<Address>(this.baseUrl, address)
  }
}
