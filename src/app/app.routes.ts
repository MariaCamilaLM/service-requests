import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { ClientTicketsComponent } from './components/client-tickets/client-tickets.component';
import { ClientRoleGuard } from './guards/client-role.guard';
import { CreateTicketComponent } from './components/create-ticket/create-ticket.component';
import { TicketDetailsComponent } from './components/ticket-details/ticket-details.component';
import { EngineerDashboardComponent } from './components/engineer-dashboard/engineer-dashboard.component';
import { engineerRoleGuard } from './guards/engineer-role.guard';

export const routes: Routes = [
  {
    path: 'client',
    canActivate: [AuthGuard, ClientRoleGuard],
    component: ClientTicketsComponent,
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'client/create-request',
    canActivate: [AuthGuard, ClientRoleGuard],
    component: CreateTicketComponent,
  },
  {
    path: 'ticket/:id',
    canActivate: [AuthGuard],
    component: TicketDetailsComponent,
  },
  {
    path: 'engineer',
    canActivate: [AuthGuard, engineerRoleGuard],
    component: EngineerDashboardComponent
  }
];
