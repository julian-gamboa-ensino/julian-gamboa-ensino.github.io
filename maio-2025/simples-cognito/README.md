# Apostila: Criando um Componente Angular 19 com AWS Cognito

**Aula Didática - Atualizado para Angular 19 (2025)**

## Introdução

Esta apostila oferece um guia prático para criar um componente Angular 19 integrado ao AWS Cognito, utilizando o módulo `@aws-amplify/ui-angular` para autenticação de usuários. A atividade é projetada para ser simples e introdutória, embora a documentação oficial do Amplify possa parecer complexa para iniciantes. Focaremos em um componente de login standalone, com configurações do Amplify organizadas em um arquivo separado, usando a estrutura `Auth.Cognito` para o User Pool "june-12-2024".

**Objetivos**:
- Criar um componente standalone de login compatível com Angular 19.
- Configurar o AWS Amplify com logs para depuração.
- Simplificar o uso do Amplify para uma atividade prática inicial.

## Pré-requisitos

- **Node.js** (versão 20.x ou superior) e **Angular CLI 19** instalados.
- Conta AWS com um **User Pool** configurado no Cognito (nome: "june-12-2024").
- Conhecimento básico de Angular, TypeScript e autenticação.

## Configuração do Projeto

### Criando o Projeto Angular 19

1. Crie um novo projeto Angular:
   ```bash
   ng new simples-cognito --standalone
   ```
   - A flag `--standalone` cria um projeto baseado em componentes standalone, padrão no Angular 19.
2. Instale as dependências do AWS Amplify:
   ```bash
   npm install aws-amplify @aws-amplify/ui-angular@latest
   ```

### Configurando o AWS Amplify

1. Crie um arquivo `src/app/config/amplify-config.ts`:
   ```typescript
   import { Amplify } from 'aws-amplify';

   export const configureAmplify = () => {
     console.log('Iniciando configuração do Amplify...');
     Amplify.configure({
       Auth: {
         Cognito: {
           userPoolClientId: '6pp7bqtrir970u7rrn67nkktch',
           userPoolId: 'us-west-2_WPgUGyt78',
           userPoolEndpoint: 'https://cognito-idp.us-west-2.amazonaws.com/us-west-2_WPgUGyt78'
         }
       }
     });
     console.log('Amplify configurado:', Amplify.getConfig());
   };
   ```
   - **Nota**: A configuração usa a estrutura `Auth.Cognito`, com `userPoolClientId`, `userPoolId`, e `userPoolEndpoint` para o User Pool "june-12-2024". Os logs confirmam a inicialização no console do navegador.

2. Configure a inicialização no `src/main.ts`:
   ```typescript
   import { bootstrapApplication } from '@angular/platform-browser';
   import { appConfig } from './app/app.config';
   import { AppComponent } from './app/app.component';
   import { configureAmplify } from './app/config/amplify-config';

   configureAmplify();

   bootstrapApplication(AppComponent, appConfig)
     .catch((err) => console.error(err));
   ```
   - **Nota**: A chamada `configureAmplify()` antes do `bootstrapApplication` garante que o Amplify esteja inicializado globalmente.

### Configurando Rotas

1. Crie o arquivo `src/app/app.routes.ts`:
   ```typescript
   import { Routes } from '@angular/router';
   import { LoginComponent } from './components/login/login.component';

   export const routes: Routes = [
     { path: 'login', component: LoginComponent },
     { path: '', redirectTo: '/login', pathMatch: 'full' }
   ];
   ```

2. Configure o `src/app/app.config.ts`:
   ```typescript
   import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
   import { provideRouter } from '@angular/router';
   import { routes } from './app.routes';

   export const appConfig: ApplicationConfig = {
     providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
   };
   ```

### Estilizando com Angular 19

Adicione estilos globais em `src/styles.css`:
```css
amplify-authenticator {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
```

## Criando o Componente de Login

### Gerando o Componente

1. Crie um componente standalone:
   ```bash
   ng generate component components/login --standalone
   ```

2. Configure o componente em `src/app/components/login/login.component.ts`:
   ```typescript
   import { Component } from '@angular/core';
   import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
   import { CommonModule } from '@angular/common';

   @Component({
     selector: 'app-login',
     standalone: true,
     imports: [AmplifyAuthenticatorModule, CommonModule],
     templateUrl: './login.component.html',
     styleUrls: ['./login.component.css']
   })
   export class LoginComponent {
     constructor() {
       console.log('LoginComponent inicializado');
     }

     logSignOut() {
       console.log('Usuário deslogado');
     }
   }
   ```
   - **Nota**: O componente importa `AmplifyAuthenticatorModule` para o `<amplify-authenticator>` e `CommonModule` para o `<ng-template>`. Logs no construtor e no método `logSignOut` geram saídas no console.

