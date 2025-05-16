import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaPastasComponent } from './components/lista-pastas/lista-pastas.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListaPastasComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  styles: []
})
export class AppComponent {
  title = 'certificados-2025';
}
