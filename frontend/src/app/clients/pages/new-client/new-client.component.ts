import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, Subject } from 'rxjs';
import { Client } from 'src/app/globals/models/Client';
import { ClientsService } from 'src/app/globals/services/clients.service';
import { ViaCepService } from 'src/app/globals/services/via-cep.service';
import { states } from 'src/app/globals/states';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit {

  states = states

  clientForm: FormGroup = this.builder.group({
    firstName: ['', [ Validators.required ]],
    lastName: ['', [ Validators.required ]],
    birthDate: ['', [ Validators.required ]],
    cpf: ['', [ Validators.required, Validators.minLength(11), Validators.maxLength(14) ]],
    rg: ['', [ Validators.required, Validators.minLength(7), Validators.maxLength(7) ]],
    telephone: ['', [ Validators.required ]],
    email: ['', [ Validators.required, Validators.email ]],
    address: this.builder.group({
      city: ['', [ Validators.required ]],
      name: ['', [ Validators.required ]],
      cep: ['', [ Validators.required, Validators.minLength(8), Validators.maxLength(9) ]],
      number: ['', [ Validators.required ]],
      district: ['', [ Validators.required ]],
      state: ['', [ Validators.required ]],
      complement: ['', [ Validators.required ]]
    }),
    kinships: this.builder.array([])
  })

  kinships: FormArray = this.clientForm.get('kinships') as FormArray

  cepEmitter$: Subject<string> = new Subject<string>()

  saving: boolean = false

  constructor(
    private builder: FormBuilder,
    private clientsService: ClientsService,
    private snackbar: MatSnackBar,
    private viaCepService: ViaCepService
  ) { }

  ngOnInit(): void {
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

  addKinship() {
    this.kinships.push(this.builder.group({
      name: ['', [ Validators.required ]],
      kinship: ['', [ Validators.required ]]
    }))
  }

  removeKinship(index: number) {
    this.kinships.removeAt(index)
  }

  save() {
    this.toggleSaving()
    const client = this.clientForm.value as Client

    this.clientsService.create(client)
    .subscribe(
      client => {
        this.toggleSaving()
        this.snackbar.open('Cliente salvo com sucesso', 'Ok', { duration: 5000 })
      },
      error => {
        if (error instanceof HttpErrorResponse) {
          this.snackbar.open(error.error.message, 'Ok', { duration: 5000 })
        } else {
          this.snackbar.open('Erro ao salvar cliente', 'Ok', { duration: 5000 })
        }
      }
    )
  }

  emitCep(cep: string) {
    this.cepEmitter$.next(cep)
  }

  getCepData(cep: string) {
    this.viaCepService
    .getCep(cep)
    .subscribe(
      cep => {
        const addressFields = this.clientForm.get('address') as FormGroup

        addressFields.setValue({
          ...addressFields.value,
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

  private toggleSaving() {
    this.saving = !this.saving
  }
}
