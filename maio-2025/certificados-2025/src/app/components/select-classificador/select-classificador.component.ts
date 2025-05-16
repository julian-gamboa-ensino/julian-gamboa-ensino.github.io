import { Component, OnInit } from '@angular/core';
import { GetFotosBucketService } from '../../services/get-fotos-bucket.service';

@Component({
  selector: 'app-select-classificador',
  standalone: true,
  template: `
    <select (change)="selectChangeHandler($event)">
      @for (etiqueta of nome_pasta; track etiqueta) {
        <option>{{etiqueta}}</option>
      }
    </select>
  `,
  styles: []
})
export class SelectClassificadorComponent implements OnInit {
  nome_pasta: string[] = ['classificar', 'considerar validade'];
  nova_etiqueta: string = '';

  constructor(private fotosService: GetFotosBucketService) {}

  ngOnInit() {
    this.fotosService.getUrlImagem('').subscribe({
      next: (pastas) => {
        this.nome_pasta = pastas.reverse();
      },
      error: (err) => console.error('Erro ao carregar pastas:', err)
    });
  }

  selectChangeHandler(event: Event) {
    this.nova_etiqueta = (event.target as HTMLSelectElement).value;
  }
}