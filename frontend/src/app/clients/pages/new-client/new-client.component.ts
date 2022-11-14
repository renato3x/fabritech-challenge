import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}