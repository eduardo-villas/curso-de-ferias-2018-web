
## **Curso de Férias 2018 - Desenvolvimento Frontend com Angular - Aula 08**

Sumário
=======

* [Conceitos](#conceitos)
  * [Injeção de Dependências](#injeção-de-dependencias)
* [Hands-on](#hands-on)
  * [Adicionando Popup de Professores](#adicionando-popup-de-professores)
  * [Adicionando QRCode](#adicionando-qrcode)
  
Conceitos
=========

[Componentes Angular Material](https://material.angular.io/components)

Vamos criar um Painel Expansivo para os filtros, e sua listagem também será comporta com o painel:
http://storage1.static.itmages.com/i/18/0108/h_1515441375_3008489_e99c436cdd.png

e nossa listagem quando filtrarmos ficará desta forma com painel expansivo:
http://storage4.static.itmages.com/i/18/0108/h_1515441415_6753914_d4eceb5926.png

Injeção de Dependências
--------

https://angular-2-training-book.rangle.io/handout/di/angular2/inject_and_injectable.html

https://developers.google.com/chart/infographics/docs/qr_codes
Um exemplo:
https://chart.googleapis.com/chart?cht=qr&choe=UTF-8&chs=207x207&chl=mensagem

Hands-on
========

Adicionando Popup de Professores
--------------------------------

##### No diretorio src/app/main/disciplina
``` typescript
ng g component professor
```

##### No arquivo src/app/main/disciplina/professor.service.ts
``` typescript
professor(id){
  let httpParams = new HttpParams().set("tipo","PROFESSOR")
  return this._httpClient.get<any>(this._urlProfessores+"/"+id, {params:httpParams});
}
```

``` typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class ProfessorService {

  constructor(private _httpClient: HttpClient ) { }
  
  private _urlProfessores = environment.url+"/api/v1/usuarios";

  listar(){
    let httpParams = new HttpParams().set("tipo","PROFESSOR")
    return this._httpClient.get<Array<Object>>(this._urlProfessores, {params:httpParams});
  }

  professor(id){
    let httpParams = new HttpParams().set("tipo","PROFESSOR")
    return this._httpClient.get<any>(this._urlProfessores+"/"+id, {params:httpParams});
  }

}
```

##### No arquivo src/app/main/disciplina/disciplina.module.ts
``` typescript
import { MatDialogModule } from '@angular/material';

entryComponents: [ProfessorComponent]
```

``` typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaComponent } from './consulta/consulta.component';
import { FormularioComponent } from './formulario/formulario.component';

import { DisciplinaRouting } from './disciplina.routing';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatTableModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatIconModule, MatTooltipModule, MatOptionModule, MatNativeDateModule, MatDatepickerModule, MAT_DATE_LOCALE, MatListModule, MatDialogModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DisciplinaService } from './disciplina.service';
import { ProfessorService } from './professor.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProfessorComponent } from './professor/professor.component';

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
    HttpClientModule
  ],
  providers: [
    FormBuilder,
    DisciplinaService,
    ProfessorService,
    HttpClient,
    {provide: MAT_DATE_LOCALE, useValue: 'pt-br'}
  ],
  entryComponents: [ProfessorComponent],
  declarations: [ConsultaComponent, FormularioComponent, ProfessorComponent]
})
export class DisciplinaModule { }
```

##### No arquivo src/app/main/disciplina/professor/professor.component.ts
``` typescript
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProfessorService } from '../professor.service';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.scss']
})
export class ProfessorComponent implements OnInit {

  public professores = [];
  
  constructor(
    public dialogRef: MatDialogRef<ProfessorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _professorService: ProfessorService) { 
      
  }

  ngOnInit() {
    this.data.professores.forEach(id => {
      this._professorService.professor(id).subscribe((suc)=>{
        this.professores.push(suc);
      })
    });
  }

}
```

##### No arquivo src/app/main/disciplina/professor/professor.component.html
``` typescript
<h3 mat-dialog-title>Professores</h3>
<mat-list *ngFor="let professor of professores">
  <mat-list-item>
    {{professor.nome}} - {{professor.email}}
  </mat-list-item>
</mat-list>
```

##### No arquivo src/app/main/disciplina/consulta/consulta.component.ts
``` typescript
import { ProfessorComponent } from '../professor/professor.component';

exibirProfessores(professores){
  let dialogRef = this.dialog.open(ProfessorComponent, {
    width: '250px',
    data: { professores: professores }
  });
}
```

``` typescript
import { Component, OnInit } from '@angular/core';

import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { DisciplinaService } from '../disciplina.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ProfessorComponent } from '../professor/professor.component';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit {

  public displayedColumns = ['id', 'segmento', 'descricao', 'dataInicio', 'dataTermino', 'professores'];
  public dataSource: MatTableDataSource<any>;

  public noResults$ = false;
  constructor(private _disciplinaService: DisciplinaService, private _router: Router, public dialog: MatDialog) { }
  
  ngOnInit() {
    this.atualizarListaDeDisciplinas();
  }
 
  excluir(id){
    this._disciplinaService.excluir(id).subscribe(suc=>{
      this.atualizarListaDeDisciplinas();
  });
  }

  editar(id){
    this._router.navigate(["/main/disciplina/editar", id]);
  }

  private atualizarListaDeDisciplinas(){
    this._disciplinaService.listar().subscribe(suc => {
      this.noResults$ = suc.length == 0;
      this.dataSource = new MatTableDataSource(suc);
    });
  }

  exibirProfessores(professores){
    let dialogRef = this.dialog.open(ProfessorComponent, {
      width: '250px',
      data: { professores: professores }
    });
  }

}
```

##### No arquivo src/app/main/disciplina/consulta/consulta.component.ts
``` typescript
<mat-cell *matCellDef="let element"> 
  <button mat-icon-button (click)="exibirProfessores(element.professores)" matTooltip="Visualizar">
      {{element.professores.length}} 
  </button>        
</mat-cell>
```

``` typescript
<div class="mat-elevation-z8">
  <mat-table #table [dataSource]="dataSource">
    <ng-container matColumnDef="id">
      <mat-header-cell *matHeaderCellDef  fxFlex="10"> Ações </mat-header-cell>
      <mat-cell *matCellDef="let element" fxFlex="10" class="buttons">
          <button mat-icon-button color="primary"  matTooltip="Editar">
            <mat-icon class="md-24"  (click)="editar(element.id)" aria-label="Editar">edit</mat-icon>
          </button>
          <button mat-icon-button color="danger" matTooltip="Remover">
              <mat-icon class="md-24" (click)="remover(element.id)" aria-label="Remover">delete</mat-icon>
          </button>
      </mat-cell>
    </ng-container>
    <ng-container matColumnDef="segmento">
      <mat-header-cell *matHeaderCellDef> Segmento </mat-header-cell>
      <mat-cell *matCellDef="let element"> {{element.segmento | titlecase}} </mat-cell>
    </ng-container>
    <ng-container matColumnDef="descricao">
        <mat-header-cell *matHeaderCellDef> Descrição </mat-header-cell>
        <mat-cell *matCellDef="let element"> {{element.descricao}} </mat-cell>
    </ng-container>
    <ng-container matColumnDef="dataInicio">
      <mat-header-cell *matHeaderCellDef> Início </mat-header-cell>
      <mat-cell *matCellDef="let element"> {{element.dataInicio | date:'dd/MM/yyyy'}} </mat-cell>
    </ng-container>
    <ng-container matColumnDef="dataTermino">
      <mat-header-cell *matHeaderCellDef> Término </mat-header-cell>
      <mat-cell *matCellDef="let element"> {{element.dataTermino  | date:'dd/MM/yyyy'}} </mat-cell>
    </ng-container>
    <ng-container matColumnDef="professores">
      <mat-header-cell *matHeaderCellDef> Professores </mat-header-cell>
      <mat-cell *matCellDef="let element"> 
        <button mat-icon-button (click)="exibirProfessores(element.professores)" matTooltip="Visualizar">
            {{element.professores.length}} 
        </button>        
      </mat-cell>
    </ng-container>
    <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
    <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
  </mat-table>
  <div *ngIf="noResults$" class="noResult">Nenhum resultado</div>
  <button mat-fab color="primary">
    <mat-icon class="mat-24" routerLink="/main/disciplina/adicionar" aria-label="Adicionar">add</mat-icon>
  </button> 
</div>
```

Adicionando QRCode
------------------

##### No diretório src/app/main/disciplina
``` typescript
ng g component qrcode
```

##### No arquivo src/app/main/disciplina/disciplina.module.ts
``` typescript
import { QrcodeComponent } from './qrcode/qrcode.component';
```

``` typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaComponent } from './consulta/consulta.component';
import { FormularioComponent } from './formulario/formulario.component';

import { DisciplinaRouting } from './disciplina.routing';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatTableModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatIconModule, MatTooltipModule, MatOptionModule, MatNativeDateModule, MatDatepickerModule, MAT_DATE_LOCALE, MatListModule, MatDialogModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DisciplinaService } from './disciplina.service';
import { ProfessorService } from './professor.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProfessorComponent } from './professor/professor.component';
import { QrcodeComponent } from './qrcode/qrcode.component';

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
    HttpClientModule
  ],
  providers: [
    FormBuilder,
    DisciplinaService,
    ProfessorService,
    HttpClient,
    {provide: MAT_DATE_LOCALE, useValue: 'pt-br'}
  ],
  entryComponents: [ProfessorComponent, QrcodeComponent],
  declarations: [ConsultaComponent, FormularioComponent, ProfessorComponent, QrcodeComponent]
})
export class DisciplinaModule { }
```

##### No arquivo src/app/main/disciplina/qrcode/qrcode.component.ts
``` typescript
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})
export class QrcodeComponent implements OnInit {

  public urlQrCode = null;

  constructor(
    public dialogRef: MatDialogRef<QrcodeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    }

  ngOnInit() {
    this.urlQrCode = "https://chart.googleapis.com/chart?cht=qr&choe=UTF-8&chs=207x207&chl="+btoa(JSON.stringify(this.data));
  }

}
```

##### No arquivo src/app/main/disciplina/qrcode/qrcode.component.html
``` typescript
<h1 mat-dialog-title>Presença {{ data.data | date:'dd/MM/yyyy' }} no Curso {{ data.descricao }}</h1>
<p align="center">
  <img [src]="urlQrCode" >
</p>
```

##### No arquivo src/app/main/disciplina/consulta/consulta/consulta.component.ts
``` typescript
import { QrcodeComponent } from '../qrcode/qrcode.component';

exibirQrCode(disciplina){
  let dialogRef = this.dialog.open(QrcodeComponent, {
    width: '250px',
    data: { 
      id: disciplina.id, 
      descricao: disciplina.descricao, 
      data: new Date() 
    }
  });
}
```

``` typescript
import { Component, OnInit } from '@angular/core';

import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { DisciplinaService } from '../disciplina.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ProfessorComponent } from '../professor/professor.component';
import { QrcodeComponent } from '../qrcode/qrcode.component';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit {

  public displayedColumns = ['segmento', 'descricao', 'dataInicio', 'dataTermino', 'professores', 'id'];
  public dataSource: MatTableDataSource<any>;

  public noResults$ = false;
  constructor(private _disciplinaService: DisciplinaService, private _router: Router, public dialog: MatDialog) { }
  
  ngOnInit() {
    this.atualizarListaDeDisciplinas();
  }
 
  excluir(id){
    this._disciplinaService.excluir(id).subscribe(suc=>{
      this.atualizarListaDeDisciplinas();
  });
  }

  editar(id){
    this._router.navigate(["/main/disciplina/editar", id]);
  }

  private atualizarListaDeDisciplinas(){
    this._disciplinaService.listar().subscribe(suc => {
      this.noResults$ = suc.length == 0;
      this.dataSource = new MatTableDataSource(suc);
    });
  }

  exibirProfessores(professores){
    let dialogRef = this.dialog.open(ProfessorComponent, {
      width: '250px',
      data: { professores: professores }
    });
  }

  exibirQrCode(disciplina){
    let dialogRef = this.dialog.open(QrcodeComponent, {
      width: '250px',
      data: { 
        id: disciplina.id, 
        descricao: disciplina.descricao 
      }
    });
  }

}
```

##### No arquivo src/app/main/disciplina/consulta/consulta.component.ts
``` typescript
<button mat-icon-button matTooltip="QrCode">
    <mat-icon class="md-24" (click)="exibirQrCode(disciplina)" aria-label="QrCode">screen_lock_portrait</mat-icon>
</button>
```

``` typescript
<div class="mat-elevation-z8">
  <mat-table #table [dataSource]="dataSource">
    <ng-container matColumnDef="id">
      <mat-header-cell *matHeaderCellDef  fxFlex="10"> Ações </mat-header-cell>
      <mat-cell *matCellDef="let disciplina" fxFlex="10" class="buttons">
          <button mat-icon-button matTooltip="QrCode">
              <mat-icon class="md-24" (click)="exibirQrCode(disciplina)" aria-label="QrCode">screen_lock_portrait</mat-icon>
          </button>
          <button mat-icon-button color="primary"  matTooltip="Editar">
            <mat-icon class="md-24"  (click)="editar(disciplina.id)" aria-label="Editar">edit</mat-icon>
          </button>
          <button mat-icon-button color="danger" matTooltip="Remover">
              <mat-icon class="md-24" (click)="remover(disciplina.id)" aria-label="Remover">delete</mat-icon>
          </button>
      </mat-cell>
    </ng-container>
    <ng-container matColumnDef="segmento">
      <mat-header-cell *matHeaderCellDef> Segmento </mat-header-cell>
      <mat-cell *matCellDef="let disciplina"> {{disciplina.segmento | titlecase}} </mat-cell>
    </ng-container>
    <ng-container matColumnDef="descricao">
        <mat-header-cell *matHeaderCellDef> Descrição </mat-header-cell>
        <mat-cell *matCellDef="let disciplina"> {{disciplina.descricao}} </mat-cell>
    </ng-container>
    <ng-container matColumnDef="dataInicio">
      <mat-header-cell *matHeaderCellDef> Início </mat-header-cell>
      <mat-cell *matCellDef="let disciplina"> {{disciplina.dataInicio | date:'dd/MM/yyyy'}} </mat-cell>
    </ng-container>
    <ng-container matColumnDef="dataTermino">
      <mat-header-cell *matHeaderCellDef> Término </mat-header-cell>
      <mat-cell *matCellDef="let disciplina"> {{disciplina.dataTermino  | date:'dd/MM/yyyy'}} </mat-cell>
    </ng-container>
    <ng-container matColumnDef="professores">
      <mat-header-cell *matHeaderCellDef> Professores </mat-header-cell>
      <mat-cell *matCellDef="let disciplina"> 
        <button mat-icon-button (click)="exibirProfessores(disciplina.professores)" matTooltip="Visualizar">
            {{disciplina.professores.length}} 
        </button>        
      </mat-cell>
    </ng-container>
    <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
    <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
  </mat-table>
  <div *ngIf="noResults$" class="noResult">Nenhum resultado</div>
  <button mat-fab color="primary">
    <mat-icon class="mat-24" routerLink="/main/disciplina/adicionar" aria-label="Adicionar">add</mat-icon>
  </button> 
</div>
```

##### No diretório src/app/main
``` typescript
ng g module relatorio
```

##### No diretório src/app/main/relatorio
``` typescript
ng g component presenca
```

##### No arquivo src/app/main/relatorio/relatorio.routing.ts
``` typescript
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PresencaComponent } from "./presenca/presenca.component";
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '**',
        component: PresencaComponent
      }
    ])
  ]
})
export class RelatorioRouting { }
```

##### No arquivo src/app/main/relatorio/relatorio.module.ts
``` typescript
import { RouterModule } from '@angular/router';
import { RelatorioRouting } from './relatorio.routing';
```

``` typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresencaComponent } from './presenca/presenca.component';
import { RouterModule } from '@angular/router';
import { RelatorioRouting } from './relatorio.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RelatorioRouting
  ],
  declarations: [PresencaComponent]
})
export class RelatorioModule { }
```

##### No arquivo src/app/main/main.routing.ts
``` typescript
{
  path: 'relatorio',
  loadChildren: './relatorio/relatorio.module#RelatorioModule'
}
```

``` typescript
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'main', 
        component: MainComponent,
        children: [
          {
            path: 'usuario',
            loadChildren: './usuario/usuario.module#UsuarioModule'
          },
          {
            path: 'disciplina',
            loadChildren: './disciplina/disciplina.module#DisciplinaModule'
          },
          {
            path: 'relatorio',
            loadChildren: './relatorio/relatorio.module#RelatorioModule'
          }
        ]
      }
    ])
  ]
})
export class MainRouting { }
```

##### No arquivo src/app/main/main.component.html
``` typescript
<mat-list-item routerLink="/main/relatorio"  (click)="sidenav.close()">
  <button mat-icon-button >
      <mat-icon>info</mat-icon>
  </button>
  <a mdLine>Relatório</a>
</mat-list-item>
```

``` typescript
<mat-sidenav-container>
    <mat-sidenav #sidenav>
    <a mat-button style="height: 0; position: absolute;"></a>  
        <mat-nav-list>
        <mat-list-item routerLink="/main/usuario/consulta" (click)="sidenav.close()">
            <button mat-icon-button >
                <mat-icon>info</mat-icon>
            </button>
            <a mdLine>Usuários</a>
        </mat-list-item>
        <mat-list-item routerLink="/main/disciplina/consulta" (click)="sidenav.close()">
            <button mat-icon-button >
                <mat-icon>info</mat-icon>
            </button>
            <a mdLine>Disciplinas</a>
        </mat-list-item>
        <mat-list-item routerLink="/main/relatorio" (click)="sidenav.close()">
            <button mat-icon-button >
                <mat-icon>info</mat-icon>
            </button>
            <a mdLine>Relatório</a>
        </mat-list-item>
        </mat-nav-list>
    </mat-sidenav>
    <mat-toolbar color="primary">
        <button mat-icon-button (click)="sidenav.open()">
            <mat-icon>menu</mat-icon>
        </button>
        <span>Eu vim</span>
    </mat-toolbar>
    <mat-card id="content">
        <router-outlet></router-outlet>
    </mat-card>
</mat-sidenav-container>
```

##### Mover o arquivo src/app/main/disciplina/disciplina.service.ts para src/app/main/services/disciplina.service.ts
``` typescript
import { environment } from '../../../environments/environment';
```

``` typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class DisciplinaService {

  private disciplinas;
  private _urlDisciplina = environment.url+"/api/v1/disciplinas";

  constructor(private _httpClient: HttpClient) { }
  
  adicionar(disciplina){
    return this._httpClient.post(this._urlDisciplina, disciplina, {responseType: 'text'});
  }

  excluir(id){
    return this._httpClient.delete(this._urlDisciplina+"/"+id, {responseType: 'text'});
  }

  editar(disciplina){
    return this._httpClient.put(this._urlDisciplina+"/"+disciplina.id, disciplina, {responseType: 'text'});
  }

  listar(){
    return this._httpClient.get<Array<Object>>(this._urlDisciplina);
  }

  carregar(id){
    return this._httpClient.get<any>(this._urlDisciplina+"/"+id);
  }

}
```

##### No arquivo src/app/main/disciplina/disciplina.module.ts
``` typescript
import { DisciplinaService } from '../services/disciplina.service';
```

``` typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaComponent } from './consulta/consulta.component';
import { FormularioComponent } from './formulario/formulario.component';

import { DisciplinaRouting } from './disciplina.routing';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatTableModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatIconModule, MatTooltipModule, MatOptionModule, MatNativeDateModule, MatDatepickerModule, MAT_DATE_LOCALE, MatListModule, MatDialogModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DisciplinaService } from '../services/disciplina.service';
import { ProfessorService } from './professor.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProfessorComponent } from './professor/professor.component';
import { QrcodeComponent } from './qrcode/qrcode.component';

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
    HttpClientModule
  ],
  providers: [
    FormBuilder,
    DisciplinaService,
    ProfessorService,
    HttpClient,
    {provide: MAT_DATE_LOCALE, useValue: 'pt-br'}
  ],
  entryComponents: [ProfessorComponent, QrcodeComponent],
  declarations: [ConsultaComponent, FormularioComponent, ProfessorComponent, QrcodeComponent]
})
export class DisciplinaModule { }

```

##### No arquivo src/app/main/disciplina/consulta/consulta.component.ts
``` typescript
import { DisciplinaService } from '../../services/disciplina.service';
```

``` typescript
import { Component, OnInit } from '@angular/core';

import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { DisciplinaService } from '../../services/disciplina.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ProfessorComponent } from '../professor/professor.component';
import { QrcodeComponent } from '../qrcode/qrcode.component';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit {

  public displayedColumns = ['id', 'segmento', 'descricao', 'dataInicio', 'dataTermino', 'professores'];
  public dataSource: MatTableDataSource<any>;

  public noResults$ = false;
  constructor(private _disciplinaService: DisciplinaService, private _router: Router, public dialog: MatDialog) { }
  
  ngOnInit() {
    this.atualizarListaDeDisciplinas();
  }
 
  excluir(id){
    this._disciplinaService.excluir(id).subscribe(suc=>{
      this.atualizarListaDeDisciplinas();
  });
  }

  editar(id){
    this._router.navigate(["/main/disciplina/editar", id]);
  }

  private atualizarListaDeDisciplinas(){
    this._disciplinaService.listar().subscribe(suc => {
      this.noResults$ = suc.length == 0;
      this.dataSource = new MatTableDataSource(suc);
    });
  }

  exibirProfessores(professores){
    let dialogRef = this.dialog.open(ProfessorComponent, {
      width: '250px',
      data: { professores: professores }
    });
  }

  exibirQrCode(item){
    let dialogRef = this.dialog.open(QrcodeComponent, {
      width: '250px',
      data: { idCurso: item.id, descricao: item.descricao }
    });
  }

}
```

##### No arquivo src/app/main/disciplina/formulario/formulario.component.ts
``` typescript
import { DisciplinaService } from '../../services/disciplina.service';
```

``` typescript
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { EqualsPasswordValidator } from '../../../validators/equals.password.validator';
import { DisciplinaService } from '../../services/disciplina.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfessorService } from '../professor.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  public segmentos = [
    { id: "BACKEND", descricao: 'Backend' },
    { id: "FRONTEND", descricao: 'Frontend' },
    { id: "MOBILE", descricao: 'Mobile' }
  ];

  public form : FormGroup;
  public id;
  public professores= [];
  public professorSelecionado;
  
  constructor(private formBuilder: FormBuilder, private _disciplinaService: DisciplinaService, private _professorService: ProfessorService, private _router: Router, private _activateRoute: ActivatedRoute) {
    this.form = formBuilder.group({
      id: [null],
      descricao: [null, Validators.required],
      segmento: [null, Validators.required],
      dataInicio: [null, Validators.required],
      dataTermino: [null, Validators.required],
      urlLogo: [null],
      professores: formBuilder.array([])
    });
   }
  
  ngOnInit() {
    this.id = null;    
    this._activateRoute.params.subscribe(params=>{
      this.id = params['id'];
    });
    this._professorService.listar().subscribe(suc=>{
      this.professores = suc;
    })
    if(this.id){
      this._disciplinaService.carregar(this.id).subscribe(suc=>{
        var item = suc;
        this.form.setValue({
          id: suc.id,
          descricao: suc.descricao,
          segmento: suc.segmento,
          dataInicio: suc.dataInicio,
          dataTermino: suc.dataTermino,
          urlLogo: suc.urlLogo,
          professores:[]
        });
        suc.professores.forEach(element => {
          let item = this.professores.find(item=>{ return item.id == element});
          if(item){
            this.professorSelecionado = item;
            this.adicionarProfessor();
          }
        });
      });
    }
  }

  salvar() {
    if(this.form.valid){
      if(this.id){
        this._disciplinaService.editar(this.form.value).subscribe(suc=>{
          this.consultar();
        });
      } else {
        this._disciplinaService.adicionar(this.form.value).subscribe(suc=>{
          this.consultar();
        });
      }
    }
  }

  consultar() {
    this.form.reset();
    this._router.navigate(['/main/disciplina/consulta']);
  }

  carregarImagem(event){
    event.target.src = "https://d30y9cdsu7xlg0.cloudfront.net/png/20804-200.png";
  }

  abrirCalendario(item){
    item.open();
  }

  adicionarProfessor(){
    let arrayProf = (<FormArray>this.form.get("professores"));
    if(!arrayProf.value.includes(this.professorSelecionado.id)){
      arrayProf.value.push(this.professorSelecionado.id);
    }
    this.professorSelecionado.selected = true;
    delete this.professorSelecionado;
  }

  carregarNomeProfessor(id){
    let item = this.professores.find(item=>{ return item.id == id});
    return item ? item.nome : "Professor indisponível";
  }
  
  removerProfessor(id){
    let arrayProf = (<FormArray>this.form.get("professores"));
    let index = arrayProf.value.findIndex(item=>{return item == id});
    if(index > -1){
      arrayProf.value.splice(index,1);
    }
    let item = this.professores.find(item=>{ return item.id == id});
    item.selected = false;
  }

}
```

##### No arquivo src/app/main/relatorio
``` typescript
ng g service relatorio
```

##### No arquivo src/app/main/relatorio/relatorio.module.ts
``` typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresencaComponent } from './presenca/presenca.component';
import { RouterModule } from '@angular/router';
import { RelatorioRouting } from './relatorio.routing';
import { RelatorioService } from './relatorio.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DisciplinaService } from '../services/disciplina.service';
import { MAT_DATE_LOCALE, MatExpansionModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatTooltipModule, MatSelectModule, MatOptionModule, MatDatepickerModule, MatNativeDateModule, MatListModule, MatDialogModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
```

``` typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresencaComponent } from './presenca/presenca.component';
import { RouterModule } from '@angular/router';
import { RelatorioRouting } from './relatorio.routing';
import { RelatorioService } from './relatorio.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DisciplinaService } from '../services/disciplina.service';
import { MAT_DATE_LOCALE, MatExpansionModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatTooltipModule, MatSelectModule, MatOptionModule, MatDatepickerModule, MatNativeDateModule, MatListModule, MatDialogModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

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
    HttpClientModule
  ],
  providers: [
    HttpClient, 
    FormBuilder, 
    DisciplinaService, 
    RelatorioService , 
    {provide: MAT_DATE_LOCALE, useValue: 'pt-br'}
  ],
  declarations: [PresencaComponent]
})
export class RelatorioModule { }
```

##### No arquivo src/app/main/relatorio/relatorio.service.ts
``` typescript
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

private _urlRelatorio = environment.url+"/api/v1/relatorio";

constructor(private _httpClient: HttpClient) { }

listarPresencaPorDisciplina(disciplina){
  return this._httpClient.get<Array<any>>(this._urlRelatorio+"/"+disciplina);
}
```

``` typescript
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RelatorioService {

  private _urlRelatorio = environment.url+"/api/v1/relatorio";

  constructor(private _httpClient: HttpClient) { }
  
  listarPresencaPorDisciplina(disciplina){
    return this._httpClient.get<Array<any>>(this._urlRelatorio+"/"+disciplina);
  }

}
```

##### No arquivo src/app/main/relatorio/presenca/presenca.component.ts
``` typescript
public disciplinas=[];
  
constructor(private _disciplinaService: DisciplinaService) { }

ngOnInit() {
  this._disciplinaService.listar().subscribe(suc=>{
    this.disciplinas = suc;
  })
}

abrirCalendario(item){
  item.open();
}
```

``` typescript
import { Component, OnInit } from '@angular/core';
import { DisciplinaService } from '../../services/disciplina.service';

@Component({
  selector: 'app-presenca',
  templateUrl: './presenca.component.html',
  styleUrls: ['./presenca.component.scss']
})
export class PresencaComponent implements OnInit {

  public disciplinas=[];
  
  constructor(private _disciplinaService: DisciplinaService) { }

  ngOnInit() {
    this._disciplinaService.listar().subscribe(suc=>{
      this.disciplinas = suc;
    })
  }

  abrirCalendario(item){
    item.open();
  }

}
```

##### No arquivo src/app/main/relatorio/presenca/presenca.component.html
``` typescript
<div class="mat-elevation-z8">
  <mat-accordion class="example-headers-align">
    <mat-expansion-panel [expanded]="!filtred" (opened)="filtred = false" hideToggle="true">
      <mat-expansion-panel-header>
        <mat-panel-title fxFlex="70">
          <mat-icon>filter_list</mat-icon> 
          <div fxFlexOffset="10px"> Filtros</div>
        </mat-panel-title>
      </mat-expansion-panel-header>  
      <form fxLayout="column">
        <div fxFlex="100" fxLayout="row">  
          <mat-form-field fxFlex="47"> 
            <mat-select  placeholder="Disciplina" >
                <mat-option *ngFor="let disciplina of disciplinas" [value]="disciplina.id">
                  {{ disciplina.descricao }}
                </mat-option>
            </mat-select>
          </mat-form-field>
        </div>
        <div fxFlex="100" fxLayout="row">
          <mat-form-field fxFlex="47"> 
            <input matInput (keypress)="abrirCalendario(dtInicio);" [matDatepicker]="dtInicio" placeholder="Data Início">
            <mat-datepicker-toggle matSuffix [for]="dtInicio"></mat-datepicker-toggle>
            <mat-datepicker #dtInicio touchUi="true"></mat-datepicker>
          </mat-form-field>
          <span fxFlex="5"></span>
          <mat-form-field fxFlex="47"> 
            <input matInput (keypress)="abrirCalendario(dtTermino);" [matDatepicker]="dtTermino" placeholder="Data Término">
            <mat-datepicker-toggle matSuffix [for]="dtTermino"></mat-datepicker-toggle>
            <mat-datepicker #dtTermino touchUi="true"></mat-datepicker>
          </mat-form-field>
        </div>
        <br/>
        <div fxFlex="100" fxLayout="row" fxLayoutAlign="space-between">
            <button mat-raised-button (click)="filtred=true" color="primary" >Filtrar</button>
        </div>
      </form>
    </mat-expansion-panel>
  </mat-accordion>
</div>
<br/>
<div *ngIf="filtred" class="mat-elevation-z8">
  <mat-accordion>
    <mat-expansion-panel>
      <mat-expansion-panel-header>
        <mat-panel-title fxFlex="70">
          José
        </mat-panel-title>
        <mat-panel-description>
          Frequência 50%
        </mat-panel-description>
      </mat-expansion-panel-header>

      <mat-list>
        <h3 matSubheader>Presenças</h3>
        <mat-list-item>
          <mat-icon matListIcon>check</mat-icon>
          <h3 matLine> Presente </h3>
          <p matLine>
            <span> DD/MM/YYYY </span>
          </p>
        </mat-list-item>
        <mat-divider></mat-divider>
        <mat-list-item>
            <mat-icon matListIcon>remove</mat-icon>
            <h3 matLine> Ausente </h3>
            <p matLine>
              <span> DD/MM/YYYY </span>
            </p>
          </mat-list-item>
        <mat-divider></mat-divider>
      </mat-list>

    </mat-expansion-panel>
  </mat-accordion>
</div>
```

##### No arquivo src/app/main/relatorio/presenca/presenca.component.ts
``` typescript
public filtred: boolean;
public relatorio=[];
public form: FormGroup;

constructor(private _disciplinaService: DisciplinaService,
  private _relatorioService: RelatorioService,
  private _form: FormBuilder) {
  this.form = this._form.group({
    disciplina: [null, Validators.required],
    dataInicio: [null, Validators.required],
    dataFim: [null, Validators.required]
  });
}

gerarRelatorio() {
  this.filtred = true;
  this.relatorio = null;
  this._relatorioService.listarPresencaPorDisciplina(this.form.value).subscribe(suc=>{
    console.log(suc);
    this.relatorio = suc;
  })
}
```

``` typescript
import { Component, OnInit } from '@angular/core';
import { DisciplinaService } from '../../services/disciplina.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RelatorioService } from '../relatorio.service';

@Component({
  selector: 'app-presenca',
  templateUrl: './presenca.component.html',
  styleUrls: ['./presenca.component.scss']
})
export class PresencaComponent implements OnInit {

  public disciplinas=[];
  public filtred: boolean;
  public relatorio=[];
  public form: FormGroup;
  
  constructor(private _disciplinaService: DisciplinaService,
    private _relatorioService: RelatorioService,
    private _form: FormBuilder) {
    this.form = this._form.group({
      disciplina: [null, Validators.required],
      dataInicio: [null, Validators.required],
      dataFim: [null, Validators.required]
    });
  }

  ngOnInit() {
    this._disciplinaService.listar().subscribe(suc=>{
      this.disciplinas = suc;
    });
  }

  abrirCalendario(item){
    item.open();
  }

  gerarRelatorio() {
    this.filtred = true;
    this.relatorio = null;
    this._relatorioService.listarPresencaPorDisciplina(this.form.value).subscribe(suc=>{
      this.relatorio = suc;
    });
  }

}
```

##### No arquivo src/app/main/relatorio/presenca/presenca.component.html
``` typescript
<div *ngIf="filtred" class="mat-elevation-z8">
  <mat-accordion>
    <mat-expansion-panel *ngFor="let item of relatorio">
      <mat-expansion-panel-header>
        <mat-panel-title fxFlex="70">
          {{item.usuario.nome}}
        </mat-panel-title>
        <mat-panel-description>
          Frequência {{item.frequencia}}%
        </mat-panel-description>
      </mat-expansion-panel-header>
      <mat-list>
        <h3 matSubheader>Presenças</h3>
        <mat-list-item>
          <mat-icon matListIcon>check</mat-icon>
          <h3 matLine> Presente </h3>
          <p matLine>
            <span> DD/MM/YYYY </span>
          </p>
        </mat-list-item>
        <mat-divider></mat-divider>
        <mat-list-item>
            <mat-icon matListIcon>remove</mat-icon>
            <h3 matLine> Ausente </h3>
            <p matLine>
              <span> DD/MM/YYYY </span>
            </p>
          </mat-list-item>
        <mat-divider></mat-divider>
      </mat-list>
    </mat-expansion-panel>
  </mat-accordion>
</div>
```

``` typescript
<div class="mat-elevation-z8">
  <mat-accordion class="example-headers-align">
    <mat-expansion-panel [expanded]="!filtred" [disabled]="!filtred" (opened)="filtred = false" hideToggle="true">
      <mat-expansion-panel-header>
        <mat-panel-title fxFlex="70">
          <mat-icon>filter_list</mat-icon> 
          <div fxFlexOffset="10px"> Filtros</div>
        </mat-panel-title>
      </mat-expansion-panel-header>  
      <form [formGroup]="form" fxLayout="column">
        <div fxFlex="100" fxLayout="row">  
          <mat-form-field fxFlex="47"> 
            <mat-select formControlName="disciplina" placeholder="Disciplina" >
                <mat-option *ngFor="let disciplina of disciplinas" [value]="disciplina.id">
                  {{ disciplina.descricao }}
                </mat-option>
            </mat-select>
            <mat-error *ngIf="form.controls['disciplina'].hasError('required')">
              Campo obrigatório
            </mat-error>
          </mat-form-field>
        </div>
        <div fxFlex="100" fxLayout="row">
          <mat-form-field fxFlex="47"> 
            <input matInput (keypress)="abrirCalendario(dtInicio);" formControlName="dataInicio" [matDatepicker]="dtInicio" placeholder="Data Início">
            <mat-datepicker-toggle matSuffix [for]="dtInicio"></mat-datepicker-toggle>
            <mat-datepicker #dtInicio touchUi="true"></mat-datepicker>
            <mat-error *ngIf="form.controls['dataInicio'].hasError('required')">
              Campo obrigatório
            </mat-error>
          </mat-form-field>
          <span fxFlex="5"></span>
          <mat-form-field fxFlex="47"> 
            <input matInput (keypress)="abrirCalendario(dtTermino);" formControlName="dataFim" [matDatepicker]="dtTermino" placeholder="Data Término">
            <mat-datepicker-toggle matSuffix [for]="dtTermino"></mat-datepicker-toggle>
            <mat-datepicker #dtTermino touchUi="true"></mat-datepicker>
            <mat-error *ngIf="form.controls['dataFim'].hasError('required')">
              Campo obrigatório
            </mat-error>
          </mat-form-field>
        </div>
        <br/>
        <div fxFlex="100" fxLayout="row" fxLayoutAlign="space-between">
            <button mat-raised-button (click)="gerarRelatorio()" [disabled]="!form.valid" color="primary" >Filtrar</button>
        </div>
      </form>
    </mat-expansion-panel>
  </mat-accordion>
</div>
<br/>
<div *ngIf="filtred" class="mat-elevation-z8">
  <mat-accordion>
    <mat-expansion-panel *ngFor="let item of relatorio">
      <mat-expansion-panel-header>
        <mat-panel-title fxFlex="70">
          {{item.usuario.nome}}
        </mat-panel-title>
        <mat-panel-description>
          Frequência {{item.frequencia}}%
        </mat-panel-description>
      </mat-expansion-panel-header>
      <mat-list>
        <h3 matSubheader>Presenças</h3>
        <mat-list-item>
          <mat-icon matListIcon>check</mat-icon>
          <h3 matLine> Presente </h3>
          <p matLine>
            <span> DD/MM/YYYY </span>
          </p>
        </mat-list-item>
        <mat-divider></mat-divider>
        <mat-list-item>
            <mat-icon matListIcon>remove</mat-icon>
            <h3 matLine> Ausente </h3>
            <p matLine>
              <span> DD/MM/YYYY </span>
            </p>
          </mat-list-item>
        <mat-divider></mat-divider>
      </mat-list>
    </mat-expansion-panel>
  </mat-accordion>
</div>
```

##### No diretório raiz
``` typescript
npm install --save moment
```

##### No arquivo src/app/main/relatorio/relatorio.service.ts
``` typescript
listarPresencaPorDisciplina(filter){
  let httpParams = new HttpParams()
  .append("dataInicio", moment(filter.dataInicio).format("YYYY-MM-DD"))
  .append("dataFim", moment(filter.dataFim).format("YYYY-MM-DD"));
  return this._httpClient.get<Array<any>>(this._urlRelatorio + "/" + filter.disciplina, {params: httpParams});
}
```

``` typescript
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as moment from 'moment';

@Injectable()
export class RelatorioService {

  private _urlRelatorio = environment.url+"/api/v1/relatorio";

  constructor(private _httpClient: HttpClient) { }
  
  listarPresencaPorDisciplina(filter){
    let httpParams = new HttpParams()
    .append("dataInicio", moment(filter.dataInicio).format("YYYY-MM-DD"))
    .append("dataFim", moment(filter.dataFim).format("YYYY-MM-DD"));
    return this._httpClient.get<Array<any>>(this._urlRelatorio + "/" + filter.disciplina, {params: httpParams});
  }

}
```