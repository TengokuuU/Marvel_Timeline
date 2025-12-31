import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http'; // <-- TO JEST KLUCZ

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient() // <-- DODAJ TO TUTAJ
  ]
};