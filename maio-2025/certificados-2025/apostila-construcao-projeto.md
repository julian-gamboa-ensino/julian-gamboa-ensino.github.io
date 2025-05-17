# Apostila: Desenvolvimento de um Projeto Angular e Configuração de Bucket S3

Esta apostila é um guia prático para alunos que desejam recriar um projeto Angular para exibição de certificados e configurar um bucket S3 na AWS para hospedar e acessar arquivos JSON, garantindo a aceitação de requisições CORS. O projeto é composto por componentes Angular que exibem imagens de certificados organizadas por pastas, com navegação interativa e integração com serviços backend hospedados no S3.

## Parte 1: Recriando o Projeto Angular

### Visão Geral do Projeto
O projeto é uma aplicação Angular standalone que exibe certificados armazenados em um bucket S3. Ele possui os seguintes componentes principais:
- **AppComponent**: Componente raiz que configura o roteamento.
- **NovosComponent**: Exibe uma grade de certificados com navegação por teclado e timer para rotação automática.
- **ListaPastasComponent**: Lista as pastas disponíveis no bucket S3.
- **JanelaModalClassificarComponent**: Modal para classificar certificados.
- **SelectClassificadorComponent**: Permite selecionar etiquetas para filtrar certificados.
- **FrontEndComponent**: Placeholder para funcionalidades futuras.
- **Serviços**:
  - **GetFotosBucketService**: Recupera URLs de imagens do S3.
  - **GetListaPastasService**: Recupera a lista de pastas do S3.

Abaixo, detalhamos como programar cada componente com comentários explicativos.

---

### Estrutura do Projeto
Crie um novo projeto Angular com o comando:
```bash
ng new certificados-2025 --standalone --routing
```

Certifique-se de instalar as dependências necessárias:
```bash
npm install @ng-bootstrap/ng-bootstrap rxjs
```

Adicione o módulo Bootstrap ao projeto (adicione ao `index.html` ou importe os estilos no `styles.css`):
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
```

---

### 1. Configurando o Componente Raiz (`AppComponent`)

**Arquivo: `src/app/app.component.ts`**
Este componente é o ponto de entrada da aplicação e configura o roteamento.

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Define o componente raiz com seletor 'app-root'
@Component({
  selector: 'app-root',
  standalone: true, // Componente standalone, não depende de módulo NgModule
  imports: [RouterOutlet], // Importa RouterOutlet para suportar roteamento
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'certificados-2025'; // Propriedade para o título da aplicação
}
```

**Arquivo: `src/app/app.component.html`**
O template é mínimo, pois o conteúdo é renderizado via roteamento.

```html
<router-outlet></router-outlet>
```

**Arquivo: `src/app/app.config.ts`**
Configura os provedores globais da aplicação, como roteamento e otimização de detecção de mudanças.

```typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// Configuração global da aplicação
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // Otimiza detecção de mudanças
    provideRouter(routes), // Configura as rotas definidas em app.routes.ts
  ],
};
```

**Arquivo: `src/app/app.routes.ts`**
Define as rotas da aplicação.

```typescript
import { Routes } from '@angular/router';
import { NovosComponent } from './components/novos/novos.component';

// Define as rotas da aplicação
export const routes: Routes = [
  { path: '', component: NovosComponent }, // Rota padrão carrega NovosComponent
  { path: ':parametro/:parametro', component: NovosComponent }, // Rota com parâmetro para filtrar certificados
];
```

**Explicação**:
- O `AppComponent` é simples e serve como contêiner para o roteamento.
- O `RouterOutlet` renderiza os componentes com base na URL.
- O `app.config.ts` habilita o roteamento e otimiza a detecção de mudanças.
- As rotas permitem navegar para `NovosComponent` com ou sem parâmetros.

---

### 2. Criando o Componente `NovosComponent`

**Arquivo: `src/app/components/novos/novos.component.ts`**
Este componente exibe uma grade de certificados e suporta navegação por teclado e rotação automática.

