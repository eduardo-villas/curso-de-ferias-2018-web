import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaComponent } from './consulta/consulta.component';
import { FormularioComponent } from './formulario/formulario.component';

import { DisciplinaRouting } from './disciplina.routing';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatTableModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatIconModule, MatTooltipModule, MatOptionModule, MatNativeDateModule, MatDatepickerModule, MAT_DATE_LOCALE, MatListModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DisciplinaService } from './disciplina.service';
import { ProfessorService } from './professor.service';
import { FlexLayoutModule } from '@angular/flex-layout';

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
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    FormBuilder,
    DisciplinaService,
    ProfessorService,
    HttpClient,
    {provide: MAT_DATE_LOCALE, useValue: 'pt-br'}
  ],
  declarations: [ConsultaComponent, FormularioComponent]
})
export class DisciplinaModule { }