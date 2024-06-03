import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardService } from './core/services/auth-guard.service';
import { AddPartyComponent } from './components/add-party/add-party.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [AuthGuardService],
    children: [{ path: 'home', component: HomeComponent },
    { path: 'add-party', component: AddPartyComponent },
    { path: 'edit-party', component: AddPartyComponent },
    { path: 'view-party-detail', component: AddPartyComponent }
    ],
  },
];
