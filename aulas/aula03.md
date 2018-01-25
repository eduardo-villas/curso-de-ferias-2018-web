
## **Curso de Férias 2018 - Desenvolvimento Frontend com Angular - Aula 03**

Sumário
=======

* [Conceitos](#conceitos)
  * [Variáveis](#variáveis)
  * [Elementos](#elementos)
  * [DataSource](#datasource)
  * [Formulários](#formulários)
* [Hands-on](#hands-on)
  * [Tabela de Consulta de Usuários](#tabela-de-consulta-de-usuários)
  * [Adicionando Rota para Formulário de Usuário](#adicionando-rota-para-formulário-de-usuário)
  * [Criando Formulário de Usuário](#criando-formulário-de-usuário)
  
Conceitos
=========

[Componentes Angular Material](https://material.angular.io/components)

Variáveis
-------
``` typescript
public displayedColumns = ['position', 'name', 'weight', 'symbol'];
public dataSource = new UsuarioDataSource();
```

Elementos
-------
``` typescript
export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
```

DataSource
----------
``` typescript
export class UsuarioDataSource extends DataSource<any> {
  
  connect(): Observable<Element[]> {
    return Observable.of([
      {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
      {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
      {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'}
    ]);
  }

  disconnect() {}
}
```

Formulários
-----------

``` typescript
<form fxLayout="column">
  <mat-form-field fxFlex="100"> 
    <input matInput placeholder="Nome">
  </mat-form-field>
  <div fxFlex="100" fxLayout="row" fxLayoutAlign="space-between">
      <button mat-raised-button color="primary">Salvar</button>
      <button mat-raised-button color="warn" routerLink="/main/cancelar">Cancelar</button>
  </div>
</form>
```

Hands-on
========

Tabela de Consulta de Usuários
------------------------------

##### No arquivo src/app/main/main.module.ts
```import { MatTableModule } from '@angular/material';```

``` typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';

import { MainRouting } from './main.routing';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatSidenavModule, MatCardModule, MatListModule, MatToolbarModule, MatButtonModule, MatTableModule } from '@angular/material';
import { ConsultaComponent } from './usuario/consulta/consulta.component';
import { FormularioComponent } from './usuario/formulario/formulario.component';

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
    MatButtonModule,
    MatTableModule
  ],
  declarations: [MainComponent, ConsultaComponent, FormularioComponent]
})
export class MainModule { }
```

##### No arquivo src/app/main/usuario/consulta/consulta.component.html
```html
<div class="mat-elevation-z8">
  <mat-table #table [dataSource]="dataSource">
    <ng-container matColumnDef="nome">
      <mat-header-cell *matHeaderCellDef> Nome </mat-header-cell>
      <mat-cell *matCellDef="let element"> {{element.nome}} </mat-cell>
    </ng-container>
    <ng-container matColumnDef="login">
        <mat-header-cell *matHeaderCellDef> Login </mat-header-cell>
        <mat-cell *matCellDef="let element"> {{element.login}} </mat-cell>
    </ng-container>
    <ng-container matColumnDef="email">
      <mat-header-cell *matHeaderCellDef> E-mail </mat-header-cell>
      <mat-cell *matCellDef="let element"> {{element.email}} </mat-cell>
    </ng-container>
    <ng-container matColumnDef="perfil">
      <mat-header-cell *matHeaderCellDef> Perfil </mat-header-cell>
      <mat-cell *matCellDef="let element"> {{element.perfil}} </mat-cell>
    </ng-container>
    <ng-container matColumnDef="id">
      <mat-header-cell *matHeaderCellDef  fxFlex="10"> Ações </mat-header-cell>
      <mat-cell *matCellDef="let element" fxFlex="10" class="buttons">
          <button mat-icon-button color="primary"  mdTooltip="Editar">
            <mat-icon class="mat-24" aria-label="Editar">edit</mat-icon>
          </button>
          <button mat-icon-button color="danger" mdTooltip="Excluir">
              <mat-icon class="mat-24" aria-label="Excluir">delete</mat-icon>
          </button>
      </mat-cell>
    </ng-container>
    <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
    <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
  </mat-table>
  <button mat-fab color="primary">
    <mat-icon class="mat-24" aria-label="Adicionar">add</mat-icon>
  </button> 
</div>
```

##### No arquivo src/app/main/usuario/consulta/consulta.component.ts
``` typescript
import { Component, OnInit } from '@angular/core';

import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit {

  public displayedColumns = ['nome', 'login', 'email', 'perfil', 'id'];
  public dataSource = new UsuarioDataSource();

  constructor() { }

  ngOnInit() {
  }

}

export interface Element {
  id: number;
  nome: string;
  login: number;
  email: string;
  perfil: string;
}

export class UsuarioDataSource extends DataSource<any> {
  
  connect(): Observable<any[]> {
    return Observable.of([
      {id: 1, nome: 'José da Silva', login: "jose", email: 'jose@ponto.com.br', perfil:"Aluno"},
      {id: 2, nome: 'Mariano das Neves', login: "mariano", email: 'marino@ponto.com.br', perfil:"Aluno"},
      {id: 3, nome: 'Magyver da Silva', login: "magyver", email: 'magyver@ponto.com.br', perfil:"Aluno"},
      {id: 4, nome: 'Irineu Nunes', login: "irineu", email: 'irineu@ponto.com.br', perfil:"Aluno"},
      {id: 5, nome: 'Carlos Silva', login: "carlos", email: 'carlos@ponto.com.br', perfil:"Aluno"}
    ]);
  }

  disconnect() {}
}
```

##### No arquivo src/app/main/usuario/consulta/consulta.component.scss
``` css
.mat-fab{
    position: fixed;
    right: 20px;
    bottom: 20px;
}
```

Adicionando Rota para Formulário de Usuário
-------------------------------------------

##### No arquivo src/app/main/main.routing.ts
``` typescript
{
  path: 'usuario/adicionar',
  component: FormularioComponent
}
```

``` typescript
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { ConsultaComponent } from './usuario/consulta/consulta.component';
import { FormularioComponent } from './usuario/formulario/formulario.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'main', 
        component: MainComponent,
        children: [
          {
            path: 'usuario/consulta',
            component: ConsultaComponent
          },
          {
            path: 'usuario/adicionar',
            component: FormularioComponent
          }
        ]
      }
    ])
  ]
})
export class MainRouting { }
```

##### No arquivo src/app/main/usuario/consulta/consulta.component.html
``` typescript
routerLink="/main/usuario/adicionar"
```

``` typescript
<div class="mat-elevation-z8">
  <mat-table #table [dataSource]="dataSource">
    <ng-container matColumnDef="nome">
      <mat-header-cell *matHeaderCellDef> Nome </mat-header-cell>
      <mat-cell *matCellDef="let element"> {{element.nome}} </mat-cell>
    </ng-container>
    <ng-container matColumnDef="login">
        <mat-header-cell *matHeaderCellDef> Login </mat-header-cell>
        <mat-cell *matCellDef="let element"> {{element.login}} </mat-cell>
    </ng-container>
    <ng-container matColumnDef="email">
      <mat-header-cell *matHeaderCellDef> E-mail </mat-header-cell>
      <mat-cell *matCellDef="let element"> {{element.email}} </mat-cell>
    </ng-container>
    <ng-container matColumnDef="perfil">
      <mat-header-cell *matHeaderCellDef> Perfil </mat-header-cell>
      <mat-cell *matCellDef="let element"> {{element.perfil}} </mat-cell>
    </ng-container>
    <ng-container matColumnDef="id">
      <mat-header-cell *matHeaderCellDef  fxFlex="10"> Ações </mat-header-cell>
      <mat-cell *matCellDef="let element" fxFlex="10" class="buttons">
          <button mat-icon-button color="primary" mdTooltip="Editar">
            <mat-icon class="mat-24" aria-label="Editar">edit</mat-icon>
          </button>
          <button mat-icon-button color="danger" mdTooltip="Excluir">
              <mat-icon class="mat-24" aria-label="Excluir">delete</mat-icon>
          </button>
      </mat-cell>
    </ng-container>
    <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
    <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
  </mat-table>
  <button mat-fab color="primary" routerLink="/main/usuario/adicionar">
    <mat-icon class="mat-24" aria-label="Adicionar">add</mat-icon>
  </button> 
</div>
```

Criando Formulário de Usuário
-----------------------------

##### No arquivo src/app/main/main.module.ts
``` typescript
import { MatFormFieldModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
```

``` typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';

import { MainRouting } from './main.routing';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatSidenavModule, MatCardModule, MatListModule, MatToolbarModule, MatButtonModule, MatTableModule, MatFormFieldModule, MatSelectModule, MatInputModule } from '@angular/material';
import { ConsultaComponent } from './usuario/consulta/consulta.component';
import { FormularioComponent } from './usuario/formulario/formulario.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  declarations: [MainComponent, ConsultaComponent, FormularioComponent]
})
export class MainModule { }
```

##### No arquivo src/app/main/usuario/formulario/formulario.component.html
``` typescript
<form fxLayout="column">
  <mat-form-field fxFlex="100"> 
    <input matInput placeholder="Nome">
  </mat-form-field>
  <mat-form-field fxFlex="100"> 
    <input matInput placeholder="E-mail">
  </mat-form-field>
  <div fxFlex="100" fxLayout="row">
    <mat-form-field fxFlex="47"> 
      <input matInput placeholder="Login">
    </mat-form-field>
    <span fxFlex="5"></span>
    <mat-form-field fxFlex="47"> 
      <mat-select placeholder="Perfil">
          <mat-option>
            Aluno
          </mat-option>
          <mat-option>
            Professor
          </mat-option>
      </mat-select>
    </mat-form-field>
  </div>
  <div fxFlex="100" fxLayout="row">
    <mat-form-field fxFlex="47"> 
      <input matInput placeholder="Senha" type="password">
    </mat-form-field>
    <span fxFlex="5"></span>
    <mat-form-field fxFlex="47"> 
      <input matInput placeholder="Confirmação" type="password">
    </mat-form-field>
  </div>
  <div fxFlex="100" fxLayout="row" fxLayoutAlign="space-between">
      <button mat-raised-button color="primary">Salvar</button>
      <button mat-raised-button color="warn" routerLink="/main/usuario/consulta">Cancelar</button>
  </div>
</form>
```