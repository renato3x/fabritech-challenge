import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, mergeMap, Subject } from 'rxjs';
import { Address } from 'src/app/globals/models/Address';
import { Client } from 'src/app/globals/models/Client';
import { Kinship } from 'src/app/globals/models/Kinship';
import { AddressService } from 'src/app/globals/services/address.service';
import { ClientsService } from 'src/app/globals/services/clients.service';
import { KinshipsService } from 'src/app/globals/services/kinships.service';
import { ViaCepService } from 'src/app/globals/services/via-cep.service';
import { states } from 'src/app/globals/states';
import { ConfirmClientDeletionComponent } from '../../components/confirm-client-deletion/confirm-client-deletion.component';
import { ConfirmKinshipDeletionComponent } from '../../components/confirm-kinship-deletion/confirm-kinship-deletion.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  states = states
  client!: Client
  saving: boolean = false

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

  kinshipsForms: FormGroup = this.builder.group({
    kinships: this.builder.array([])
  })

  kinships: FormArray = this.kinshipsForms.get('kinships') as FormArray

  userKinshipsForm: FormGroup = this.builder.group({
    kinships: this.builder.array([])
  })

  userKinships: FormArray = this.userKinshipsForm.get('kinships') as FormArray

  cepEmitter$: Subject<string> = new Subject<string>()

  constructor(
    private clientsService: ClientsService,
    private route: ActivatedRoute,
    private builder: FormBuilder,
    private snackbar: MatSnackBar,
    private addressService: AddressService,
    private dialog: MatDialog,
    private router: Router,
    private kinshipsService: KinshipsService,
    private viaCepService: ViaCepService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string
    this.getUser(parseInt(id))

    this.cepEmitter$
    .pipe(
      debounceTime(2000)
    )
    .subscribe(
      cep => {
        this.getCepData(cep)
      }
    )
  }

  emitCep(cep: string) {
    this.cepEmitter$.next(cep)
  }

  getCepData(cep: string) {
    this.viaCepService.getCep(cep)
    .subscribe(
      cep => {
        const addressData = this.addressForm.value

        this.addressForm.setValue({
          ...addressData,
          cep: cep.cep,
          name: cep.logradouro,
          complement: cep.complemento,
          state: cep.uf,
          district: cep.bairro,
          city: cep.localidade
        })
      }
    )
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

    this.kinships.clear()

    client.kinships.forEach(kinship => {
      const group = this.builder.group({
        name: [kinship.name, [ Validators.required ]],
        kinship: [kinship.kinship, [ Validators.required ]]
      })

      this.kinships.push(group)
    })
  }

  addKinship(kinships: FormArray) {
    const group = this.builder.group({
      name: ['', [ Validators.required ]],
      kinship: ['', [ Validators.required ]]
    })

    kinships.push(group)
  }

  removeKinship(kinships: FormArray, index: number) {
    kinships.removeAt(index)
  }

  saveClient() {
    const client: Client = this.clientForm.value
    client.id = this.client.id
    this.toggleSaving()

    this.clientsService.update(client)
    .subscribe(
      () => {
        this.toggleSaving()
        this.snackbar.open('Dados atualizados com sucesso!', 'Ok', { duration: 5000 })
      },
      error => {
        this.toggleSaving()
        if (error instanceof HttpErrorResponse) {
          this.snackbar.open(error.error.message, 'Ok', { duration: 5000 })
        } else {
          this.snackbar.open('Erro ao atualizar cliente', 'Ok', { duration: 5000 })
        }
      }
    )
  }

  saveAddress() {
    this.toggleSaving()
    const address: Address = this.addressForm.value
    address.id = this.client.address.id

    this.addressService.update(address)
    .subscribe(
      () => {
        this.toggleSaving()
        this.snackbar.open('Endereço atualizado com sucesso!', 'Ok', { duration: 5000 })
      },
      error => {
        this.toggleSaving()
        if (error instanceof HttpErrorResponse) {
          this.snackbar.open(error.error.message, 'Ok', { duration: 5000 })
        } else {
          this.snackbar.open('Erro ao atualizar endereço', 'Ok', { duration: 5000 })
        }
      }
    )
  }

  saveKinships(ks: FormArray) {
    const kinships: Kinship[] = ks.value
    this.toggleSaving()

    this.kinshipsService.create(kinships)
    .pipe(
      mergeMap(kinships => {
        const clientKinships = this.client.kinships

        this.client.kinships = [
          ...clientKinships,
          ...kinships
        ]

        return this.clientsService.update(this.client)
      })
    )
    .subscribe(
      () => {
        this.snackbar.open('Parentescos salvos com sucesso!', 'Ok', { duration: 5000 })
        ks.clear()
        this.getUser(this.client.id as number)
        this.toggleSaving()
      },
      error => {
        ks.clear()
        this.toggleSaving()
        if (error instanceof HttpErrorResponse) {
          this.snackbar.open(error.error.message, 'Ok', { duration: 5000 })
        } else {
          this.snackbar.open('Erro ao salvar parentescos', 'Ok', { duration: 5000 })
        }
      }
    )
  }

  saveKinship(kinship: Kinship, id: number) {
    this.toggleSaving()
    kinship.id = id

    this.kinshipsService.update(kinship)
    .subscribe(
      () => {
        this.toggleSaving()
        this.snackbar.open('Parentesco atualizado com sucesso!', 'Ok', { duration: 5000 })
      },
      error => {
        this.toggleSaving()
        if (error instanceof HttpErrorResponse) {
          this.snackbar.open(error.error.message, 'Ok', { duration: 5000 })
        } else {
          this.snackbar.open('Erro ao atualizar parentesco', 'Ok', { duration: 5000 })
        }
      }
    )
  }

  deleteClient() {
    this.toggleSaving()

    this.dialog.open(ConfirmClientDeletionComponent)
    .afterClosed()
    .subscribe(
      canDelete => {
        if (canDelete) {
          this.clientsService.delete(this.client.id as number)
          .subscribe(
            () => {
              this.router.navigateByUrl('/clients')
              this.toggleSaving()
            },
            error => {
              this.toggleSaving()
              if (error instanceof HttpErrorResponse) {
                this.snackbar.open(error.error.message, 'Ok', { duration: 5000 })
              } else {
                this.snackbar.open('Erro ao deletar cliente', 'Ok', { duration: 5000 })
              }
            }
          )
        } else {
          this.toggleSaving()
        }
      }
    )
  }

  deleteKinship(id: number) {
    this.toggleSaving()

    this.dialog.open(ConfirmKinshipDeletionComponent)
    .afterClosed()
    .subscribe(
      canDelete => {
        if (canDelete) {
          this.kinshipsService.delete(id)
          .subscribe(
            () => {
              this.snackbar.open('Parentesco deletado com sucesso!', 'Ok', { duration: 5000 })
              this.getUser(this.client.id as number)
              this.toggleSaving()
            },
            error => {
              this.toggleSaving()
              if (error instanceof HttpErrorResponse) {
                this.snackbar.open(error.error.message, 'Ok', { duration: 5000 })
              } else {
                this.snackbar.open('Erro ao deletar parentesco', 'Ok', { duration: 5000 })
              }
            }
          )
        } else {
          this.toggleSaving()
        }
      }
    )
  }

  private toggleSaving() {
    this.saving = !this.saving
  }
}
