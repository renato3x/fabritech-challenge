import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from '../material/material.module';
import { CpfPipe } from './pipes/cpf.pipe';
import { TelephonePipe } from './pipes/telephone.pipe';



@NgModule({
  declarations: [
    NavbarComponent,
    CpfPipe,
    TelephonePipe
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    NavbarComponent,
    CpfPipe,
    TelephonePipe
  ]
})
export class GlobalsModule { }
