import { Component, Output, EventEmitter, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { fetchAuthSession, signOut } from '@aws-amplify/auth';


@Component({
  selector: 'app-modal-login',
  imports: [AmplifyAuthenticatorModule],
  templateUrl: './modal-login.component.html',
  styleUrl: './modal-login.component.css'
})
export class ModalLoginComponent {

  @Output() authStateChange = new EventEmitter<boolean>(); // Emite o estado de autenticação
  user: any = null; // Armazena informações do usuário

  constructor(private readonly modalService: NgbModal) { }

  async ngOnInit() {
    try {
      const session = await fetchAuthSession();
      if (session.tokens) {
        this.user = { username: session.tokens.accessToken.payload['username'] || 'Usuário' };
        this.authStateChange.emit(true); // Usuário está logado
        console.log('Usuário logado:', this.user);
      } else {
        this.user = null;
        this.authStateChange.emit(false); // Usuário não está logado
        console.log('Nenhum usuário logado');
      }
    } catch (err) {
      this.user = null;
      this.authStateChange.emit(false); // Usuário não está logado
      console.log('Erro ao verificar sessão:', err);
    }
  }


  open(content: TemplateRef<any>) {

    console.log('Abrindo modal de login');



    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        console.log('fechou o modal de login com:');
      },

    );
  }


  async logSignOut() {
    try {
      await signOut();
      this.user = null;
      this.authStateChange.emit(false); // Emite que o usuário deslogou
      console.log('Usuário deslogado');
    } catch (err) {
      console.error('Erro ao deslogar:', err);
    }
  }

}