```typescript
import { Component, HostListener, OnInit, signal, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetFotosBucketService } from '../../services/get-fotos-bucket/get-fotos-bucket.service';
import { JanelaModalClassificarComponent } from '../janela-modal-classificar/janela-modal-classificar.component';
import { ListaPastasComponent } from '../lista-pastas/lista-pastas.component';
import { timer, Subscription } from 'rxjs';

// Define códigos de tecla para navegação
enum KEY_CODE {
  RIGHT_ARROW = 'ArrowRight',
  LEFT_ARROW = 'ArrowLeft',
  UP_ARROW = 'ArrowUp',
  DOWN_ARROW = 'ArrowDown',
}

@Component({
  selector: 'app-novos',
  standalone: true,
  imports: [JanelaModalClassificarComponent, ListaPastasComponent], // Importa componentes dependentes
  templateUrl: './novos.component.html',
  styles: [],
})
export class NovosComponent implements OnInit {
  // Sinais para gerenciar estado reativo
  etiqueta = signal('novo'); // Etiqueta atual dos certificados
  indice_imagen = signal(0); // Índice da imagem atual
  maximo_indice_imagen = signal(0); // Número total de imagens
  imagem = signal([]); // Lista de URLs das imagens

  private timerSubscription: Subscription | null = null; // Gerencia o timer de rotação
  private destroyRef = inject(DestroyRef); // Injeta DestroyRef para limpeza

  constructor(
    private route: ActivatedRoute, // Para acessar parâmetros da URL
    private fotosService: GetFotosBucketService // Serviço para recuperar imagens
  ) {}

  ngOnInit() {
    // Recupera o parâmetro da URL e atualiza a etiqueta
    const parametro = this.route.snapshot.paramMap.get('parametro');
    if (parametro) {
      this.etiqueta.set(parametro);
    }
    this.getUrlImagem(); // Carrega as imagens
  }

  // Escuta eventos de teclado para navegação
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    this.pauseTimer(); // Pausa o timer ao interagir
    if (event.key === KEY_CODE.RIGHT_ARROW) {
      this.increment(); // Próxima imagem
    } else if (event.key === KEY_CODE.LEFT_ARROW) {
      this.decrement(); // Imagem anterior
    } else if (event.key === KEY_CODE.UP_ARROW) {
      this.increment10(); // Avança 10 imagens
    } else if (event.key === KEY_CODE.DOWN_ARROW) {
      this.decrement10(); // Retrocede 10 imagens
    }
    this.startTimer(); // Reinicia o timer
  }

  // Avança automaticamente para a próxima imagem
  private avancoCertificados() {
    if (this.indice_imagen() >= this.maximo_indice_imagen()) {
      this.indice_imagen.set(0); // Volta ao início
    } else {
      this.indice_imagen.update((i) => i + 1); // Incrementa índice
    }
  }

  // Incrementa o índice em 1
  private increment() {
    if (this.indice_imagen() + 1 < this.maximo_indice_imagen()) {
      this.indice_imagen.update((i) => i + 1);
    }
  }

  // Decrementa o índice em 1
  private decrement() {
    if (this.indice_imagen() > 0) {
      this.indice_imagen.update((i) => i - 1);
    }
  }

  // Incrementa o índice em 10
  private increment10() {
    if (this.indice_imagen() + 10 < this.maximo_indice_imagen()) {
      this.indice_imagen.update((i) => i + 10);
    }
  }

  // Decrementa o índice em 10
  private decrement10() {
    if (this.indice_imagen() > 10) {
      this.indice_imagen.update((i) => i - 10);
    }
  }

  // Inicia o timer para rotação automática
  private startTimer() {
    this.pauseTimer(); // Evita múltiplos timers
    if (this.maximo_indice_imagen() > 0) {
      this.timerSubscription = timer(3000, 3000).subscribe(() => {
        this.avancoCertificados(); // Avança a cada 3 segundos
      });
      // Cancela o timer quando o componente é destruído
      this.destroyRef.onDestroy(() => {
        this.pauseTimer();
      });
    }
  }

  // Pausa o timer
  private pauseTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = null;
    }
  }

  // Carrega URLs das imagens do serviço
  private getUrlImagem() {
    this.fotosService.getUrlImagem(this.etiqueta()).subscribe({
      next: (urls) => {
        if (urls && urls.length > 0) {
          this.imagem.set(urls.reverse()); // Inverte a ordem das URLs
          this.maximo_indice_imagen.set(urls.length); // Define o total de imagens
          this.startTimer(); // Inicia o timer
        } else {
          console.warn('Nenhuma imagem carregada.');
        }
      },
      error: (err) => {
        console.error('Erro ao carregar imagens:', err);
      },
    });
  }
}
```

