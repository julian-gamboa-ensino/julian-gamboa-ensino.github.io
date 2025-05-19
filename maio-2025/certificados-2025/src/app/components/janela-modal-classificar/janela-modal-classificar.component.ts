import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TemplateRef } from '@angular/core';

@Component({
  selector: 'app-janela-modal-classificar',
  standalone: true,
  imports: [],
  templateUrl: './janela-modal-classificar.component.html',
  styleUrls: ['./janela-modal-classificar.component.css'],
})
export class JanelaModalClassificarComponent implements OnInit {
  @Input() nome_imagem: string = '';
  @Input() etiqueta_imagem: string = '';
  imagemFixa: string = '';
  @Output() modalOpened = new EventEmitter<void>();
  @Output() modalClosed = new EventEmitter<string>();

  constructor(private readonly modalService: NgbModal) {}

  ngOnInit() {
    console.log('Inicializando componente. Nome da imagem:', this.nome_imagem);
    console.log('Etiqueta da imagem:', this.etiqueta_imagem);
  }

  open(content: TemplateRef<any>) {
    this.imagemFixa = this.nome_imagem;
    console.log('Abrindo modal com imagem fixa:', this.imagemFixa, 'e etiqueta:', this.etiqueta_imagem);
    this.modalOpened.emit(); // Notifica que o modal foi aberto
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        console.log(`Modal fechado com: ${result}`);
        this.modalClosed.emit(result); // Notifica que o modal foi fechado
      },

    );
  }
}