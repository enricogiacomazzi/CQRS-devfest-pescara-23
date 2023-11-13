import { ApplicationConfig } from '@angular/core';
import {HttpClientModule, provideHttpClient} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [HttpClientModule, provideHttpClient()],
};