**Arquivo: `src/app/components/novos/novos.component.html`**
O template exibe informações do desenvolvedor, uma grade de certificados e links para mídias sociais.

```html
<div class="container">
  <!-- Seção de informações -->
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-body">
          <h5>Informações</h5>
          <p>Certificados obtidos até o ano 2025</p>
        </div>
        <div class="card-body">
          <h5>Julian Gamboa</h5>
          <a href="#" class="card-link">Github</a>
          <a href="#" class="card-link">Github Educativo</a>
          <a href="#" class="card-link">LinkedIn</a>
        </div>
      </div>
    </div>
  </div>

  <!-- Seção de certificados -->
  <div class="row">
    <div class="col">
      <h3>{{ etiqueta() }} (Certificados 2025)</h3>
      <app-lista-pastas></app-lista-pastas> <!-- Componente para listar pastas -->
    </div>
  </div>

  <!-- Grade de imagens -->
  <div class="row">
    <div class="col">
      @for (row of [0, 3, 6]; track row) {
        <div class="row">
          @for (col of [0, 1, 2]; track col) {
            @if (imagem()[indice_imagen() + row + col]) {
              <div class="col-4">
                <div class="card">
                  <img
                    [src]="imagem()[indice_imagen() + row + col]"
                    class="card-img-top"
                    alt="Certificado"
                  />
                </div>
              </div>
            }
          }
        </div>
      }
    </div>
  </div>

  <!-- Link para Github Educativo -->
  <div class="row">
    <div class="col">
      <p>
        Colocado no meu
        <a href="#" target="_blank">Github de ensino</a>
      </p>
    </div>
  </div>
</div>
```

**Explicação**:
- **Sinais**: Usam `signal` para gerenciar o estado reativo (etiqueta, índice, imagens).
- **Navegação por teclado**: O decorador `@HostListener` captura eventos de teclado (setas) para navegar entre imagens.
- **Timer**: Um `timer` de 3 segundos avança automaticamente as imagens, pausado durante interação.
- **Grade de imagens**: Exibe até 9 imagens em uma grade 3x3, usando `@for` para iterar.
- **Serviço**: Integra com `GetFotosBucketService` para carregar URLs de imagens do S3.

---

### 3. Criando o Componente `ListaPastasComponent`

**Arquivo: `src/app/components/lista-pastas/lista-pastas.component.ts`**
Lista as pastas disponíveis no bucket S3.

```typescript
import { Component, OnInit } from '@angular/core';
import { GetListaPastasService } from '../../services/get-lista-pastas/get-lista-pastas.service';

@Component({
  selector: 'app-lista-pastas',
  standalone: true,
  templateUrl: './lista-pastas.component.html',
  styleUrls: ['./lista-pastas.component.css'],
})
export class ListaPastasComponent implements OnInit {
  nome_pasta: string[] = []; // Lista de nomes de pastas

  constructor(private readonly pastasService: GetListaPastasService) {}

  ngOnInit() {
    // Carrega a lista de pastas do serviço
    this.pastasService.getUrlImagem('').subscribe({
      next: (pastas: string[]) => {
        this.nome_pasta = pastas.reverse(); // Inverte a ordem das pastas
        console.log('Pastas:', this.nome_pasta);
      },
      error: (err: any) => console.error('Erro ao carregar pastas:', err),
    });
  }
}
```

**Arquivo: `src/app/components/lista-pastas/lista-pastas.component.html`**
Exibe as pastas como botões clicáveis.

```html
<div class="container">
  <div class="row">
    <div class="col">
      <h5>Tecnologia</h5>
      <a class="btn btn-custom" href="/novo">novo</a>
      @for (etiqueta of nome_pasta; track etiqueta) {
        <a class="btn btn-custom" [href]="etiqueta">{{ etiqueta }}</a>
      }
    </div>
  </div>
</div>
```

