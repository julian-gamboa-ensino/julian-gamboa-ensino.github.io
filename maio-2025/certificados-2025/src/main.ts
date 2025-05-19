import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter} from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { configureAmplify } from './app/config/amplify-config';

configureAmplify();

bootstrapApplication(AppComponent, {
  providers: [
    //provideRouter(routes, withHashLocation()),
    provideRouter(routes),
    provideHttpClient(),
    
  ]
}).catch(err => console.error(err));