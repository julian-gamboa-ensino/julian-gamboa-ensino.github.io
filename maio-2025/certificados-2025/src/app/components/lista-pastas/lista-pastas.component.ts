import { Component, OnInit } from '@angular/core';
import { GetListaPastasService } from '../../services/get-lista-pastas.service';

@Component({
  selector: 'app-lista-pastas',
  standalone: true,
  template: `

  `,
  styles: []
})
export class ListaPastasComponent implements OnInit {
  nome_pasta: string[] = [];

  constructor(private readonly pastasService: GetListaPastasService) {}

  ngOnInit() {
    this.pastasService.getUrlImagem('').subscribe({
      next: (pastas: string[]) => {
        this.nome_pasta = pastas.reverse();
        console.log('Pastas:', this.nome_pasta);
      },
      error: (err: any) => console.error('Erro ao carregar pastas:', err)
    });
  }
}
