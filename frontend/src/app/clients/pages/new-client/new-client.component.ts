import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit {

  states = [
    {
      name: 'Acre',
      initials: 'AC'
    },
    {
      name: 'Alagoas',
      initials: 'AL'
    },
    {
      name: 'Amapá',
      initials: 'AP'
    },
    {
      name: 'Amazonas',
      initials: 'AM'
    },
    {
      name: 'Bahia',
      initials: 'BA'
    },
    {
      name: 'Ceará',
      initials: 'CE'
    },
    {
      name: 'Distrito Federal',
      initials: 'DF'
    },
    {
      name: 'Espírito Santo',
      initials: 'ES'
    },
    {
      name: 'Goiás',
      initials: 'GO'
    },
    {
      name: 'Maranhão',
      initials: 'MA'
    },
    {
      name: 'Mato Grosso',
      initials: 'MT'
    },
    {
      name: 'Mato Grosso do Sul',
      initials: 'MS'
    },
    {
      name: 'Minas Gerais',
      initials: 'MG'
    },
    {
      name: 'Pará',
      initials: 'PA'
    },
    {
      name: 'Paraíba',
      initials: 'PB'
    },
    {
      name: 'Paraná',
      initials: 'PR'
    },
    {
      name: 'Pernambuco',
      initials: 'PE'
    },
    {
      name: 'Piauí',
      initials: 'PI'
    },
    {
      name: 'Rio de Janeiro',
      initials: 'RJ'
    },
    {
      name: 'Rio Grande do Norte',
      initials: 'RN'
    },
    {
      name: 'Rio Grande do Sul',
      initials: 'RS'
    },
    {
      name: 'Rondônia',
      initials: 'RO'
    },
    {
      name: 'Roraima',
      initials: 'RR'
    },
    {
      name: 'Santa Catarina',
      initials: 'SC'
    },
    {
      name: 'São Paulo',
      initials: 'SP'
    },
    {
      name: 'Sergipe',
      initials: 'SE'
    },
    {
      name: 'Tocantins',
      initials: 'TO'
    }
  ]
  // 62390-000

  clientForm: FormGroup = this.builder.group({
    firstName: ['', [ Validators.required ]],
    lastName: ['', [ Validators.required ]],
    birthDate: ['', [ Validators.required ]],
    cpf: ['', [ Validators.required ]],
    rg: ['', [ Validators.required ]],
    telephone: ['', [ Validators.required ]],
    email: ['', [ Validators.required, Validators.email ]],
    address: this.builder.group({
      city: ['', [ Validators.required ]],
      name: ['', [ Validators.required ]],
      cep: ['', [ Validators.required ]],
      number: ['', [ Validators.required ]],
      district: ['', [ Validators.required ]],
      state: ['', [ Validators.required ]],
      complement: ['', [ Validators.required ]]
    }),
    kinships: this.builder.array([])
  })

  kinships: FormArray = this.clientForm.get('kinships') as FormArray

  constructor(
    private builder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  addKinship() {
    this.kinships.push(this.builder.group({
      name: ['', [ Validators.required ]],
      kinship: ['', [ Validators.required ]]
    }))
  }
}
