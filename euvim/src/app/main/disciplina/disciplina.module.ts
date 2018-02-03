import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaComponent } from './consulta/consulta.component';
import { FormularioComponent } from './formulario/formulario.component';

import { DisciplinaRouting } from './disciplina.routing';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatTableModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatIconModule, MatTooltipModule, MatOptionModule, MatNativeDateModule, MatDatepickerModule, MAT_DATE_LOCALE, MatListModule, MatDialogModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DisciplinaService } from '../services/disciplina.service';
import { ProfessorService } from './professor.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProfessorComponent } from './professor/professor.component';
import { QrcodeComponent } from './qrcode/qrcode.component';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { RequestErrorModule } from '../../request-error/request-error.module';

@NgModule({
  imports: [
    CommonModule,
    DisciplinaRouting,
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RequestErrorModule
  ],
  providers: [
    FormBuilder,
    DisciplinaService,
    ProfessorService,
    HttpClient,
    {provide: MAT_DATE_LOCALE, useValue: 'pt-br'},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  entryComponents: [ProfessorComponent, QrcodeComponent],
  declarations: [ConsultaComponent, FormularioComponent, ProfessorComponent, QrcodeComponent]
})
export class DisciplinaModule { }