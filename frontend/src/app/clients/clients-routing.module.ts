import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TokenVerificationGuard } from '../globals/guards/token-verification.guard';
import { ClientsListComponent } from './pages/clients-list/clients-list.component';
import { NewClientComponent } from './pages/new-client/new-client.component';

const routes: Routes = [
  {
    path: '',
    component: ClientsListComponent,
    canActivate: [
      TokenVerificationGuard
    ]
  },
  {
    path: 'new',
    component: NewClientComponent,
    canActivate: [
      TokenVerificationGuard
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
