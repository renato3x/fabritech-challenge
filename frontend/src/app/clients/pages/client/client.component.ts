import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Address } from 'src/app/globals/models/Address';
import { Client } from 'src/app/globals/models/Client';
import { AddressService } from 'src/app/globals/services/address.service';
import { ClientsService } from 'src/app/globals/services/clients.service';
import { states } from 'src/app/globals/states';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  states = states
  client!: Client

  clientForm: FormGroup = this.builder.group({
    firstName: ['', [ Validators.required ]],
    lastName: ['', [ Validators.required ]],
    birthDate: ['', [ Validators.required ]],
    cpf: ['', [ Validators.required, Validators.minLength(11), Validators.maxLength(14) ]],
    rg: ['', [ Validators.required, Validators.minLength(7), Validators.maxLength(7) ]],
    telephone: ['', [ Validators.required ]],
    email: ['', [ Validators.required, Validators.email ]]
  })

  addressForm: FormGroup = this.builder.group({
    city: ['', [ Validators.required ]],
    name: ['', [ Validators.required ]],
    cep: ['', [ Validators.required, Validators.minLength(8), Validators.maxLength(9) ]],
    number: ['', [ Validators.required ]],
    district: ['', [ Validators.required ]],
    state: ['', [ Validators.required ]],
    complement: ['', [ Validators.required ]]
  })

  constructor(
    private clientsService: ClientsService,
    private route: ActivatedRoute,
    private builder: FormBuilder,
    private snackbar: MatSnackBar,
    private addressService: AddressService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string
    this.getUser(parseInt(id))
  }

  getUser(id: number) {
    this.clientsService.getById(id)
    .subscribe(
      client => {
        this.client = client
        this.loadClientDataInForms(client)
      }
    )
  }

  loadClientDataInForms(client: Client) {
    this.clientForm.setValue({
      firstName: client.firstName,
      lastName: client.lastName,
      birthDate: client.birthDate,
      cpf: client.cpf,
      rg: client.rg,
      telephone: client.telephone,
      email: client.email
    })

    this.addressForm.setValue({
      city: client.address.city,
      name: client.address.name,
      cep: client.address.cep,
      number: client.address.number,
      district: client.address.district,
      state: client.address.state,
      complement: client.address.complement
    })
  }

  saveClient() {
    const client: Client = this.clientForm.value
    client.id = this.client.id

    this.clientsService.update(client)
    .subscribe(
      () => {
        this.snackbar.open('Dados atualizados com sucesso!', 'Ok', { duration: 5000 })
      }
    )
  }

  saveAddress() {
    const address: Address = this.addressForm.value
    address.id = this.client.address.id

    this.addressService.update(address)
    .subscribe(
      () => {
        this.snackbar.open('Endereço atualizado com sucesso!', 'Ok', { duration: 5000 })
      }
    )
  }
}
