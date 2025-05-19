import { Routes } from '@angular/router';
import { NovosComponent } from './components/novos/novos.component';

export const routes: Routes = [
  { path: '', component: NovosComponent },
  { path: ':parametro/:parametro', component: NovosComponent },
];
