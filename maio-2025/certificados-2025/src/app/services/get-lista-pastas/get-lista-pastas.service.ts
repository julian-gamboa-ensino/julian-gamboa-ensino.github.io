
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of, retry, shareReplay, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Pasta {
  nome: string;
}

@Injectable({
  providedIn: 'root'
})
export class GetListaPastasService {
  private readonly http = inject(HttpClient);
  private readonly url = environment.useMock
    ? '/assets/mock/pastas.json' // Adicionada barra inicial para consistência com o servidor
    : `${environment.apiPastas}`;
  private cache$: Observable<string[]> | null = null;
  private readonly fallbackPastas: string[] = ['error', '2025'];

  getUrlImagem(etiqueta: string = ''): Observable<string[]> {
    if (this.cache$) {
      return this.cache$;
    }

    const requestUrl = etiqueta ? `${this.url}/${etiqueta}` : this.url;
    console.log('Tentando carregar pastas de:', requestUrl); // Depuração
    this.cache$ = this.http.get<string[]>(requestUrl).pipe(
      retry({ count: 1, delay: 10000 }),
      catchError((error) => {
        console.warn('Falha ao carregar pastas, usando fallback:', error.message);
        return of(this.fallbackPastas);
      }),
      shareReplay(1)
    );

    return this.cache$;
  }

  clearCache() {
    this.cache$ = null;
  }

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