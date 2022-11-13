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

  constructor(
    private clientsService: ClientsService
  ) { }

  ngOnInit(): void {
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
