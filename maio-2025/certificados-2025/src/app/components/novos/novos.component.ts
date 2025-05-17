import { Component, HostListener, OnInit, signal, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetFotosBucketService } from '../../services/get-fotos-bucket/get-fotos-bucket.service';
import { JanelaModalClassificarComponent } from '../janela-modal-classificar/janela-modal-classificar.component';
import { timer, Subscription } from 'rxjs';
import { ListaPastasComponent } from '../lista-pastas/lista-pastas.component';

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
  imports: [JanelaModalClassificarComponent,ListaPastasComponent],
  templateUrl: './novos.component.html',
  styles: []
})
export class NovosComponent implements OnInit {
  etiqueta = signal('novo');
  indice_imagen = signal(0);
  maximo_indice_imagen = signal(0);
  imagem = signal<string[]>([]);
  
  private timerSubscription: Subscription | null = null; // Para gerenciar o timer
  private destroyRef = inject(DestroyRef); // Injeta o DestroyRef

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
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // Pausa o timer ao interagir com as teclas
    this.pauseTimer();
    
    if (event.key === KEY_CODE.RIGHT_ARROW) {
      this.increment();
    } else if (event.key === KEY_CODE.LEFT_ARROW) {
      this.decrement();
    } else if (event.key === KEY_CODE.UP_ARROW) {
      this.increment10();
    } else if (event.key === KEY_CODE.DOWN_ARROW) {
      this.decrement10();
    }

    //console.log(this.indice_imagen());
    
    // Reinicia o timer após a interação
    this.startTimer();
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

  private startTimer() {
    // Evita múltiplos timers
    this.pauseTimer();
    
    if (this.maximo_indice_imagen() > 0) {
      this.timerSubscription = timer(3000, 3000).subscribe(() => {
        this.avancoCertificados();
      });
      
      // Cancela a subscrição quando o componente for destruído
      this.destroyRef.onDestroy(() => {
        this.pauseTimer();
      });
    }
  }

  private pauseTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = null;
    }
  }

  private getUrlImagem() {
    this.fotosService.getUrlImagem(this.etiqueta()).subscribe({
      next: (urls) => {
        if (urls && urls.length > 0) {
          this.imagem.set(urls.reverse());
          this.maximo_indice_imagen.set(urls.length);
          this.startTimer(); // Inicia o timer após carregar as imagens
        } else {
          console.warn('Nenhuma imagem carregada.');
        }
      },
      error: (err) => {
        console.error('Erro ao carregar imagens:', err);
      }
    });
  }
}