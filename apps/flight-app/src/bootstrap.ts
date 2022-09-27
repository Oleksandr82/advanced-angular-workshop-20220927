import { bootstrap } from '@angular-architects/module-federation-tools';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// This new boostrap method makes sure we can bootstrap several separately compiled applications in the same browser tab.
bootstrap(AppModule, {
  production: environment.production,
  appType: 'shell'
});