**Arquivo: `src/app/components/lista-pastas/lista-pastas.component.css`**
Estiliza os botões.

```css
.btn-custom {
  background-color: #fff; /* Botão branco */
  color: #000; /* Texto preto */
  border: none;
}
.btn-custom:hover {
  background-color: #fff; /* Mantém a cor no hover */
  color: #000; /* Mantém o texto preto */
  box-shadow: none; /* Remove sombra no hover */
}
```

**Explicação**:
- Recupera a lista de pastas do `GetListaPastasService`.
- Exibe cada pasta como um botão que redireciona para a rota correspondente.
- O estilo mantém botões simples e sem sombra ao passar o mouse.

---

### 4. Criando o Componente `JanelaModalClassificarComponent`

**Arquivo: `src/app/components/janela-modal-classificar/janela-modal-classificar.component.ts`**
Gerencia um modal para classificar certificados.

```typescript
import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectClassificadorComponent } from '../select-classificador/select-classificador.component';

@Component({
  selector: 'app-janela-modal-classificar',
  standalone: true,
  imports: [SelectClassificadorComponent], // Importa componente de seleção
  templateUrl: './janela-modal-classificar.component.html',
  styles: [],
})
export class JanelaModalClassificarComponent {
  @Input() nome_imagem: string = ''; // Nome da imagem a ser classificada
  @Input() etiqueta_imagem: string = ''; // Etiqueta atual da imagem

  constructor(private readonly modalService: NgbModal) {}

  // Abre o modal
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => console.log(`Modal fechado com: ${result}`),
      (reason) => console.log(`Modal dispensado: ${reason}`)
    );
  }
}
```

**Arquivo: `src/app/components/janela-modal-classificar/janela-modal-classificar.component.html`**
Define o template do modal.

```html
<div class="container">
  <div class="row">
    <div class="col">
      <h5>Tecnologia</h5>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <div class="card">
        <app-select-classificador></app-select-classificador> <!-- Componente de seleção -->
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <h3>Tecnologia ({{ etiqueta_imagem }})</h3>
    </div>
  </div>
  <div class="row">
    <div class="col">
      {{ etiqueta_imagem }}
    </div>
  </div>
</div>
```

**Explicação**:
- Usa o `NgbModal` do ng-bootstrap para abrir um modal.
- Integra o `SelectClassificadorComponent` para selecionar etiquetas.
- Recebe `nome_imagem` e `etiqueta_imagem` como inputs.

---

### 5. Criando o Componente `SelectClassificadorComponent`

**Arquivo: `src/app/components/select-classificador/select-classificador.component.ts`**
Permite selecionar etiquetas para classificar certificados.

```typescript
import { Component, OnInit } from '@angular/core';
import { GetFotosBucketService } from '../../services/get-fotos-bucket/get-fotos-bucket.service';

@Component({
  selector: 'app-select-classificador',
  standalone: true,
  templateUrl: './select-classificador.component.html',
  styles: [],
})
export class SelectClassificadorComponent implements OnInit {
  nome_pasta: string[] = ['classificar', 'considerar validade']; // Pastas iniciais
  nova_etiqueta: string = ''; // Etiqueta selecionada

  constructor(private fotosService: GetFotosBucketService) {}

  ngOnInit() {
    // Carrega a lista de pastas
    this.fotosService.getUrlImagem('').subscribe({
      next: (pastas) => {
        this.nome_pasta = pastas.reverse(); // Inverte a ordem
      },
      error: (err) => console.error('Erro ao carregar pastas:', err),
    });
  }

  // Atualiza a etiqueta selecionada
  selectChangeHandler(event: Event) {
    this.nova_etiqueta = (event.target as HTMLSelectElement).value;
  }
}
```

**Arquivo: `src/app/components/select-classificador/select-classificador.component.html`**
Exibe um dropdown com as etiquetas.

```html
<select (change)="selectChangeHandler($event)">
  @for (etiqueta of nome_pasta; track etiqueta) {
    <option [value]="etiqueta">{{ etiqueta }}</option>
  }
</select>
```

