import { Component } from '@angular/core';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AmplifyAuthenticatorModule], // ✅ Aqui está o que faltava
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // ✅ styleUrls no plural
})
export class LoginComponent {}

