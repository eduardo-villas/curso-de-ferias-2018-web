
## **Curso de Férias 2018 - Desenvolvimento Frontend com Angular - Aula 02**

Sumário
=======

* [Conceitos](#conceitos)
  * [Modules](#modules)
  * [Componentes](#componentes)
  * [Rotas](#rotas)
  * [Layout](#layout)
* [Hands-on](#hands-on)
  * [Criando um Módulo](#criando-um-módulo)
  * [Criando um Componente](#criando-um-componente)
  * [Configurando Rotas](#configurando-rotas)
  * [Adicionando Layout](#adicionando-layout)
  * [Criando Módulo de Usuário](#criando-módulo-de-usuário)
  * [Criando Componente de Consulta de Usuário](#criando-componente-de-consulta-de-usuário)
  * [Criando Componente de Formulário de Usuário](#criando-componente-de-formulário-de-usuário)
  * [Configurando Rota de Consulta de Usuário](#configurando-rota-de-consulta-de-usuário)
  
Conceitos
=========

Modules
-------

##### src/app/main/main.module.js
``` typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class MainModule { }
```

Componentes
-----------

##### src/app/main/main.component.scss
``` css
empty
```

##### src/app/main/main.component.html
``` html
<p>
  main works!
</p>
```

##### src/app/main/main.component.spec.ts
``` typescript
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

##### src/app/main/main.component.ts
``` typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
```

##### src/app/main/main.module.js
``` typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MainComponent]
})
export class MainModule { }
```

Rotas
-----

##### src/app/app.routing.ts
``` typescript
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: '/main', pathMatch: 'full' }
    ], {useHash:true})
  ]
})
export class AppRoutingModule { }
```

##### src/app/main/main.routing.ts
``` typescript
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'main', 
        component: MainComponent
      }
    ])
  ]
})
export class MainRouting { }
```

Layout
------

##### Instalando Flex
```npm install --save @angular/flex-layout```

Hands-On
========

Criando um Módulo
-----------------

```ng g module main```

Criando um Componente
---------------------

```ng g component main```

Configurando Rotas
------------------

##### No arquivo src/app/app.routing.ts
``` typescript
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: '/main', pathMatch: 'full' }
    ], {useHash:true})
  ]
})
export class AppRoutingModule { }
```

##### No arquivo src/app/main/main.routing.ts
``` typescript
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'main', 
        component: MainComponent
      }
    ])
  ]
})
export class MainRouting { }
```

##### No arquivo src/app/app.module.ts
``` typescript
import { RouterModule } from '@angular/router';
import { MainModule } from "./main/main.module";
import { AppRoutingModule } from "./app.routing";
```

``` typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';

import { RouterModule } from '@angular/router';
import { MainModule } from './main/main.module';
import { AppRoutingModule } from './app.routing';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    RouterModule,
    MainModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

##### No arquivo src/app/main/main.module.ts
``` typescript
import { MainRouting } from './main.routing';
import { RouterModule } from "@angular/router";
```

``` typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';

import { MainRouting } from './main.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MainRouting,
    RouterModule
  ],
  declarations: [MainComponent]
})
export class MainModule { }
```

##### No arquivo src/app/app.component.html
```
<router-outlet></router-outlet>
```

##### No arquivo src/app/main/main.component.html
```
<router-outlet></router-outlet>
```

Adicionando Layout
------------------

##### Adicionando Flex Layout
```npm install --save @angular/flex-layout```

##### No arquivo src/app/main/main.component.html
``` typescript
<mat-sidenav-container>
    <mat-sidenav #sidenav>
    <a mat-button style="height: 0; position: absolute;"></a>  
        <mat-nav-list>
        <mat-list-item href="#/main">
            <button mat-icon-button >
                <mat-icon>info</mat-icon>
            </button>
            <a mdLine>Usuários</a>
        </mat-list-item>
        <mat-list-item href="#/main">
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

##### No arquivo src/app/main/main.module.ts
``` typescript
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule, MatSidenavModule, MatCardModule, MatListModule, MatToolbarModule, MatButtonModule } from '@angular/material';
```

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

##### No arquivo src/app/main/main.component.scss
``` css
mat-sidenav-container{
    position: fixed;
    margin: 0px;
    height: 100%;
    width: 100%;
}
#content{
    position: fixed;
    left: 0px;
    right: 0px;
    bottom: 0px;
    top: 65px;
    z-index: -1;
    overflow-x: auto;
}
```

Criando Módulo de Usuário
-------------------------

##### No diretório src/app/main
```ng g module usuario```

Criando Componente de Consulta de Usuário
-----------------------------------------

##### No diretório src/app/main/usuario
```ng g component consulta```

Criando Componente de Formulário de Usuário
-------------------------------------------
##### No diretório src/app/main/usuario
```ng g component formulario```

Configurando Rota de Consulta de Usuário
----------------------------------------
##### No arquivo src/app/main/main.module.ts
``` typescript
import { ConsultaComponent } from './usuario/consulta/consulta.component';
import { FormularioComponent } from './usuario/formulario/formulario.component';
```

``` typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';

import { MainRouting } from './main.routing';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatSidenavModule, MatCardModule, MatListModule, MatToolbarModule, MatButtonModule } from '@angular/material';
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
    MatButtonModule
  ],
  declarations: [MainComponent, ConsultaComponent, FormularioComponent]
})
export class MainModule { }
```

##### No arquivo src/app/main/main.routing.ts
``` typescript
children: [
          {
            path: 'usuario/consulta',
            component: ConsultaComponent
          }
        ]
 ```

``` typescript
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { ConsultaComponent } from './usuario/consulta/consulta.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'main', 
        component: MainComponent,
        children: [
          {
            path: 'usuario/consulta',
            component: ConsultaComponent
          }
        ]
      }
    ])
  ]
})
export class MainRouting { }
```
##### No arquivo src/app/main/main.component.html
```routerLink="/main/usuario/consulta" (click)="sidenav.close()"```

``` html
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
        <mat-list-item href="#/main">
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