**Explicação**:
- Carrega pastas do `GetFotosBucketService`.
- O dropdown permite selecionar uma etiqueta, atualizando `nova_etiqueta`.

---

### 6. Criando o Componente `FrontEndComponent`

**Arquivo: `src/app/components/front-end/front-end.component.ts`**
Placeholder para funcionalidades futuras.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-front-end',
  standalone: true,
  templateUrl: './front-end.component.html',
  styleUrls: ['./front-end.component.css'],
})
export class FrontEndComponent {}
```

**Arquivo: `src/app/components/front-end/front-end.component.html`**
Template básico.

```html
<p>front-end works!</p>
```

**Explicação**:
- Este componente é um esboço e pode ser expandido para novas funcionalidades.

---

### 7. Configurando os Serviços

**Arquivo: `src/app/services/get-fotos-bucket/get-fotos-bucket.service.ts`**
Recupera URLs de imagens do S3.

```typescript
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root', // Disponível em toda a aplicação
})
export class GetFotosBucketService {
  private http = inject(HttpClient);
  private url = environment.apiUrl + '/conteudo_pasta/'; // URL base do S3

  // Recupera URLs de imagens para uma etiqueta
  getUrlImagem(etiqueta: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}${etiqueta}.json`).pipe(
      retry(2), // Tenta novamente 2 vezes em caso de falha
      catchError(this.handleError) // Trata erros
    );
  }

  // Trata erros HTTP
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Código do erro: ${error.status}, mensagem: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
```

**Arquivo: `src/app/services/get-lista-pastas/get-lista-pastas.service.ts`**
Recupera a lista de pastas do S3.

```typescript
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of, retry, shareReplay } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GetListaPastasService {
  private readonly http = inject(HttpClient);
  private readonly url = environment.useMock
    ? '/assets/mock/pastas.json' // Mock para desenvolvimento
    : `${environment.apiUrl}/pastas.json`; // URL do S3
  private cache$: Observable<string[]> | null = null; // Cache para evitar requisições repetidas
  private readonly fallbackPastas: string[] = ['error', '2025']; // Pastas padrão em caso de erro

  // Recupera a lista de pastas
  getUrlImagem(etiqueta: string = ''): Observable<string[]> {
    if (this.cache$) {
      return this.cache$; // Retorna do cache se disponível
    }

    const requestUrl = etiqueta ? `${this.url}/${etiqueta}` : this.url;
    console.log('Tentando carregar pastas de:', requestUrl);
    this.cache$ = this.http.get<string[]>(requestUrl).pipe(
      retry({ count: 1, delay: 1000 }), // Tenta novamente após 1 segundo
      catchError((error) => {
        console.warn('Falha ao carregar pastas, usando fallback:', error.message);
        return of(this.fallbackPastas); // Retorna pastas padrão
      }),
      shareReplay(1) // Cacheia a resposta
    );

    return this.cache$;
  }

  // Limpa o cache
  clearCache() {
    this.cache$ = null;
  }

  // Trata erros HTTP
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Erro desconhecido ao carregar lista de pastas.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro do cliente: ${error.error.message}`;
    } else {
      errorMessage = `Erro do servidor: Código ${error.status}, Mensagem: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
```

**Explicação**:
- **GetFotosBucketService**: Faz requisições HTTP para recuperar URLs de imagens baseadas em etiquetas.
- **GetListaPastasService**: Recupera a lista de pastas, com cache para otimizar requisições e fallback em caso de erro.

---

### 8. Configurando o Arquivo Principal e Ambientes

**Arquivo: `src/main.ts`**
Inicializa a aplicação Angular.

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

// Inicializa a aplicação
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Configura roteamento
    provideHttpClient(), // Habilita cliente HTTP
  ],
}).catch((err) => console.error(err));
```

**Arquivo: `src/environments/environment.ts`**
Configurações para desenvolvimento.

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://cv-julian-2022.s3.us-west-2.amazonaws.com', // URL do bucket S3
  useMock: false, // Desativa mock
};
```

