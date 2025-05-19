import { Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';



@Component({
  selector: 'app-modal-login',
  imports: [AmplifyAuthenticatorModule],
  templateUrl: './modal-login.component.html',
  styleUrl: './modal-login.component.css'
})
export class ModalLoginComponent {

  constructor(private readonly modalService: NgbModal) { }


  open(content: TemplateRef<any>) {

    console.log('Abrindo modal de login');
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        console.log('fechou o modal de login com:');
      },

    );
  }

  logSignOut() {
    console.log('Usuário deslogado');
  }

}