3. Crie o template em `src/app/components/login/login.component.html`:
   ```html
   <amplify-authenticator>
     <ng-template amplifySlot="authenticated" let-user="user" let-signOut="signOut">
       <div class="welcome-container">
         <h1>Welcome, {{ user.username }}!</h1>
         <button class="sign-out-btn" (click)="signOut(); logSignOut()">Sign Out</button>
       </div>
     </ng-template>
   </amplify-authenticator>
   ```

4. Adicione estilos em `src/app/components/login/login.component.css`:
   ```css
   :host {
     display: flex;
     justify-content: center;
     align-items: center;
     min-height: 100vh;
     background-color: #f4f4f9;
   }

   .welcome-container {
     text-align: center;
     padding: 20px;
   }

   .sign-out-btn {
     padding: 10px 20px;
     background-color: #ff4d4f;
     color: white;
     border: none;
     border-radius: 4px;
     cursor: pointer;
     font-size: 16px;
   }

   .sign-out-btn:hover {
     background-color: #d9363e;
   }
   ```

### Configurando o Componente Raiz

1. Configure o `src/app/app.component.ts`:
   ```typescript
   import { Component } from '@angular/core';
   import { RouterOutlet } from '@angular/router';

   @Component({
     selector: 'app-root',
     standalone: true,
     imports: [RouterOutlet],
     templateUrl: './app.component.html',
     styleUrl: './app.component.css'
   })
   export class AppComponent {
     title = 'simples-cognito';
   }
   ```

2. Crie o template em `src/app/app.component.html`:
   ```html
   <router-out Piaget
   ```

   - **Nota**: O arquivo `app.component.html` no documento parece estar incompleto (`<router-out Piaget`). Assumi que deveria ser:
     ```html
     <router-outlet></router-outlet>
     ```

## Testando o Componente

1. Inicie o servidor:
   ```bash
   ng serve
   ```
2. Acesse `http://localhost:4200/login` e teste o login.
3. Verifique o console do navegador (F12 > Console) para as saídas:
   - `"Iniciando configuração do Amplify..."` e `"Amplify configurado: {...}"` ao carregar a aplicação.
   - `"LoginComponent inicializado"` ao renderizar o componente.
   - `"Usuário deslogado"` ao clicar no botão de logout.
4. Verifique se o User Pool "june-12-2024" está configurado corretamente no AWS Cognito Console.

### Dicas de Depuração

- **Documentação do Amplify**: A documentação oficial do Amplify (https://aws-amplify.github.io/) pode parecer complexa para iniciantes. Esta atividade prática simplifica o processo, focando em uma configuração básica e funcional.
- **Sem Saída no Console**: Verifique se `configureAmplify()` está sendo chamado em `main.ts` e se o componente está na rota `/login`.
- **Erro de Autenticação**: Confirme que `userPoolId` (`us-west-2_WPgUGyt78`) e `userPoolClientId` (`6pp7bqtrir970u7rrn67nkktch`) estão corretos no AWS Cognito Console.
- **CORS ou Rede**: Verifique o console do navegador para erros como `Network Error` ou `CORS`. Adicione `http://localhost:4200` aos domínios permitidos no Cognito.
- **Versão do Amplify**: Confirme a versão do `aws-amplify`:
  ```bash
  npm list aws-amplify
  ```
  - Use uma versão compatível com Amplify JS v6 (ex.: `^6.0.0`). Atualize com:
    ```bash
    npm install aws-amplify@latest
    ```

## Novidades do Angular 19 Aplicadas

- **Standalone Components**: Projeto sem módulos, usando componentes standalone.
- **Improved TypeScript**: Tipagem mais rigorosa e suporte aprimorado no IDE.
- **Simplified Routing**: Configuração de rotas via `provideRouter`.

## Conclusão

Criamos um componente Angular 19 integrado ao AWS Cognito, com configurações do User Pool "june-12-2024" estruturadas no objeto `Auth.Cognito` em `amplify-config.ts`. O componente `LoginComponent` é standalone, estilizado, e gera saídas no console para depuração. Apesar da complexidade da documentação do Amplify, esta atividade prática simplifica o aprendizado inicial. Para aprofundar:

- Personalize o formulário Amplify (ex.: campos customizados).
- Explore MFA e recuperação de senha no Cognito.
- Integre com outros serviços AWS (API Gateway, DynamoDB).

**Repositório GitHub**: Adicione esta apostila e o código ao repositório, usando branches como `configuracao`, `componente` e `final` para organizar as etapas.

**Referências**:
- [Amplify JS API Documentation](https://aws-amplify.github.io/)
- [AWS Amplify Gen 2 Documentation](https://docs.amplify.aws/)