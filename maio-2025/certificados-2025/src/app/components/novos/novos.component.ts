import { Component, HostListener, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetFotosBucketService } from '../../services/get-fotos-bucket.service';
import { JanelaModalClassificarComponent } from '../janela-modal-classificar/janela-modal-classificar.component';
import { timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-novos',
  imports: [],
  templateUrl: './novos.component.html',
  styleUrl: './novos.component.css'
})



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
  template: `
    <header>
      <div class="bg-dark collapse" id="navbarHeader">
        <div class="container">
          <div class="row">
            <div class="col-sm-8 col-md-7 py-4">
              <h4 class="text-white">Informações</h4>
              <p class="text-muted">
                Certificados obtidos até o ano 2025<br>
              </p>
            </div>
            <div class="col-sm-4 offset-md-1 py-4">
              <h4 class="text-white">Julian Gamboa</h4>
              <ul class="list-unstyled">
                <li><a href="https://github.com/julian-gamboa-bahia" class="text-white">Github</a></li>
                <li><a href="https://github.com/julian-gamboa-ensino" class="text-white">Github Educativo</a></li>
                <li><a href="https://www.linkedin.com/in/julian-gamboa-bahia/" class="text-white">LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="navbar navbar-dark bg-dark box-shadow">
        <div class="container d-flex justify-content-between">
          <a href="" class="navbar-brand d-flex align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
            <strong>{{etiqueta()}} (2025)</strong>
          </a>
          <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
    </header>
    <main role="main">
      <div class="album py-5 bg-light">
        <div class="container">
          @for (row of [0, 3, 6]; track row) {
            <div class="row">
              @for (col of [0, 1, 2]; track col) {
                @if (imagem()[row + col]) {
                  <div class="col-md-4">
                    <div class="card mb-4 box-shadow">
                      <img id="imagem-{{row + col + 1}}" [src]="imagem()[row + col]" class="card-img-top" alt="Image {{row + col + 1}}" style="height: 225px; width: 100%; display: block;">
                      <app-janela-modal-classificar [nome_imagem]="imagem()[row + col]" [etiqueta_imagem]="etiqueta()"></app-janela-modal-classificar>
                    </div>
                  </div>
                }
              }
            </div>
          }
        </div>
      </div>
    </main>
    <footer class="text-muted">
      <div class="container">
        <p>Colocado no meu <a href="https://github.com/julian-gamboa-ensino/node-gestor-imagens">Github de ensino</a></p>
      </div>
    </footer>
  `,
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
    switch (event.key) {
      case KEY_CODE.RIGHT_ARROW:
        this.increment();
        break;
      case KEY_CODE.LEFT_ARROW:
        this.decrement();
        break;
      case KEY_CODE.UP_ARROW:
        this.increment10();
        break;
      case KEY_CODE.DOWN_ARROW:
        this.decrement10();
        break;
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
