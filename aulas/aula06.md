
## **Curso de Férias 2018 - Desenvolvimento Frontend com Angular - Aula 06**

Sumário
=======

* [Conceitos](#conceitos)
  * [Datas](#datas)
* [Hands-on](#hands-on)
  * [Refatorando Módulos e Rotas](#refatorando-módulos-e-rotas)
  * [Adicionando Rota de Disciplina](#adicionando-rota-de-disciplina)
  * [Adicionando Consulta de Disciplina](#adicionando-consulta-de-disciplina)
  * [Adicionando Serviço de Professor](#adicionando-serviço-de-professor)
  * [Adicionando Formulário de Disciplina](#adicionando-formulário-de-disciplina)
  
Conceitos
=========

[Componentes Angular Material](https://material.angular.io/components)

Datas
--------
``` typescript
import { MAT_DATE_LOCALE } from '@angular/material';

providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-br'}    
  ]
  
{{element.data  | date:'dd/MM/yyyy'}} 
```

Hands-on
========

Refatorando Módulos e Rotas
---------------------------

##### No arquivo src/app/main/main.routing.ts
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
          }
        ]
      }
    ])
  ]
})
export class MainRouting { }
```

##### No arquivo src/app/main/main.module.ts
``` typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';

import { MainRouting } from './main.routing';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatIconModule, MatSidenavModule, MatCardModule, MatListModule, MatToolbarModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MainRouting,
    RouterModule,
    FlexLayoutModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule
  ],
  declarations: [MainComponent]
})
export class MainModule { }
```

##### No arquivo src/app/main/usuario/usuario.routing.ts
``` typescript
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConsultaComponent } from './consulta/consulta.component';
import { FormularioComponent } from './formulario/formulario.component';

@NgModule({
  imports: [
    RouterModule.forChild([
        {
          path: 'consulta',
          component: ConsultaComponent
        },
        {
          path: 'adicionar',
          component: FormularioComponent
        },
        {
          path: 'editar/:id',
          component: FormularioComponent
        }
    ])
  ]
})
export class UsuarioRouting { }
```

##### No arquivo src/app/main/usuario/usuario.module.ts
``` typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaComponent } from './consulta/consulta.component';
import { FormularioComponent } from './formulario/formulario.component';

import { UsuarioRouting } from './usuario.routing';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatTableModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatIconModule, MatTooltipModule, MatOptionModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { FlexLayoutModule } from '@angular/flex-layout';

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
    HttpClientModule
  ],
  providers: [
    FormBuilder,
    UsuarioService,
    HttpClient
  ],
  declarations: [ConsultaComponent, FormularioComponent]
})
export class UsuarioModule { }
```

Adicionando Rota de Disciplina
------------------------------

##### No arquivo src/app/main/main.routing.ts
``` typescript
{
  path: 'disciplina',
  loadChildren: './disciplina/disciplina.module#DisciplinaModule'
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
<mat-list-item routerLink="/main/disciplina/consulta" (click)="sidenav.close()">
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
        <mat-list-item href="#/main">
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

Adicionando Consulta de Disciplina
----------------------------------

##### No arquivo src/app/main/disciplina/consulta/consulta.component.ts
``` typescript
public displayedColumns = ['id', 'segmento', 'descricao', 'dataInicio', 'dataTermino', 'professores'];
```

``` typescript
import { Component, OnInit } from '@angular/core';

import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { DisciplinaService } from '../disciplina.service';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit {

  public displayedColumns = ['segmento', 'descricao', 'dataInicio', 'dataTermino', 'professores', 'id'];
  public dataSource: MatTableDataSource<any>;

  public noResults$ = false;
  constructor(private _disciplinaService: DisciplinaService, private _router: Router) { }
  
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

}
```

##### No arquivo src/app/main/disciplina/consulta/consulta.component.html

``` typescript
<div class="mat-elevation-z8">
  <mat-table #table [dataSource]="dataSource">
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
      <mat-cell *matCellDef="let disciplina"> {{disciplina.professores.length}} </mat-cell>
    </ng-container>
    <ng-container matColumnDef="id">
      <mat-header-cell *matHeaderCellDef  fxFlex="10"> Ações </mat-header-cell>
      <mat-cell *matCellDef="let disciplina" fxFlex="10" class="buttons">
          <button mat-icon-button color="primary"  matTooltip="Editar">
            <mat-icon class="md-24"  (click)="editar(disciplina.id)" aria-label="Editar">edit</mat-icon>
          </button>
          <button mat-icon-button color="danger" matTooltip="Excluir">
              <mat-icon class="md-24" (click)="excluir(disciplina.id)" aria-label="Excluir">delete</mat-icon>
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

Adicionando Serviço de Professor
--------------------------------

##### No arquivo src/app/main/disciplina/disciplina.module.ts
``` typescript
import { MatNativeDateModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material';
import { MAT_DATE_LOCALE } from '@angular/material';
```

``` typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaComponent } from './consulta/consulta.component';
import { FormularioComponent } from './formulario/formulario.component';

import { DisciplinaRouting } from './disciplina.routing';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatTableModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatIconModule, MatTooltipModule, MatOptionModule, MatNativeDateModule, MatDatepickerModule, MAT_DATE_LOCALE } from '@angular/material';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DisciplinaService } from './disciplina.service';
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
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    FormBuilder,
    DisciplinaService,
    HttpClient,
    {provide: MAT_DATE_LOCALE, useValue: 'pt-br'}
  ],
  declarations: [ConsultaComponent, FormularioComponent]
})
export class DisciplinaModule { }
```

##### No diretório src/app/main/disciplina
``` typescript
ng g service professor
```

##### No arquivo src/app/main/disciplina/disciplina.module.ts
``` typescript
import { ProfessorService } from './professor.service';
```

``` typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaComponent } from './consulta/consulta.component';
import { FormularioComponent } from './formulario/formulario.component';

