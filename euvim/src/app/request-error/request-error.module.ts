import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestErrorComponent } from './request-error.component';
import { MatDialogModule } from '@angular/material';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestErrorInterceptor } from './request-error.interceptor';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule
  ],
  declarations: [
    RequestErrorComponent
  ],
  entryComponents: [
    RequestErrorComponent
  ],
  exports: [
    RequestErrorComponent, 
    MatDialogModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestErrorInterceptor,
      multi: true
    }
  ]
})
export class RequestErrorModule { }