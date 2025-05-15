/*
Entrega a lista de fotos presentes na pasta local (ou bucket da S3)
*/

import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

/*
Serviço SIMPLES para consultar uma API que lista-se as fotos contidas num bucker
*/

export class GetFotosBucketService {

  url = 
  //"https://docker-2-julian.herokuapp.com/";
  "https://cv-julian-2022.s3.us-west-2.amazonaws.com/conteudo_pasta/";
  

// injetando o HttpClient
    constructor(private httpClient: HttpClient) { }

    // Headers
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  
    // Obtém a lista de fotos conforme a ETIQUETA usada na consulta
    
    getUrl_imagem(etiqueta: String): Observable<String[]> {
      return this.httpClient.get<String[]>(this.url+etiqueta+".json")
        .pipe(
          retry(2),
          catchError(this.handleError))
    }
  
 
    // Manipulação de erros
    handleError(error: HttpErrorResponse) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Erro ocorreu no lado do client
        errorMessage = error.error.message;
      } else {
        // Erro ocorreu no lado do servidor
        errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
    };
}
