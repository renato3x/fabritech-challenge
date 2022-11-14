import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from '../material/material.module';
import { CpfPipe } from './pipes/cpf.pipe';



@NgModule({
  declarations: [
    NavbarComponent,
    CpfPipe
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    NavbarComponent,
    CpfPipe
  ]
})
export class GlobalsModule { }
