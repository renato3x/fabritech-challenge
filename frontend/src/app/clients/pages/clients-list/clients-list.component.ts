import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/globals/models/Client';
import { ClientsService } from 'src/app/globals/services/clients.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {

  clients: Client[] = []
  columns: string[] = ['id', 'name', 'birthDate', 'cpf', 'telephone', 'email', 'actions']

  constructor(
    private clientsService: ClientsService
  ) { }

  ngOnInit(): void {
    this.getClients()
  }

  getClients() {
    this.clientsService.getAll()
    .subscribe(
      clients => {
        this.clients = clients
      }
    )
  }
}
