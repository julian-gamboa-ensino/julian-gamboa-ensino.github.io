import { Component, HostListener, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetFotosBucketService } from '../../services/get-fotos-bucket.service';
import { JanelaModalClassificarComponent } from '../janela-modal-classificar/janela-modal-classificar.component';
import { timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


// Definindo as constantes para os códigos de tecla

enum KEY_CODE {
  RIGHT_ARROW = 'ArrowRight',
  LEFT_ARROW = 'ArrowLeft',
  UP_ARROW = 'ArrowUp',
  DOWN_ARROW = 'ArrowDown'
}

@Component({
  selector: 'app-novos',
  standalone: true,
  imports: [JanelaModalClassificarComponent],
  templateUrl:'./novos.component.html',
  // Define o estilo do componente
  // Aqui você pode adicionar estilos globais ou específicos
  // para o componente, se necessário.
   styles: []
})
export class NovosComponent implements OnInit {
  etiqueta = signal('juridico');
  indice_imagen = signal(0);
  maximo_indice_imagen = signal(0);
  imagem = signal<string[]>([]);

  constructor(
    private route: ActivatedRoute,
    private fotosService: GetFotosBucketService
  ) {}

  ngOnInit() {
    const parametro = this.route.snapshot.paramMap.get('parametro');
    if (parametro) {
      this.etiqueta.set(parametro);
    }
    this.getUrlImagem();
    timer(3000, 3000)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.avancoCertificados());
  }



  @HostListener('window:keyup', ['$event'])
keyEvent(event: KeyboardEvent) {
  if (event.key === KEY_CODE.RIGHT_ARROW) {
    this.increment();
  } else if (event.key === KEY_CODE.LEFT_ARROW) {
    this.decrement();
  } else if (event.key === KEY_CODE.UP_ARROW) {
    this.increment10();
  } else if (event.key === KEY_CODE.DOWN_ARROW) {
    this.decrement10();
  }
}

  private avancoCertificados() {
    if (this.indice_imagen() >= this.maximo_indice_imagen()) {
      this.indice_imagen.set(0);
    } else {
      this.indice_imagen.update(i => i + 1);
    }
  }

  private increment() {
    if (this.indice_imagen() + 1 < this.maximo_indice_imagen()) {
      this.indice_imagen.update(i => i + 1);
            console.log(this.indice_imagen());

    }
  }

  private decrement() {
    if (this.indice_imagen() > 0) {
      this.indice_imagen.update(i => i - 1);
    }
  }

  private increment10() {
    if (this.indice_imagen() + 10 < this.maximo_indice_imagen()) {
      this.indice_imagen.update(i => i + 10);
    }
  }

  private decrement10() {
    if (this.indice_imagen() > 10) {
      this.indice_imagen.update(i => i - 10);
    }
  }

  private getUrlImagem() {
    this.fotosService.getUrlImagem(this.etiqueta()).subscribe({
      next: (urls) => {
        this.imagem.set(urls.reverse());
        this.maximo_indice_imagen.set(urls.length);
      },
      error: (err) => console.error('Erro ao carregar imagens:', err)
    });
  }
}
