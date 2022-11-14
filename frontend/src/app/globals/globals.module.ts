import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from '../material/material.module';
import { CpfPipe } from './pipes/cpf.pipe';
import { TelephonePipe } from './pipes/telephone.pipe';
import { CepPipe } from './pipes/cep.pipe';



@NgModule({
  declarations: [
    NavbarComponent,
    CpfPipe,
    TelephonePipe,
    CepPipe
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    NavbarComponent,
    CpfPipe,
    TelephonePipe,
    CepPipe
  ]
})
export class GlobalsModule { }
