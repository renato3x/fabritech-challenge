import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsListComponent } from './pages/clients-list/clients-list.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    ClientsListComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    MaterialModule
  ]
})
export class ClientsModule { }
