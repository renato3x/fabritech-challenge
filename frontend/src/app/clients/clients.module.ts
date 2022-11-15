import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsListComponent } from './pages/clients-list/clients-list.component';
import { MaterialModule } from '../material/material.module';
import { NewClientComponent } from './pages/new-client/new-client.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientComponent } from './pages/client/client.component';
import { GlobalsModule } from '../globals/globals.module';
import { ConfirmClientDeletionComponent } from './components/confirm-client-deletion/confirm-client-deletion.component';
import { ConfirmKinshipDeletionComponent } from './components/confirm-kinship-deletion/confirm-kinship-deletion.component';


@NgModule({
  declarations: [
    ClientsListComponent,
    NewClientComponent,
    ClientComponent,
    ConfirmClientDeletionComponent,
    ConfirmKinshipDeletionComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    GlobalsModule
  ]
})
export class ClientsModule { }
