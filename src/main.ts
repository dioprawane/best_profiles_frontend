// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';  // Import provideHttpClient
import { importProvidersFrom } from '@angular/core';  // Import importProvidersFrom
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  // Import BrowserAnimationsModule
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes'; 
import { provideRouter } from '@angular/router';
import { CommonModule } from '@angular/common';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideHttpClient(),  // Provide HttpClient
    importProvidersFrom(BrowserAnimationsModule),  // Import BrowserAnimationsModule
    provideRouter(routes),
    importProvidersFrom(CommonModule)
  ]
})
  .catch((err) => console.error(err));
