import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Client } from 'src/app/globals/models/Client';
import { ClientsService } from 'src/app/globals/services/clients.service';
import { ConfirmClientDeletionComponent } from '../../components/confirm-client-deletion/confirm-client-deletion.component';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {

  clients: Client[] = []
  columns: string[] = ['id', 'name', 'birthDate', 'cpf', 'telephone', 'email', 'actions']
  deleting: boolean = false
  deletingId: number = -1

  constructor(
    private clientsService: ClientsService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
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

  deleteClient(id: number) {
    this.deletingId = id
    this.toggleDeleting()

    this.dialog.open(ConfirmClientDeletionComponent)
    .afterClosed()
    .subscribe(
      canDelete => {
        if (canDelete) {
          this.clientsService.delete(id)
          .subscribe(
            () => {
              this.snackbar.open('Cliente deletado com sucesso!', 'Ok', { duration: 5000 })
              this.getClients()
            },
            error => {
              this.toggleDeleting()
              if (error instanceof HttpErrorResponse) {
                this.snackbar.open(error.error.message, 'Ok', { duration: 5000 })
              } else {
                this.snackbar.open('Erro ao deletar cliente', 'Ok', { duration: 5000 })
              }
            },
            () => {
              this.toggleDeleting()
            }
          )
        } else {
          this.toggleDeleting()
        }
      }
    )
  }

  private toggleDeleting() {
    this.deleting = !this.deleting
  }
}
