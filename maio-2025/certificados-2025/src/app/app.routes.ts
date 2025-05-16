import { Routes } from '@angular/router';
import { ListaPastasComponent } from './components/lista-pastas/lista-pastas.component';
import { NovosComponent } from './components/novos/novos.component';

export const routes: Routes = [
  { path: '', component: ListaPastasComponent },
  { path: ':parametro/:parametro', component: NovosComponent },
];
