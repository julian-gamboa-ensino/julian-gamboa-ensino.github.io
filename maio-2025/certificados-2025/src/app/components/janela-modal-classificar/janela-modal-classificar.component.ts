
import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectClassificadorComponent } from '../select-classificador/select-classificador.component';

@Component({
  selector: 'app-janela-modal-classificar',
  standalone: true,
  imports: [SelectClassificadorComponent],
  template: `
    <ng-template #content let-modal>
      <div class="modal-header">
        <h4 class="modal-title">Tecnologia</h4>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <app-select-classificador></app-select-classificador>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-dark" (click)="modal.close('ETIQUETA: ' + etiqueta_imagem)">
          Tecnologia ({{etiqueta_imagem}})
        </button>
      </div>
    </ng-template>
    <button class="btn btn-lg btn-outline-primary" (click)="open(content)">
      {{etiqueta_imagem}}
    </button>
  `,
  styles: []
})
export class JanelaModalClassificarComponent {
  @Input() nome_imagem: string = '';
  @Input() etiqueta_imagem: string = '';

  constructor(private readonly modalService: NgbModal) {}

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => console.log(`Modal fechado com: ${result}`),
      (reason) => console.log(`Modal dispensado: ${reason}`)
    );
  }
}
