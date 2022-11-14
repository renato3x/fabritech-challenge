import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CepData } from '../models/CepData';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

  private readonly baseUrl: string = 'https://viacep.com.br/ws'

  constructor(
    private http: HttpClient
  ) { }

  getCep(cep: string) {
    return this.http.get<CepData>(`${this.baseUrl}/${cep}/json`)
  }
}
