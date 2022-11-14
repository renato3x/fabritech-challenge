import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/globals/models/Client';
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
    private builder: FormBuilder
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string

    this.clientsService.getById(parseInt(id))
    .subscribe(
      client => {
        this.client = client

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
    )
  }
}
