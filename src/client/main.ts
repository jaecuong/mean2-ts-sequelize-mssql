import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
// import { AppConfig } from './app/app.config';

if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic().bootstrapModule(AppModule, [AppConfig])
platformBrowserDynamic().bootstrapModule(AppModule)
  .then((success: any) => { console.log(`App Bootstrapped OK !!!`) })
  .catch((err: Error) => { console.error(err) });
