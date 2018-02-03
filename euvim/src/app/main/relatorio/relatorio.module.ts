import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresencaComponent } from './presenca/presenca.component';
import { RouterModule } from '@angular/router';
import { RelatorioRouting } from './relatorio.routing';
import { RelatorioService } from './relatorio.service';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DisciplinaService } from '../services/disciplina.service';
import { MAT_DATE_LOCALE, MatExpansionModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatTooltipModule, MatSelectModule, MatOptionModule, MatDatepickerModule, MatNativeDateModule, MatListModule, MatDialogModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ItemPresencaComponent } from './presenca/item-presenca/item-presenca.component';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { RequestErrorModule } from '../../request-error/request-error.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RelatorioRouting,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatTooltipModule,
    MatSelectModule, 
    MatOptionModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatDialogModule,
    MatExpansionModule,
    HttpClientModule,
    RequestErrorModule
  ],
  providers: [
    HttpClient, 
    FormBuilder, 
    DisciplinaService, 
    RelatorioService , 
    {provide: MAT_DATE_LOCALE, useValue: 'pt-br'},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  declarations: [PresencaComponent, ItemPresencaComponent]
})
export class RelatorioModule { }