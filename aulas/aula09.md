
## **Curso de Férias 2018 - Desenvolvimento Frontend com Angular - Aula 08**

Sumário
=======

* [Conceitos](#conceitos)
  * [Interação com Componentes](#interação-com-componentes)
  * [Auth Guard](#auth-guard)
  * [Interceptors](#injeção-de-dependencias)
* [Hands-on](#hands-on)
  * [Utilizando Component como Tag](#utilizando-component-como-tag)
  * [Criando Module de Login](#criando-module-de-login)
  * [Criando Component de Login](#criando-component-de-login)
  * [Criando Service de Login](#criando-service-de-login)
  * [Adicionando Rota de Login](#adicionando-rota-de-login)
  * [Adicionando Login](#adicionando-login)
  * [Criando Interceptor de Token](#criadno-interceptor-de-token)
  * [Criando Interceptor de Erros](#criando-interceptor-de-erros)
  * [Adicionando Loading](#adicionando-loading)


Conceitos
=========

[Componentes Angular Material](https://material.angular.io/components)

Vamos criar um Painel Expansivo para os filtros, e sua listagem também será comporta com o painel:
http://storage1.static.itmages.com/i/18/0108/h_1515441375_3008489_e99c436cdd.png

e nossa listagem quando filtrarmos ficará desta forma com painel expansivo:
http://storage4.static.itmages.com/i/18/0108/h_1515441415_6753914_d4eceb5926.png

Interação com Componentes
-------------------------

``` typescript
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-item-presenca',
  templateUrl: './item-presenca.component.html',
  styleUrls: ['./item-presenca.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItemPresencaComponent implements OnInit {

  @Input("dataInicio")
  private cursoInicio:Date;
  @Input("dataFim")
  private cursoFim:Date;
  @Input()
  private periodoInicial:Date;
  @Input()
  private periodoFinal:Date;
  @Input()
  private presencas:Array<any>;

}
```

``` typescript
<app-item-presenca
  [dataInicio]="disciplina.dataInicio" 
  [dataFim]="disciplina.dataTermino" 
  [periodoInicial]="form.value.dataInicio" 
  [periodoFinal]="form.value.dataFim" 
  [presencas]="item.presenca">
</app-item-presenca>
```

Auth Guard
----------

``` typescript
ng generate guard auth
```

``` typescript
import { AuthGuard } from './auth.guard';

canActivate: [AuthGuard],
canActivateChild: [AuthGuard]
```

``` typescript
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { AuthGuard } from './auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'main', 
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
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

Interceptors
------------

``` typescript
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }
  
  intercept(private _request: HttpRequest<any>, private _next: HttpHandler): Observable<HttpEvent<any>> {
    //do something
    return this._next.handle(this._request);
    }
  }
}
```

Hands-on
========

Utilizando Component como Tag
-----------------------------

##### No diretório src/app/main/relatorio/presenca
``` typescript
ng g component item-presenca
```

##### No arquivo src/app/main/relatorio/presenca/item-presenca/item-presenca.component.ts
``` typescript
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';

@Input("dataInicio")
private cursoInicio:Date;
@Input("dataFim")
private cursoFim:Date;
@Input()
private periodoInicial:Date;
@Input()
private periodoFinal:Date;
@Input()
private presencas:Array<Date>;

public presenca=[];

ngOnInit() {
  let inicio = moment(this.cursoInicio).isSameOrAfter(this.periodoInicial) ? this.cursoInicio : this.periodoInicial;   
  let fim = moment(this.cursoFim).isSameOrBefore(this.periodoFinal) ? this.cursoFim : this.periodoFinal;
  let dataCurso = moment(inicio);
  while(dataCurso.isSameOrBefore(fim)){
    if(dataCurso.weekday() > 0 && dataCurso.weekday() < 6){
      this.presenca.push({
        data: dataCurso.toDate(), 
        presente: this.presenca.includes(dataCurso.format("YYYY-MM-DD")) 
      });
    }
    dataCurso.add(1, 'days');
  } 
}
```

``` typescript
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-item-presenca',
  templateUrl: './item-presenca.component.html',
  styleUrls: ['./item-presenca.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItemPresencaComponent implements OnInit {

  @Input("dataInicio")
  private cursoInicio:Date;
  @Input("dataFim")
  private cursoFim:Date;
  @Input()
  private periodoInicial:Date;
  @Input()
  private periodoFinal:Date;
  @Input()
  private presencas:Array<any>;

  public presenca=[];

  constructor() { }

  ngOnInit() {
    let inicio = moment(this.cursoInicio).isSameOrAfter(this.periodoInicial) ? this.cursoInicio : this.periodoInicial;   
    let fim = moment(this.cursoFim).isSameOrBefore(this.periodoFinal) ? this.cursoFim : this.periodoFinal;
    let dataCurso = moment(inicio);
    while(dataCurso.isSameOrBefore(fim)){
      if(dataCurso.weekday() > 0 && dataCurso.weekday() < 6){
        this.presenca.push({
          data: dataCurso.toDate(), 
          presente: this.presencas.includes(dataCurso.format("YYYY-MM-DD")) 
        });
      }
      dataCurso.add(1, 'days');
    } 
  }

}
```

##### No arquivo src/app/main/relatorio/presenca/item-presenca/item-presenca.component.html
``` typescript
<mat-list>
  <h3 matSubheader>Presenças</h3>
  <ng-container *ngFor="let item of presenca">
    <mat-list-item>
      <mat-icon matListIcon>{{item.presente ? 'check' : 'remove'}}</mat-icon>
      <h3 matLine>{{item.presente ? 'Presente' : 'Ausente'}} </h3>
      <p matLine>
        <span>{{item.data | date:'dd/MM/yyyy'}} </span>
      </p>
    </mat-list-item>
    <mat-divider></mat-divider>
  </ng-container>
</mat-list>
```

##### No arquivo src/app/main/relatorio/presenca/presenca.component.html
``` typescript
<app-item-presenca></app-item-presenca>
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
      <app-item-presenca></app-item-presenca>
    </mat-expansion-panel>
  </mat-accordion>
</div>
```

##### No arquivo src/app/main/relatorio/presenca/presenca.component.ts
``` typescript
public disciplina: null;

this.disciplina = this.disciplinas.find((item) => { 
  return item.id = this.form.value.disciplina 
});
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
  public disciplina: null;
  
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
    this.disciplina = this.disciplinas.find((item) =>  item.id == this.form.value.disciplina);
    this._relatorioService.listarPresencaPorDisciplina(this.form.value).subscribe(suc=>{
      this.relatorio = suc;
    });
  }

}
```

##### No arquivo src/app/main/relatorio/presenca/presenca.component.html
``` typescript
<mat-expansion-panel *ngFor="let item of relatorio" (opened)="item.show = true" (closed)="item.show = false">

<app-item-presenca *ngIf="item.show" [dataInicio]="disciplina.dataInicio" [dataFim]="disciplina.dataTermino" [periodoInicial]="form.value.dataInicio" [periodoFinal]="form.value.dataFim" [presencas]="item.presenca"></app-item-presenca>
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
    <mat-expansion-panel *ngFor="let item of relatorio" (opened)="item.show = true" (closed)="item.show = false">
      <mat-expansion-panel-header>
        <mat-panel-title fxFlex="70">
          {{item.usuario.nome}}
        </mat-panel-title>
        <mat-panel-description>
          Frequência {{item.frequencia}}%
        </mat-panel-description>
      </mat-expansion-panel-header>
      <app-item-presenca
        [dataInicio]="disciplina.dataInicio" 
        [dataFim]="disciplina.dataTermino" 
        [periodoInicial]="form.value.dataInicio" 
        [periodoFinal]="form.value.dataFim" 
        [presencas]="item.presenca">
      </app-item-presenca>
    </mat-expansion-panel>
  </mat-accordion>
</div>
```

##### No arquivo src/app/main/relatorio/presenca/presenca.component.scss
``` typescript
.mat-card .mat-divider{
    position: unset;
    left: unset;
}
```

Criando Module de Login
-----------------------

##### No diretorio src/app
``` typescript
ng g module login
```

Criando Compoenent de Login
---------------------------

##### No diretorio src/app
``` typescript
ng g component login
```

Criando Service de Login
-----------------------
##### No diretorio src/app/login
``` typescript
ng g service login
```

Adicionando Rota de login
-------------------------

##### No arquivo src/app/login/login.routing.ts
``` typescript
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'login', 
        component: LoginComponent,
      }
    ])
  ]
})
export class LoginRouting { }
```

##### No arquivo src/app/login/login.module.ts
``` typescript
import { RouterModule } from '@angular/router';
import { LoginRouting } from './login.routing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
```

``` typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { LoginRouting } from './login.routing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LoginRouting,
    HttpClientModule
  ],
  providers: [
    LoginService,
    HttpClient
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
```

##### No arquivo src/app/app.module.ts
``` typescript
import { RouterModule } from '@angular/router';
import { MainModule } from './main/main.module';
import { AppRoutingModule } from './app.routing';
import { LoginModule } from './login/login.module';
```

``` typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';
import { MainModule } from './main/main.module';
import { AppRoutingModule } from './app.routing';
import { LoginModule } from './login/login.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    MainModule,
    LoginModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

##### No arquivo src/app/app.routing.ts
``` typescript
{ path: 'main', redirectTo: '/main', pathMatch: 'full' },
{ path: '**', redirectTo: '/login', pathMatch: 'full' }
```

``` typescript
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'main', redirectTo: '/main', pathMatch: 'full' },
      { path: '**', redirectTo: '/login', pathMatch: 'full' }
    ], {useHash:true})
  ]
})
export class AppRoutingModule { }
```

Adicionando Login
-----------------

##### No arquivo src/app/login/login.service.ts
``` typescript
import { Injectable } from '@angular/core';
import { environment }  from '../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Promise } from 'q';
import { HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoginService {

  private urlLogin = environment.url+"/oauth/token";

  constructor(private _httpCliente: HttpClient, private _router:Router) { }

  public login(dados) {
    const accessData = new HttpParams()
                          .set('grant_type', 'password')
                          .append('username', dados.usuario)
                          .append('password', dados.senha);
    const access = btoa('angular:alunos');
    const headerss = new HttpHeaders().set('Authorization', 'Basic ' + access)
                                      .append('Content-Type', 'application/x-www-form-urlencoded');
    return this._httpCliente.post(this.urlLogin,
                                  accessData.toString(),
                                 {headers: headerss}
                                );
 }

  public deslogar(){
    sessionStorage.removeItem("access");
    this._router.navigate(["/login"]);
  }

}
```

##### No arquivo src/app/login/login.component.ts
``` typescript
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})

public form:FormGroup;
public login:boolean = false;
public erro;

constructor(private _formBuilder:FormBuilder, private _loginService: LoginService, private _router: Router) {
  this.form  = _formBuilder.group({
    "usuario": [null, Validators.compose([Validators.required, Validators.email])],
    "senha"  : [null, Validators.required]
  });
  }

  ngOnInit() {
  this.erro = null;
  this.login = false;
}

realizarLogin(){
  this.login = true;
  this._loginService.login(this.form.value).subscribe(
    suc=>{
      sessionStorage.setItem("access", JSON.stringify(suc));
      this._router.navigate(["/main"]);
      this.login = false;
    },
    err=>{
      this.login = false;
      this.erro = err;
    }
  );
}
```

``` typescript
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  public form:FormGroup;
  public login:boolean = false;
  public erro;

  constructor(private _formBuilder:FormBuilder, private _loginService: LoginService, private _router: Router) {
    this.form  = _formBuilder.group({
      "usuario": [null, Validators.compose([Validators.required, Validators.email])],
      "senha"  : [null, Validators.required]
    });
   }

   ngOnInit() {
    this.erro = null;
    this.login = false;
  }
  
  realizarLogin(){
    this.login = true;
    this._loginService.login(this.form.value).subscribe(
      suc=>{
        sessionStorage.setItem("access", JSON.stringify(suc));
        this._router.navigate(["/main"]);
        this.login = false;
      },
      err=>{
        this.login = false;
        this.erro = err;
      }
    );
  }

}
```

##### No arquivo src/app/login/login.module.ts
``` typescript
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { MatCardModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
```

``` typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRouting } from './login.routing';
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { MatCardModule, MatInputModule, MatButtonModule, MatProgressBarModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LoginRouting,
    HttpClientModule,
    FlexLayoutModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    HttpClient, 
    LoginService, 
    FormBuilder 
  ]
})
export class LoginModule { }
```

##### No arquivo src/app/login/login.component.html
``` typescript
<div fxFlexFill fxLayout="column" fxLayoutAlign="center"> 
  <div fxLayout="row" fxLayoutWrap fxLayoutAlign="center" class="overflowScroll"> 
      <div fxFlex="500px" fxFlex.xs="90">
        <mat-card class="mat-elevation-z7">
            <mat-card-header fxLayoutAlign="center">
              <mat-card-title> <img src="./assets/img/logo.png"/> </mat-card-title>
              <mat-card-subtitle fxLayoutAlign="center">Autenticação Necessária</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <form fxLayout="column" [formGroup]="form">
                <mat-form-field>
                    <input matInput formControlName="usuario" placeholder="Usuário" value="">
                    <mat-error *ngIf="form.controls['usuario'].hasError('required')">
                        Campo obrigatório
                    </mat-error>
                    <mat-error *ngIf="!form.controls['usuario'].hasError('required') && form.controls['usuario'].hasError('email')">
                        E-mail Inválido
                    </mat-error>
                </mat-form-field>
                <mat-form-field>
                    <input matInput formControlName="senha" placeholder="Senha" value="" type="password">
                    <mat-error *ngIf="form.controls['senha'].hasError('required')">
                        Campo obrigatório
                    </mat-error>
                </mat-form-field>
                <br/>
                <button mat-raised-button [disabled]="!form.valid" (click)="realizarLogin()" type="button" color="primary">Login</button>
              </form>
            </mat-card-content>
          </mat-card>
          <mat-progress-bar *ngIf="login" mode="indeterminate"> </mat-progress-bar>
      </div> 
  </div>
</div>
```

Adicionando Imagens
-------------------

##### No diretório src/assets/img
``` typescript
logo.png
```

##### No diretório src
``` typescript
favicon.ico
```

Adicionando Auth Guard
----------------------

##### No diretório src/app/main
``` typescript
ng generate guard auth
```

##### No arquivo src/app/main/main.module.ts
``` typescript
import { AuthGuard } from './auth.guard';

providers: [
  AuthGuard
]
```

``` typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';

import { MainRouting } from './main.routing';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatSidenavModule, MatCardModule, MatListModule, MatToolbarModule, MatButtonModule } from '@angular/material';
import { AuthGuard } from './auth.guard';

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
  declarations: [
    MainComponent
  ],
  providers: [
    AuthGuard
  ]
})
export class MainModule { }
```

##### No arquivo src/app/main/main.routing.ts
``` typescript
import { AuthGuard } from './auth.guard';

canActivate: [AuthGuard],
canActivateChild: [AuthGuard]
```

``` typescript
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { AuthGuard } from './auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'main', 
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
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

##### No arquivo src/app/main/auth.guard.ts
``` typescript
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';

export class AuthGuard implements CanActivate, CanActivateChild {

constructor(private _router:Router){ }

canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.validarAcesso();
}

canActivateChild(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
  return this.validarAcesso();
}

private validarAcesso() {
  let item = JSON.parse(sessionStorage.getItem("access"));
  let validacao = item && item.access_token != null;
  if(!validacao){
    this._router.navigate(["/login"]);
  }
  return validacao;
}
```

``` typescript
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private _router:Router){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
      return this.validarAcesso();
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean>|Promise<boolean>|boolean {
    return this.validarAcesso();
  }

  private validarAcesso() {
    let item = JSON.parse(sessionStorage.getItem("access"));
    let validacao = item && item.access_token != null;
    if(!validacao){
      this._router.navigate(["/login"]);
    }
    return validacao;
  }

}
```

##### No arquivo src/app/login/login.component.ts
``` typescript
ngOnInit() {
  sessionStorage.clear();
  this.erro = null;
  this.login = false;
}
```

``` typescript
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  public form:FormGroup;
  public login:boolean = false;
  public erro;

  constructor(private _formBuilder:FormBuilder, private _loginService: LoginService, private _router: Router) {
    this.form  = _formBuilder.group({
      "usuario": [null, Validators.compose([Validators.required, Validators.email])],
      "senha"  : [null, Validators.required]
    });
   }

   ngOnInit() {
    sessionStorage.clear();
    this.erro = null;
    this.login = false;
  }
  
  realizarLogin(){
    this.login = true;
    this._loginService.login(this.form.value).subscribe(
      suc=>{
        sessionStorage.setItem("access", JSON.stringify(suc));
        this._router.navigate(["/main"]);
        this.login = false;
      },
      err=>{
        this.login = false;
        this.erro = err;
      }
    );
  }

}
```

Criando Interceptor de Token
----------------------------

##### No arquivo src/app/main/interceptors/auth.interceptor.ts
``` typescript
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let item = JSON.parse(sessionStorage.getItem("access"));
    let validacao = item && item.access_token != null;
    if(validacao){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${item.token_access}`
        }
      });
      return next.handle(request);
    }
  }
}
```

##### No arquivo src/app/main/relatorio/relatorio.module.ts
``` typescript
import { AuthInterceptor } from '../interceptors/auth.interceptor';

{
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}
```

``` typescript
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
```

##### No arquivo src/app/main/usuario/usuario.module.ts
``` typescript
import { AuthInterceptor } from '../interceptors/auth.interceptor';

{
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}
```

``` typescript
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
```

##### No arquivo src/app/main/disciplina/disciplina.module.ts
``` typescript
import { AuthInterceptor } from '../interceptors/auth.interceptor';

{
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}
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
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DisciplinaService } from '../services/disciplina.service';
import { ProfessorService } from './professor.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProfessorComponent } from './professor/professor.component';
import { QrcodeComponent } from './qrcode/qrcode.component';
import { AuthInterceptor } from '../interceptors/auth.interceptor';

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
```

Criando Interceptor de Erros
----------------------------

Criando Module de Erros
-----------------------

##### No diretorio src/app
``` typescript
ng g module requestError
```

Criando Compoenent de Erros
---------------------------

##### No diretorio src/app
``` typescript
ng g component requestError
```

Criando Component de Erros
---------------------------

##### No arquivo src/app/request-error/request-error.interceptor.ts
``` typescript
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { RequestErrorComponent } from '../request-error/request-error.component';
import { MatDialog } from '@angular/material';

@Injectable()
export class RequestErrorInterceptor implements HttpInterceptor {

  constructor(private dialog:MatDialog) { }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(request).do((event: HttpEvent<any>) => {}, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        this.openDialog({});
        if (err.status === 401) {
          this.openDialog({});
        }
      }
    });
  }

  private openDialog(info){
    this.dialog.open(RequestErrorComponent, {
      data: info
    });
  }

}
```

##### No arquivo src/app/request-error/request-error.component.ts
``` typescript
import { MAT_DIALOG_DATA } from '@angular/material';

constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
```

``` typescript
import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-request-error',
  templateUrl: './request-error.component.html',
  styleUrls: ['./request-error.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RequestErrorComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

}
```

##### No arquivo src/app/request-error/request-error.module.ts
``` typescript
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
```

##### No arquivo src/app/main/relatorio/relatorio.module.ts
``` typescript
import { RequestErrorModule } from '../../request-error/request-error.module';
```

``` typescript
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
```

##### No arquivo src/app/main/usuario/usuario.module.ts
``` typescript
import { RequestErrorModule } from '../../request-error/request-error.module';
```

``` typescript
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
```

##### No arquivo src/app/main/disciplina/disciplina.module.ts
``` typescript
import { RequestErrorModule } from '../../request-error/request-error.module';
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
```

##### No arquivo src/app/request-error/request-error.component.html
``` typescript
<h2 mat-dialog-title>Ops, ocorreu um erro</h2>
<mat-dialog-content> <b>{{data.code}}</b> - {{data.message}}</mat-dialog-content>
```

##### No arquivo src/app/request-error/request-error.interceptor.ts
``` typescript
intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
return next.handle(request).do((event: HttpEvent<any>) => {}, (err: any) => {
  if (err instanceof HttpErrorResponse) {
    if (err.status === 401) {
      this.openDialog({code:401, message:"Sessão expirada"});
      this._router.navigate(["/login"]);
    }
    this.openDialog({code:err.status, message:err.message})
  }else{
    this.openDialog({code:"Indisponível", message:"Não foi possível validar a causa do erro"})
  }
  });
}

private openDialog(info){
  this.dialog.open(RequestErrorComponent, {
  data: info
});
}
```

``` typescript
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { RequestErrorComponent } from './request-error.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Injectable()
export class RequestErrorInterceptor implements HttpInterceptor {

  constructor(private dialog:MatDialog, private _router:Router) { }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(request).do((event: HttpEvent<any>) => {}, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.openDialog({code:401, message:"Sessão expirada"});
          this._router.navigate(["/login"]);
        }
        this.openDialog({code:err.status, message:err.message})
      }else{
        this.openDialog({code:"Indisponível", message:"Não foi possível validar a causa do erro"})
      }
    });
  }

  private openDialog(info){
    this.dialog.open(RequestErrorComponent, {
      data: info
    });
  }

}
```

Adicionando Loading
-------------------

##### No diretório src/app/main/services
``` typescript
ng g service loading
```

##### No diretório src/app/main/main.module.ts
``` typescript
import { MatProgressBarModule } from '@angular/material';
import { LoadingService } from './services/loading.service';
```

``` typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';

import { MainRouting } from './main.routing';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatIconModule, MatSidenavModule, MatCardModule, MatListModule, MatToolbarModule, MatButtonModule, MatProgressBarModule } from '@angular/material';

import { AuthGuard } from './auth.guard';
import { LoadingService } from './services/loading.service';

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
    MatProgressBarModule
  ],
  declarations: [MainComponent],
  providers: [
    AuthGuard,
    LoadingService
  ]
})
export class MainModule { }
```

##### No arquivo src/app/main/services/loading.service.ts
``` typescript
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoadingService {

  public isLoading = false;
  private isLoadingChange = new Subject<Boolean>();

  constructor() {
    this.isLoadingChange.next(false);
  }
  
  public callNextStatus(status:boolean){
    this.isLoading = status;
    this.isLoadingChange.next(this.isLoading);
  }

  public getLoading(): Observable<any> {
    return this.isLoadingChange.asObservable();
  }

}
```

##### No arquivo src/app/main/main.component.html
``` typescript
<mat-progress-bar *ngIf="loading" color="warn" mode="indeterminate"></mat-progress-bar>
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
    <mat-progress-bar *ngIf="loading" color="warn" mode="indeterminate"></mat-progress-bar>
    <mat-card id="content">
        <router-outlet></router-outlet>
    </mat-card>
</mat-sidenav-container>
```

##### No arquivo src/app/main/main.component.ts
``` typescript
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit, OnDestroy {
 
  private isLoadingSubscription: Subscription;
  public loading: Boolean;

  constructor(private _loadingService:LoadingService) { }

  ngOnInit() {
    this.loading = this._loadingService.isLoading;
    this.isLoadingSubscription = this._loadingService.getLoading().subscribe(valor=>{      
       setTimeout(()=>{
        this.loading = valor;  
       },1);
    });
  }


  ngOnDestroy(){
    if(this.isLoadingSubscription) {
      this.isLoadingSubscription.unsubscribe();
    }
  }

}
```

##### No arquivo src/app/main/usuario/consulta/consulta.component.ts
``` typescript
private atualizarListaDeUsuarios(){
  this._loadingService.callNextStatus(true);
  this._usuarioService.listar().subscribe(suc => {
    this.noResults$ = suc.length == 0;
    this.dataSource = new MatTableDataSource(suc);
    this._loadingService.callNextStatus(false);
  }, err => {
    this._loadingService.callNextStatus(false);
  });
}
```

``` typescript
import { Component, OnInit } from '@angular/core';

import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { UsuarioService } from '../usuario.service';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit {

  public displayedColumns = ['nome', 'login', 'email', 'perfil', 'id'];
  public dataSource: MatTableDataSource<any>;

  public perfis = {
     "PROFESSOR": 'Professor',
     "ADMINISTRADOR": 'Administrador',
     "ALUNO": 'Aluno'
  };

  public noResults$ = false;
  constructor(
    private _usuarioService: UsuarioService, 
    private _loadingService: LoadingService,
    private _router: Router) { }
  
  ngOnInit() {
    this.atualizarListaDeUsuarios();
  }
 
  excluir(id){
    this._usuarioService.excluir(id).subscribe(suc=>{
      this.atualizarListaDeUsuarios();
  });
  }

  editar(id){
    this._router.navigate(["/main/usuario/editar", id]);
  }

  private atualizarListaDeUsuarios(){
    this._loadingService.callNextStatus(true);
    this._usuarioService.listar().subscribe(suc => {
      this.noResults$ = suc.length == 0;
      this.dataSource = new MatTableDataSource(suc);
      this._loadingService.callNextStatus(false);
    }, err => {
      this._loadingService.callNextStatus(false);
    });
  }

}
```

##### No arquivo src/app/main/disciplina/consulta/consulta.component.ts
``` typescript
private atualizarListaDeDisciplinas(){
  this._loadingService.callNextStatus(true);
  this._disciplinaService.listar().subscribe(suc => {
    this.noResults$ = suc.length == 0;
    this.dataSource = new MatTableDataSource(suc);
    this._loadingService.callNextStatus(false);
  }, err => {
    this._loadingService.callNextStatus(false);
  });
}
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
import { LoadingService } from '../../services/loading.service';
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit {

  public displayedColumns = ['segmento', 'descricao', 'dataInicio', 'dataTermino', 'professores', 'id'];
  public dataSource: MatTableDataSource<any>;

  public noResults$ = false;
  constructor(
    private _disciplinaService: DisciplinaService,
    private _loadingService: LoadingService, 
    private _router: Router, 
    public dialog: MatDialog) { }
  
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
    this._loadingService.callNextStatus(true);
    this._disciplinaService.listar().subscribe(suc => {
      this.noResults$ = suc.length == 0;
      this.dataSource = new MatTableDataSource(suc);
      this._loadingService.callNextStatus(false);
    }, err => {
      this._loadingService.callNextStatus(false);
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

##### No arquivo src/app/main/relatorio/presenca/presenca.component.ts
``` typescript
gerarRelatorio() {
  this._loadingService.callNextStatus(true);
  this.filtred = true;
  this.relatorio = null;
  this.disciplina = this.disciplinas.find((item) =>  item.id == this.form.value.disciplina);
  this._relatorioService.listarPresencaPorDisciplina(this.form.value).subscribe(suc=>{
    this.relatorio = suc;
    this._loadingService.callNextStatus(false);
  }, err => {
    this._loadingService.callNextStatus(false);
  });
}
```

``` typescript
import { Component, OnInit } from '@angular/core';
import { DisciplinaService } from '../../services/disciplina.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RelatorioService } from '../relatorio.service';
import { LoadingService } from '../../services/loading.service';

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
  public disciplina: null;
  
  constructor(
    private _disciplinaService: DisciplinaService,
    private _relatorioService: RelatorioService,
    private _loadingService: LoadingService,
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
    this._loadingService.callNextStatus(true);
    this.filtred = true;
    this.relatorio = null;
    this.disciplina = this.disciplinas.find((item) =>  item.id == this.form.value.disciplina);
    this._relatorioService.listarPresencaPorDisciplina(this.form.value).subscribe(suc=>{
      this.relatorio = suc;
      this._loadingService.callNextStatus(false);
    }, err => {
      this._loadingService.callNextStatus(false);
    });
  }

}
```