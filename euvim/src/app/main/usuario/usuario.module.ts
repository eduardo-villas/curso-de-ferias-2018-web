import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaComponent } from './consulta/consulta.component';
import { FormularioComponent } from './formulario/formulario.component';

import { UsuarioRouting } from './usuario.routing';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatTableModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatIconModule, MatTooltipModule, MatOptionModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { RequestErrorModule } from '../../request-error/request-error.module';

@NgModule({
  imports: [
    CommonModule,
    UsuarioRouting,
    RouterModule,
    FlexLayoutModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatSelectModule, 
    MatOptionModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RequestErrorModule
  ],
  providers: [
    FormBuilder,
    UsuarioService,
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  declarations: [ConsultaComponent, FormularioComponent]
})
export class UsuarioModule { }