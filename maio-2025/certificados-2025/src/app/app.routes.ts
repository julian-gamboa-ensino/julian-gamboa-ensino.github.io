import { Routes } from '@angular/router';
import { NovosComponent } from './components/novos/novos.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', component: NovosComponent },
  { path: ':parametro/:parametro', component: NovosComponent },
    { path: 'login', component: LoginComponent }
];
