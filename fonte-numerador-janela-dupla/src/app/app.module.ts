import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NovosComponent } from './components/novos/novos.component';

import { HttpClientModule } from '@angular/common/http';
import { ListaPastasComponent } from './components/lista-pastas/lista-pastas.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JanelaModalClassificarComponent } from './components/janela-modal-classificar/janela-modal-classificar.component';
import { SelectClassificadorComponent } from './components/select-classificador/select-classificador.component';
import { ComparadorLogoTechCertificadoComponent } from './components/comparador-logo-tech-certificado/comparador-logo-tech-certificado.component';
import { ComparadorImagensComponent } from './components/comparador-imagens/comparador-imagens.component';

@NgModule({
  declarations: [
    AppComponent,
    NovosComponent,
    ListaPastasComponent,
    JanelaModalClassificarComponent,
    SelectClassificadorComponent,
    ComparadorLogoTechCertificadoComponent,
    ComparadorImagensComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
