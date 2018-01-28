
## **Curso de Férias 2018 - Desenvolvimento Frontend com Angular - Aula 05**

Sumário
=======

* [Conceitos](#conceitos)
  * [Navegação com Rotas](#navegação-com-rotas)
  * [Observable](#observable)
* [Hands-on](#hands-on)
  * [Utilizando Serviço na Consulta de Usuário](#utilizando-serviço-na-consulta-de-usuário)
  * [Adicionando Rota de Edição de Usuário](#adicionando-rota-de-edição-de-usuário)
  * [Utilizando Serviço no Formulário de Usuário](#utilizando-serviço-no-formulário-de-usuário)
  * [Consumindo APIs REST](#consumindo-apis-rest)
  
Conceitos
=========

[Componentes Angular Material](https://material.angular.io/components)

Navegação com Rotas
-------------------

``` typescript
this._router.navigate(['/main/usuario/consulta']);
this._router.navigate(["/main/usuario/editar", id]);

this._activateRoute.params.subscribe(params=>{
      this.id = params['id'];
    });
```

Observable
-------------------

``` typescript
this._usuarioService.editar(this.form.value).subscribe(suc=>{
  // to do something
});
```

Hands-on
========

Utilizando Serviço na Consulta de Usuário
-----------------------------------------

##### No arquivo src/app/main/usuario/consulta/consulta.componente.ts
``` typescript
import { UsuarioService } from '../usuario.service';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

public dataSource: MatTableDataSource<any>;

  public perfis = {
     "PROFESSOR": 'Professor',
     "ADMINISTRADOR": 'Administrador',
     "ALUNO": 'Aluno'
  };

  public noResults$ = false;
  constructor(private _usuarioService: UsuarioService, private _router: Router) { }
  
  ngOnInit() {
    this.atualizarListaDeUsuarios();
  }
 
  excluir(id){
    this._usuarioService.excluir(id);
    this.atualizarListaDeUsuarios();
  }

  editar(id){
    this._router.navigate(["/main/usuario/editar", id]);
  }

  private atualizarListaDeUsuarios(){
    var items = this._usuarioService.listar();
    this.noResults$ = items.length == 0;
    this.dataSource = new MatTableDataSource(items);
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
  constructor(private _usuarioService: UsuarioService, private _router: Router) { }
  
  ngOnInit() {
    this.atualizarListaDeUsuarios();
  }
 
  excluir(id){
    this._usuarioService.excluir(id);
    this.atualizarListaDeUsuarios();
  }

  editar(id){
    this._router.navigate(["/main/usuario/editar", id]);
  }

  private atualizarListaDeUsuarios(){
    var items = this._usuarioService.listar();
    this.noResults$ = items.length == 0;
    this.dataSource = new MatTableDataSource(items);
  }

}
```

##### No arquivo src/app/main/usuario/consulta/consulta.componente.html
``` typescript
(click)="editar(element.id)"
(click)="excluir(element.id)"

<div *ngIf="noResults$" class="noResult">Nenhum resultado</div>
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
          <button mat-icon-button color="primary" (click)="editar(element.id)"mdTooltip="Editar">
            <mat-icon class="mat-24" aria-label="Editar">edit</mat-icon>
          </button>
          <button mat-icon-button color="danger" (click)="excluir(element.id)" mdTooltip="Excluir">
              <mat-icon class="mat-24" aria-label="Excluir">delete</mat-icon>
          </button>
      </mat-cell>
    </ng-container>
    <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
    <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
  </mat-table>
  <div *ngIf="noResults$" class="noResult">Nenhum resultado</div>
  <button mat-fab color="primary" routerLink="/main/usuario/adicionar">
    <mat-icon class="mat-24" aria-label="Adicionar">add</mat-icon>
  </button> 
</div>
```

##### No arquivo src/app/main/usuario/consulta/consulta.componente.scss
``` typescript
.noResult {
    padding: 20px;
    text-align: center;
    font-size: 12px;
}
```

``` typescript
.mat-fab{
    position: fixed;
    right: 20px;
    bottom: 20px;
}
.noResult {
    padding: 20px;
    text-align: center;
    font-size: 12px;
}
```

Adicionando Rota de Edição de Usuário
-------------------------------------

##### No arquivo src/app/main/main.routing.ts
``` typescript
{
  path: 'usuario/editar/:id',
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
          },
          {
            path: 'usuario/editar/:id',
            component: FormularioComponent
          }
        ]
      }
    ])
  ]
})
export class MainRouting { }
```

Utilizando Serviço no Formulário de Usuário
-------------------------------------------

##### No arquivo src/app/main/usuario/formulario/formulario.componente.ts
``` typescript
import { UsuarioService } from '../usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
public perfis = [
    { id: "PROFESSOR", descricao: 'Professor' },
    { id: "ADMINISTRADOR", descricao: 'Administrador' },
    { id: "ALUNO", descricao: 'Aluno' },
  ];
public id;

constructor(private formBuilder: FormBuilder, private _usuarioService: UsuarioService, private _router: Router, private _activateRoute: ActivatedRoute) 

ngOnInit() {
  this.id = null;    
  this._activateRoute.params.subscribe(params=>{
    this.id = params['id'];
  })
  if(this.id){
    var item = <any> this._usuarioService.carregar(this.id);
    item.senha = null;
    item.confirmacao = null;
    this.form.setValue(item);
    this.form.get("senha").setValidators(null);
    this.form.get("confirmacao").setValidators(null);
  }
}

salvar() {
  if(this.form.valid){
    if(this.id){
      this._usuarioService.editar(this.form.value);
    } else {
      this._usuarioService.adicionar(this.form.value);
    }
    this.form.reset();
    this._router.navigate(['/main/usuario/consulta']);
  }
}
```

``` typescript
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EqualsPasswordValidator } from '../../../validators/equals.password.validator';
import { UsuarioService } from '../usuario.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  public perfis = [
    { id: "PROFESSOR", descricao: 'Professor' },
    { id: "ADMINISTRADOR", descricao: 'Administrador' },
    { id: "ALUNO", descricao: 'Aluno' },
  ];

  public form : FormGroup;
  public id;
  
  constructor(private formBuilder: FormBuilder, private _usuarioService: UsuarioService, private _router: Router, private _activateRoute: ActivatedRoute) {
    this.form = formBuilder.group({
        id: [null],
        nome: [null, Validators.required],
        email: [null, Validators.compose([Validators.required, Validators.email])],
        login: [null, Validators.required],
        perfil: [null, Validators.required],
        senha: [null, Validators.required],
        confirmacao: [null, Validators.required]
    }, {validator: EqualsPasswordValidator.validate("senha", "confirmacao")})
   }
  
  ngOnInit() {
    this.id = null;    
    this._activateRoute.params.subscribe(params=>{
      this.id = params['id'];
    });
    if(this.id){
      var item = <any> this._usuarioService.carregar(this.id);
      item.senha = null;
      item.confirmacao = null;
      this.form.setValue(item);
      this.form.get("senha").setValidators(null);
      this.form.get("confirmacao").setValidators(null);
    }
  }

  salvar() {
    if(this.form.valid){
      if(this.id){
        this._usuarioService.editar(this.form.value);
      } else {
        this._usuarioService.adicionar(this.form.value);
      }
      this.form.reset();
      this._router.navigate(['/main/usuario/consulta']);
    }
  }

}
```

##### No arquivo src/app/main/usuario/formulario/formulario.componente.html
``` typescript
(click)="salvar()"
```

``` typescript
<form [formGroup]="form" fxLayout="column">
  <mat-form-field fxFlex="100"> 
    <input matInput formControlName="nome" placeholder="Nome">
    <mat-error *ngIf="form.controls['nome'].hasError('required')">
        Campo obrigatório
    </mat-error>
  </mat-form-field>
  <mat-form-field fxFlex="100"> 
    <input matInput formControlName="email" placeholder="E-mail">
    <mat-error *ngIf="form.controls['email'].hasError('required')">
        Campo obrigatório
    </mat-error>
    <mat-error *ngIf="form.controls['email'].hasError('email') && !form.controls['email'].hasError('required')">
        E-mail inválido
    </mat-error>
  </mat-form-field>
  <div fxFlex="100" fxLayout="row">
    <mat-form-field fxFlex="47"> 
      <input matInput formControlName="login" placeholder="Login">
      <mat-error *ngIf="form.controls['login'].hasError('required')">
          Campo obrigatório
      </mat-error>
    </mat-form-field>
    <span fxFlex="5"></span>
    <mat-form-field fxFlex="47"> 
        <mat-select formControlName="perfil" placeholder="Perfil">
            <mat-option *ngFor="let perfil of perfis" [value]="perfil.id">
              {{ perfil.descricao }}
            </mat-option>
        </mat-select>
        <mat-error *ngIf="form.controls['perfil'].hasError('required')">
          Campo obrigatório
        </mat-error>
    </mat-form-field>
  </div>
  <div fxFlex="100" fxLayout="row">
    <mat-form-field fxFlex="47"> 
      <input matInput formControlName="senha" placeholder="Senha" type="password">
      <mat-error *ngIf="form.controls['senha'].hasError('required')">
          Campo obrigatório
      </mat-error>
    </mat-form-field>
    <span fxFlex="5"></span>
    <mat-form-field fxFlex="47"> 
      <input matInput formControlName="confirmacao" placeholder="Confirmação" type="password">
      <mat-error *ngIf="form.controls['confirmacao'].hasError('required')">
          Campo obrigatório
      </mat-error>
      <mat-error *ngIf="form.controls['confirmacao'].hasError('passwordEquals') && !form.controls['confirmacao'].hasError('required')">
          Campo Confirmação não é igual ao campo Senha
      </mat-error>
    </mat-form-field>
  </div>
  <div fxFlex="100" fxLayout="row" fxLayoutAlign="space-between">
      <button mat-raised-button color="primary" [disabled]="!form.valid" (click)="salvar()">Salvar</button>
      <button mat-raised-button color="warn" routerLink="/main/usuario/consulta">Cancelar</button>
  </div>
</form>
```

Consumindo APIs REST
--------------------

##### No arquivo src/app/environments/environment.ts
``` typescript 
export const environment = {
  production: false,
  url: 'http://curso-ferias-2018.herokuapp.com'
};
```

##### No arquivo src/app/main/main.module.ts
``` typescript
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
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

import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { UsuarioService } from './usuario/usuario.service';

import { HttpClientModule, HttpClient } from '@angular/common/http';

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
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    FormBuilder,
    UsuarioService,
    HttpClient
  ],
  declarations: [MainComponent, ConsultaComponent, FormularioComponent]
})
export class MainModule { }
```

##### No arquivo src/app/main/usuario/usuario.service.ts
``` typescript
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

private _urlUsuario = environment.url+"/api/v1/usuarios";

return this._httpClient.post(this._urlUsuario, usuario, {responseType: 'text'});
return this._httpClient.delete(this._urlUsuario+"/"+id, {responseType: 'text'});
return this._httpClient.put(this._urlUsuario+"/"+usuario.id, usuario, {responseType: 'text'});
return this._httpClient.get<Array<any>>(this._urlUsuario);
return this._httpClient.get<any>(this._urlUsuario+"/"+id);
```

``` typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class UsuarioService {
s
  private _urlUsuario = environment.url+"/api/v1/usuarios";

  constructor(private _httpClient: HttpClient) { }
  
  adicionar(usuario){
    return this._httpClient.post(this._urlUsuario, usuario, {responseType: 'text'});
  }

  excluir(id){
    return this._httpClient.delete(this._urlUsuario+"/"+id, {responseType: 'text'});
  }

  editar(usuario){
    return this._httpClient.put(this._urlUsuario+"/"+usuario.id, usuario, {responseType: 'text'});
  }

  listar(){
    return this._httpClient.get<Array<any>>(this._urlUsuario);
  }

  carregar(id){
    return this._httpClient.get<any>(this._urlUsuario+"/"+id);
  }

}
```

##### No arquivo src/app/main/usuario/consulta/consulta.component.ts
``` typescript
excluir(id){
  this._usuarioService.excluir(id).subscribe(suc=>{
    this.atualizarListaDeUsuarios();
  });
}

editar(id){
  this._router.navigate(["/main/usuario/editar", id]);
}

private atualizarListaDeUsuarios(){
  this._usuarioService.listar().subscribe(suc => {
    this.noResults$ = suc.length == 0;
    this.dataSource = new MatTableDataSource(suc);
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
  constructor(private _usuarioService: UsuarioService, private _router: Router) { }
  
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
    this._usuarioService.listar().subscribe(suc => {
      this.noResults$ = suc.length == 0;
      this.dataSource = new MatTableDataSource(suc);
    });
  }

}
```

##### No arquivo src/app/main/usuario/formulario/formulario.component.ts
``` typescript
ngOnInit() {
  this.id = null;    
  this._activateRoute.params.subscribe(params=>{
    this.id = params['id'];
  });
  if(this.id){
    this._usuarioService.carregar(this.id).subscribe(suc=>{
      var item = Object(suc);
      delete item.urlFoto;
      item.senha = null;
      item.confirmacao = null;
      this.form.get("senha").setValidators(null);
      this.form.get("confirmacao").setValidators(null);
      this.form.setValue(item);
    });
  }
}

salvar() {
  if(this.form.valid){
    if(this.id){
      this._usuarioService.editar(this.form.value).subscribe(suc=>{
        this.consultar();
      });
    } else {
      this._usuarioService.adicionar(this.form.value).subscribe(suc=>{
        this.consultar();
      });
    }
  }
}

consultar() {
  this.form.reset();
  this._router.navigate(['/main/usuario/consulta']);
} 
```

``` typescript
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EqualsPasswordValidator } from '../../../validators/equals.password.validator';
import { UsuarioService } from '../usuario.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  public perfis = [
    { id: "PROFESSOR", descricao: 'Professor' },
    { id: "ADMINISTRADOR", descricao: 'Administrador' },
    { id: "ALUNO", descricao: 'Aluno' },
  ];

  public form : FormGroup;
  public id;
  
  constructor(private formBuilder: FormBuilder, private _usuarioService: UsuarioService, private _router: Router, private _activateRoute: ActivatedRoute) {
    this.form = formBuilder.group({
        id: [null],
        nome: [null, Validators.required],
        email: [null, Validators.compose([Validators.required, Validators.email])],
        login: [null, Validators.required],
        perfil: [null, Validators.required],
        senha: [null, Validators.required],
        confirmacao: [null, Validators.required]
    }, {validator: EqualsPasswordValidator.validate("senha", "confirmacao")})
   }
  
  ngOnInit() {
    this.id = null;    
    this._activateRoute.params.subscribe(params=>{
      this.id = params['id'];
    });
    if(this.id){
      this._usuarioService.carregar(this.id).subscribe(suc=>{
        var item = Object(suc);
        delete item.urlFoto;
        item.senha = null;
        item.confirmacao = null;
        this.form.get("senha").setValidators(null);
        this.form.get("confirmacao").setValidators(null);
        this.form.setValue(item);
      });
    }
  }

  salvar() {
    if(this.form.valid){
      if(this.id){
        this._usuarioService.editar(this.form.value).subscribe(suc=>{
          this.consultar();
        });
      } else {
        this._usuarioService.adicionar(this.form.value).subscribe(suc=>{
          this.consultar();
        });
      }
    }
  }

  consultar() {
    this.form.reset();
    this._router.navigate(['/main/usuario/consulta']);
  } 

}
```