import { DisciplinaRouting } from './disciplina.routing';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatTableModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatIconModule, MatTooltipModule, MatOptionModule, MatNativeDateModule, MatDatepickerModule, MAT_DATE_LOCALE } from '@angular/material';
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
```

##### No arquivo src/app/main/disciplina/professor.service.ts
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

}
```

Adicionando Formulário de Disciplina
------------------------------------

##### No arquivo src/app/main/disciplina/formulario/formulario.component.scss
``` typescript
img.urlLogo {
    height: 50px;
}
```

##### No arquivo src/app/main/disciplina/disciplina/disciplina.module.ts
``` typescript
import { MatListModule } from '@angular/material';

import { ProfessorService } from './professor.service';
```

``` typescript
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
```

##### No arquivo src/app/main/disciplina/formulario/formulario.module.ts
``` typescript
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { EqualsPasswordValidator } from '../../../validators/equals.password.validator';
import { DisciplinaService } from '../disciplina.service';
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
      instrutores: formBuilder.array([])
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
          instrutores:[]
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

}
```

##### No arquivo src/app/main/disciplina/formulario/formulario.module.ts
``` typescript
<div  fxLayout="column">
  <form [formGroup]="form"  fxLayout="column">
    <div fxFlex="100" fxLayout="row">  
      <mat-form-field fxFlex="47"> 
        <mat-select formControlName="segmento" placeholder="Segmento" >
            <mat-option *ngFor="let segmento of segmentos" [value]="segmento.id">
              {{ segmento.descricao }}
            </mat-option>
        </mat-select>
        <mat-error *ngIf="form.controls['segmento'].hasError('required')">
          Campo obrigatório
        </mat-error>
      </mat-form-field>
      <span fxFlex="5"></span>
      <mat-form-field fxFlex="47"> 
        <input matInput formControlName="descricao" placeholder="Descrição" >
        <mat-error *ngIf="form.controls['descricao'].hasError('required')">
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
        <input matInput (keypress)="abrirCalendario(dtTermino);" formControlName="dataTermino" [matDatepicker]="dtTermino" placeholder="Data Término">
        <mat-datepicker-toggle matSuffix [for]="dtTermino"></mat-datepicker-toggle>
        <mat-datepicker #dtTermino touchUi="true"></mat-datepicker>
        <mat-error *ngIf="form.controls['dataTermino'].hasError('required')">
          Campo obrigatório
        </mat-error>
      </mat-form-field>
    </div>
    <div fxFlex="100" fxLayout="row">
      <mat-form-field fxFlex="75"> 
          <input matInput formControlName="urlLogo" placeholder="Url Logo">
          <mat-error *ngIf="form.controls['urlLogo'].hasError('required')">
            Campo obrigatório
          </mat-error>
      </mat-form-field>
      <span fxFlex="5"></span>
      <img class="urlLogo" src="#"/>
    </div>
    <div fxFlex="100" fxLayout="row">
      <mat-form-field fxFlex="75"> 
        <mat-select placeholder="Professores" >
            <mat-option *ngFor="let professor of professores" [value]="professor">
              {{ professor.nome }}
            </mat-option>
        </mat-select>
      </mat-form-field>
      <span fxFlex="5"></span>
      <button mat-raised-button mat-icon-button color="primary">
          <mat-icon>add</mat-icon>
      </button>
    </div>
    <br/>
    <div fxFlex="100" fxLayout="row" fxLayoutAlign="space-between">
        <button mat-raised-button color="primary" [disabled]="!form.valid" (click)="salvar()">Salvar</button>
        <button mat-raised-button color="warn" routerLink="/main/disciplina/consulta">Cancelar</button>
    </div>
  </form>
</div>
```