**Arquivo: `src/environments/environment.prod.ts`**
Configurações para produção.

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://cv-julian-2022.s3.us-west-2.amazonaws.com',
  useMock: false,
};
```

**Explicação**:
- O `main.ts` inicializa a aplicação com roteamento e HTTP.
- Os arquivos de ambiente definem a URL do bucket S3.

---

## Parte 2: Configurando o Bucket S3 para CORS

Para que a aplicação Angular acesse os arquivos JSON no bucket S3, é necessário configurar o CORS (Cross-Origin Resource Sharing) no AWS S3.

### Passo 1: Criar um Bucket S3
1. Acesse o console da AWS e vá para o serviço **S3**.
2. Clique em **Create bucket**.
3. Escolha um nome único (ex.: `cv-julian-2025`).
4. Selecione a região desejada (ex.: `us-east-1`).
5. Desmarque **Block all public access** para permitir acesso público (necessário para a aplicação).
6. Clique em **Create bucket**.

### Passo 2: Fazer Upload dos Arquivos
1. Entre no bucket criado.
2. Crie uma pasta chamada `json-certificados-dio` (ou conforme a estrutura do projeto).
3. Faça upload dos arquivos JSON (ex.: `novo.json`, `pastas.json`) que contêm as URLs das imagens e listas de pastas.
4. Certifique-se de que os arquivos têm permissões públicas:
   - Selecione o arquivo, clique em **Actions** > **Make public using ACL**.

### Passo 3: Configurar a Política de CORS
1. No console do S3, selecione o bucket.
2. Vá para a aba **Permissions**.
3. Role até **Cross-origin resource sharing (CORS)** e clique em **Edit**.
4. Insira a seguinte configuração CORS:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET"],
    "AllowedOrigins": ["http://localhost:4200", "https://your-production-domain.com"],
    "ExposeHeaders": [],
    "MaxAgeSeconds": 3000
  }
]
```

- **AllowedOrigins**: Inclua `http://localhost:4200` para desenvolvimento e o domínio de produção (se aplicável).
- **AllowedMethods**: `GET` é suficiente, pois a aplicação apenas lê os arquivos JSON.
- **AllowedHeaders**: `*` permite qualquer cabeçalho.

5. Clique em **Save changes**.

### Passo 4: Configurar a Política do Bucket
1. Ainda na aba **Permissions**, role até **Bucket policy** e clique em **Edit**.
2. Insira a seguinte política para permitir acesso público aos arquivos:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::cv-julian-2025/*"
    }
  ]
}
```

- Substitua `cv-julian-2025` pelo nome do seu bucket.
- Esta política permite que qualquer pessoa acesse os objetos no bucket com a ação `GetObject`.

3. Clique em **Save changes**.

### Passo 5: Testar o Acesso
1. Execute a aplicação Angular localmente:
   ```bash
   ng serve
   ```
2. Abra o navegador em `http://localhost:4200`.
3. Verifique no console do navegador se as requisições para o S3 (ex.: `https://cv-julian-2025.s3.us-east-1.amazonaws.com/json-certificados-dio/novo.json`) retornam os dados JSON sem erros de CORS.
4. Se houver erros, revise a configuração CORS e a política do bucket.

---

## Dicas Adicionais
- **Segurança**: Para produção, considere usar um CloudFront com o bucket S3 para adicionar camadas de segurança (ex.: WAF, restrições de origem).
- **Mock para Desenvolvimento**: Se o bucket S3 não estiver disponível, ative `useMock: true` no `environment.ts` e crie um arquivo `src/assets/mock/pastas.json` com dados fictícios.
- **Testes**: Execute os testes unitários com `ng test` para garantir que os componentes foram criados corretamente.

---

## Conclusão
Esta apostila fornece um guia detalhado para recriar o projeto Angular e configurar um bucket S3 com CORS. Seguindo as instruções, os alunos poderão:
1. Implementar cada componente com compreensão clara de sua funcionalidade.
2. Configurar o S3 para suportar requisições da aplicação Angular.

Se precisar de mais ajuda, experimente testar a aplicação em diferentes cenários ou consultar a documentação oficial do Angular e AWS S3.