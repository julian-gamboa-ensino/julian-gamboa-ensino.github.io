import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaPastasComponent } from './components/lista-pastas/lista-pastas.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListaPastasComponent],
  template: `
    <app-lista-pastas></app-lista-pastas>
    <main role="main" class="container">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: []
})
export class AppComponent {
  title = 'certificados-2025';
}
