import 'zone.js'; // <--- ESTO ES LO QUE TE FALTA
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app'; // Tu componente principal

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));