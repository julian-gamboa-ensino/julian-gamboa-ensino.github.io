# Apostila: Aprimoramento do ModalLoginComponent em Angular com AWS Amplify

## Atualização Automática do Botão de Login para Sign Out

**Autor**: Julian Gamboa  
**Data**: 19 de Maio de 2025  
**Projeto**: Certificados 2025

---

## Sumário

- [Introdução](#introdução)
- [Descrição do Problema](#descrição-do-problema)
- [Solução Implementada](#solução-implementada)
- [Código Relevante](#código-relevante)
  - [modal-login.component.ts](#modal-logincomponentts)
  - [modal-login.component.html](#modal-logincomponenthtml)
- [Testes e Verificação](#testes-e-verificação)
- [Conclusão](#conclusão)

---

## Introdução

Este documento descreve o aprimoramento implementado no componente `ModalLoginComponent` do projeto *Certificados 2025*, uma aplicação Angular que gerencia certificados educacionais usando AWS Amplify para autenticação. O objetivo foi corrigir um problema em que o botão de login não mudava automaticamente para "Sign Out" após o usuário fazer login via `<amplify-authenticator>`.

O `ModalLoginComponent` gerencia a autenticação do usuário, exibindo um modal com o componente `<amplify-authenticator>` para login e uma interface para usuários autenticados. Ele emite eventos `authStateChange` para notificar o `NovosComponent` sobre mudanças no estado de autenticação, atualizando elementos como um badge ("Logado"/"Desconhecido") e a renderização do `SelectClassificadorComponent`.

## Descrição do Problema

O problema era que, após o usuário clicar no botão "Login", fazer login via `<amplify-authenticator>`, e fechar o modal, o botão não mudava de "Login" para "Sign Out". Isso ocorria porque o estado `user` do componente (que determina o texto do botão via `@if (user) { Sign Out } @else { Login }`) não era atualizado automaticamente após o login.

No código original:
- O botão externo usava `(click)="user ? logSignOut() : open(modalContent)"` para alternar entre abrir o modal (não logado) e fazer logout (logado).
- O slot `authenticated` do `<amplify-authenticator>` chamava `updateUser(user)` para sincronizar o estado `user`, mas isso dependia do slot ser renderizado.
- O método `open` não verificava o estado de autenticação após o fechamento do modal, então `user` não era atualizado se o modal fosse fechado antes do slot `authenticated` aparecer.

## Solução Implementada

A solução garantiu que o estado `user` fosse atualizado após o fechamento do modal, verificando a sessão de autenticação com `fetchAuthSession`. As alterações foram:

1. **Encapsulamento da Verificação de Autenticação**: A lógica de verificação foi movida para um método `checkAuthState()`, reutilizado no `ngOnInit` e após o fechamento do modal.
2. **Atualização Após Fechamento do Modal**: O método `open` foi modificado para chamar `checkAuthState()` nos callbacks `result` e `reason`, garantindo que o estado `user` seja atualizado após o login.
3. **Manutenção do Template**: O `modal-login.component.html` foi mantido, já que o botão externo e o slot `authenticated` estavam corretos. O método `updateUser` foi preservado para redundância.

A solução mantém a simplicidade, evitando dependências como `Hub` do AWS Amplify, e garante que o botão mude para "Sign Out" automaticamente após o login.

## Código Relevante

### modal-login.component.ts

Este arquivo contém a lógica do componente, incluindo a verificação de autenticação e a emissão de eventos `authStateChange`.

```typescript
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
    await this.checkAuthState();
  }

  async checkAuthState() {
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

  updateUser(authUser: any) {
    this.user = { username: authUser.username || 'Usuário' };
    this.authStateChange.emit(true); // Emite que o usuário está logado
    console.log('Usuário atualizado:', this.user);
  }

  open(content: TemplateRef<any>) {
    console.log('Abrindo modal de login');
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        console.log('Fechou o modal de login com:', result);
        this.checkAuthState(); // Verifica o estado após fechar o modal
      },
      (reason) => {
        console.log('Modal fechado por:', reason);
        this.checkAuthState(); // Verifica o estado após fechar o modal
      }
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
```

**Notas**:
- O método `checkAuthState()` verifica a sessão com `fetchAuthSession` e atualiza `user`, emitindo `authStateChange`.
- A chamada a `checkAuthState()` nos callbacks do `open` garante que o estado seja verificado após o login.
- O método `updateUser` sincroniza `user` com o objeto fornecido pelo `<amplify-authenticator>`.

### modal-login.component.html

Este arquivo define o template do componente, incluindo o botão condicional e o modal de autenticação.

```html
<ng-template #modalContent let-modal>
  <div class="modal-header">
    <h5 class="modal-title" id="modal-basic-title">Login</h5>
    <button type="button" class="btn-close" aria-label="Close" (click)="modal.dismiss('Cross click')"></button>
  </div>
  <div class="modal-body">
    <div class="text-center mb-3">
      <amplify-authenticator>
        <ng-template amplifySlot="authenticated" let-user="user" let-signOut="signOut">
          <div class="welcome-container">
            <h1>Welcome, {{ user.username }}!</h1>
            <button class="sign-out-btn" (click)="updateUser(user); signOut(); logSignOut(); modal.close('Sign out')">Sign Out</button>
          </div>
        </ng-template>
      </amplify-authenticator>
    </div>
  </div>
</ng-template>

<button class="btn btn-primary" (click)="user ? logSignOut() : open(modalContent)">
  @if (user) {
    Sign Out
  } @else {
    Login
  }
</button>
```

**Notas**:
- O botão externo usa `@if (user)` para alternar entre "Sign Out" e "Login".
- O `(click)` chama `logSignOut()` quando logado e `open(modalContent)` quando não logado.
- O slot `authenticated` atualiza o estado `user` e faz logout quando o botão interno é clicado.

## Testes e Verificação

Para verificar a funcionalidade, siga os passos abaixo:

1. **Executar a Aplicação**:
   - Execute `ng serve` e abra `http://localhost:4200` no navegador.

2. **Verificar Logs no Console**:
   - Ao carregar: Veja "Usuário logado: {...}" ou "Nenhum usuário logado".
   - Clique no botão "Login": Veja "Abrindo modal de login".
   - Faça login via `<amplify-authenticator>`: O slot `authenticated` deve mostrar "Welcome, [username]!".
   - Feche o modal (clicando no "X" ou no botão "Sign Out" interno): Veja "Fechou o modal de login com: ..." ou "Modal fechado por: ...", seguido de "Usuário logado: {...}" e "Estado de autenticação atualizado: true" no `NovosComponent`.

3. **Verificar o Botão Externo**:
   - Antes do login: Mostra "Login" e abre o modal.
   - Após login e fechar o modal: Muda para "Sign Out" e chama `logSignOut()`.
   - Após logout: Volta para "Login".

4. **Verificar o NovosComponent**:
   - Não logado: Badge mostra "Desconhecido" (vermelho), e `SelectClassificadorComponent` não aparece.
   - Após login: Badge muda para "Logado" (verde), e `SelectClassificadorComponent` aparece.
   - Após logout: Badge volta para "Desconhecido".

Se o botão não mudar para "Sign Out", verifique os logs do console e atualize o pacote `@aws-amplify/ui-angular` com:

```bash
npm install @aws-amplify/ui-angular@latest
```

## Conclusão

O aprimoramento garantiu que o botão do `ModalLoginComponent` mude automaticamente de "Login" para "Sign Out" após o login, atualizando o estado `user` ao fechar o modal. A solução é simples, reutilizando a lógica de autenticação em `checkAuthState()` e mantendo o código original com alterações mínimas. O evento `authStateChange` propaga o estado para o `NovosComponent`, sincronizando o badge e o `SelectClassificadorComponent`.

**Possíveis Melhorias Futuras**:
- Adicionar `Hub.listen` do AWS Amplify para capturar eventos de autenticação assíncronos de forma mais robusta.
- Implementar testes unitários para validar o comportamento do botão e do modal.
- Personalizar o estilo do botão com CSS para maior consistência visual.

Consulte o repositório em [github.com/juliangamboa/github-ensino-certificados](https://github.com/juliangamboa/github-ensino-certificados).