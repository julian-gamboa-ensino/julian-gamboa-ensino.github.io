import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';


import { configureAmplify } from './app/config/amplify-config';

configureAmplify(); // ✅ chamada ANTES do bootstrap

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
