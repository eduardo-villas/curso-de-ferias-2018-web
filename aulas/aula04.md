
## **Curso de Férias 2018 - Desenvolvimento Frontend com Angular - Aula 04**

Sumário
=======

* [Conceitos](#conceitos)
  * [Binding](#binding)
  * [Validadores](#validadores)
  * [Mensagens de Erro](#mensagens-de-erro)
  * [Arrays](#arrays)
  * [Serviços](#serviços)
* [Hands-on](#hands-on)
  * [Adicionando Rota do Botão Cancelar](#adicionando-rota-do-botão-cancelar)
  * [Criando ComboBox de Perfis](#criando-combobox-de-perfis)
  * [Adicionando Validações](#adicionando-validações)
  * [Adicionando Mensagens de Erro](#adicionando-mensagens-de-erro)
  * [Validações Customizadas](#validações-customizadas)
  * [Criando Serviço de Usuário](#criando-serviço-de-usuário)
  * [Utilizando Serviço na Consulta de Usuário](#utilizando-serviço-na-consulta-de-usuário)
  
Conceitos
=========

[Componentes Angular Material](https://material.angular.io/components)

Binding
-------
``` typescript
<mat-form-field fxFlex="47"> 
    <mat-select formControlName="perfil" placeholder="Perfil">
        <mat-option *ngFor="let perfil of perfis" [value]="perfil.id">
          {{ perfil.descricao }}
        </mat-option>
    </mat-select>
</mat-form-field>
```

``` typescript
public perfis = [
    { id: "PROFESSOR", descricao: 'Professor' },
    { id: "ADMINISTRADOR", descricao: 'Administrador' },
    { id: "ALUNO", descricao: 'Aluno' },
  ];
```

Validadores
-----------
``` typescript
import {FormGroup} from '@angular/forms';

export class MeuValidator {

  public static validate(firstField, secondField) {
    // to do something
  }

}
```

Mensagens de Erro
-----------------
``` typescript
<mat-form-field fxFlex="100"> 
  <input matInput formControlName="nome" placeholder="Nome">
  <mat-error *ngIf="form.controls['nome'].hasError('required')">
      Campo obrigatório
  </mat-error>
</mat-form-field>
```

Arrays
------

``` typescript
private usuarios = [
    {id: 1, nome: 'José da Silva', login: "jose", email: 'jose@ponto.com.br', perfil:"ALUNO"},
    {id: 2, nome: 'Mariano das Neves', login: "mariano", email: 'marino@ponto.com.br', perfil:"ALUNO"},
    {id: 3, nome: 'Magyver da Silva', login: "magyver", email: 'magyver@ponto.com.br', perfil:"ALUNO"},
    {id: 4, nome: 'Irineu Nunes', login: "irineu", email: 'irineu@ponto.com.br', perfil:"ALUNO"},
    {id: 5, nome: 'Carlos Silva', login: "carlos1", email: 'carlos@ponto.com.br', perfil:"ALUNO"}
  ];

this.usuarios.forEach(usuario=>{
      maxIdentifier < usuario.id ? maxIdentifier = usuario.id : maxIdentifier = maxIdentifier;
    });

let index = this.usuarios.findIndex(item=> item.id == id);

this.usuarios.find(item=> item.id == id);

this.usuarios.splice(index, 1);
```

Serviços
--------

``` typescript
import { Injectable } from '@angular/core';

@Injectable()
export class UsuarioService {

  constructor() { }

}
```

Hands-on
=========

Adicionando Rota do Botão Cancelar
----------------------------------

##### No arquivo /src/app/main/usuario/formulario/formulario.component.html
``` typescript
<button mat-raised-button color="warn" routerLink="/main/usuario/consulta">Cancelar</button>
```

``` typescript
<form [formGroup]="form" fxLayout="column">
  <mat-form-field fxFlex="100"> 
    <input matInput formControlName="nome" placeholder="Nome">
  </mat-form-field>
  <mat-form-field fxFlex="100"> 
    <input matInput formControlName="email" placeholder="E-mail">
  </mat-form-field>
  <div fxFlex="100" fxLayout="row">
    <mat-form-field fxFlex="47"> 
      <input matInput formControlName="login" placeholder="Login">
    </mat-form-field>
    <span fxFlex="5"></span>
    <mat-form-field fxFlex="47"> 
        <mat-select formControlName="perfil" placeholder="Perfil">
            <mat-option *ngFor="let perfil of perfis" [value]="perfil.id">
              {{ perfil.descricao }}
            </mat-option>
        </mat-select>
    </mat-form-field>
  </div>
  <div fxFlex="100" fxLayout="row">
    <mat-form-field fxFlex="47"> 
      <input matInput formControlName="senha" placeholder="Senha" type="password">
    </mat-form-field>
    <span fxFlex="5"></span>
    <mat-form-field fxFlex="47"> 
      <input matInput formControlName="confirmacao" placeholder="Confirmação" type="password">
    </mat-form-field>
  </div>
  <div fxFlex="100" fxLayout="row" fxLayoutAlign="space-between">
      <button mat-raised-button color="primary" [disabled]="!form.valid">Salvar</button>
      <button mat-raised-button color="warn" routerLink="/main/usuario/consulta">Cancelar</button>
  </div>
</form>
```

Criando ComboBox de Perfis
--------------------------
##### No arquivo src/app/main/usuario/formulario/formulario.component.ts
``` typescript
  public perfis = [
    { id: "PROFESSOR", descricao: 'Professor' },
    { id: "ADMINISTRADOR", descricao: 'Administrador' },
    { id: "ALUNO", descricao: 'Aluno' },
  ];
```

``` typescript
import { Component, OnInit } from '@angular/core';

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

  constructor() {
  }
  
  ngOnInit() {
  }

}
```

##### No arquivo src/app/main/usuario/formulario/formulario.component.html
``` typescript
<mat-select formControlName="perfil" placeholder="Perfil">
    <mat-option *ngFor="let perfil of perfis" [value]="perfil.id">
      {{ perfil.descricao }}
    </mat-option>
</mat-select>
```

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
            <mat-option *ngFor="let perfil of perfis" [value]="perfil.id">
              {{ perfil.descricao }}
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

Adicionando Validações
----------------------

##### No arquivo src/app/main/main.module.ts
``` typescript
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
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
    FormsModule
  ],
  providers: [
    FormBuilder
  ],
  declarations: [MainComponent, ConsultaComponent, FormularioComponent]
})
export class MainModule { }
```

##### No arquivo src/app/main/usuario/formulario/formulario.component.ts
``` typescript
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

public form : FormGroup;
  
constructor(private formBuilder: FormBuilder) {
  this.form = formBuilder.group({
      id: [null],
      nome: [null, Validators.required],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      login: [null, Validators.required],
      perfil: [null, Validators.required],
      senha: [null, Validators.required],
      confirmacao: [null, Validators.required]
  })
}   
```

``` typescript
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  
  constructor(private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
        id: [null],
        nome: [null, Validators.required],
        email: [null, Validators.compose([Validators.required, Validators.email])],
        login: [null, Validators.required],
        perfil: [null, Validators.required],
        senha: [null, Validators.required],
        confirmacao: [null, Validators.required]
    })
   }
  
  ngOnInit() {
  }

}
```

##### No arquivo src/app/main/usuario/formulario/formulario.component.ts
``` typescript
[formGroup]="form"

formControlName="nome"
formControlName="email"
formControlName="login"
formControlName="perfil"
formControlName="senha"
formControlName="confirmacao"

[disabled]="!form.valid"
```

``` typescript
<form [formGroup]="form" fxLayout="column">
  <mat-form-field fxFlex="100"> 
    <input matInput formControlName="nome" placeholder="Nome">
  </mat-form-field>
  <mat-form-field fxFlex="100"> 
    <input matInput formControlName="email" placeholder="E-mail">
  </mat-form-field>
  <div fxFlex="100" fxLayout="row">
    <mat-form-field fxFlex="47"> 
      <input matInput formControlName="login" placeholder="Login">
    </mat-form-field>
    <span fxFlex="5"></span>
    <mat-form-field fxFlex="47"> 
        <mat-select formControlName="perfil" placeholder="Perfil">
            <mat-option *ngFor="let perfil of perfis" [value]="perfil.id">
              {{ perfil.descricao }}
            </mat-option>
        </mat-select>
    </mat-form-field>
  </div>
  <div fxFlex="100" fxLayout="row">
    <mat-form-field fxFlex="47"> 
      <input matInput formControlName="senha" placeholder="Senha" type="password">
    </mat-form-field>
    <span fxFlex="5"></span>
    <mat-form-field fxFlex="47"> 
      <input matInput formControlName="confirmacao" placeholder="Confirmação" type="password">
    </mat-form-field>
  </div>
  <div fxFlex="100" fxLayout="row" fxLayoutAlign="space-between">
      <button mat-raised-button color="primary" [disabled]="!form.valid">Salvar</button>
      <button mat-raised-button color="warn" routerLink="/main/usuario/consulta">Cancelar</button>
  </div>
</form>
```

Adicionando Mensagens de Erro
-----------------------------

##### No arquivo src/app/main/usuario/formulario/formulario.component.html
``` typescript
<mat-error *ngIf="form.controls['nome'].hasError('required')">
    Campo obrigatório
</mat-error>
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
    </mat-form-field>
  </div>
  <div fxFlex="100" fxLayout="row" fxLayoutAlign="space-between">
      <button mat-raised-button color="primary" [disabled]="!form.valid">Salvar</button>
      <button mat-raised-button color="warn" routerLink="/main/usuario/consulta">Cancelar</button>
  </div>
</form>
```

Validações Customizadas
-----------------------

##### No arquivo src/app/validators/equals.password.validator.ts
``` typescript
import {FormGroup} from '@angular/forms';

export class EqualsPasswordValidator {

  public static validate(firstField, secondField) {
    return (formGroup: FormGroup) => {       
    (formGroup.controls && formGroup.controls[firstField].value == formGroup.controls[secondField].value) 
        ? formGroup.controls[secondField].setErrors(formGroup.controls[secondField].getError('required') ? {required: {valid:false}} : null) :
        formGroup.controls[secondField].setErrors({passwordEquals: {valid: false}});
    }
  }

}
```    

##### No arquivo src/app/main/usuario/formulario/formulario.component.ts
``` typescript
import { EqualsPasswordValidator } from '../../../validators/equals.password.validator';

{validator: EqualsPasswordValidator.validate("senha", "confirmacao")}
```    
    
``` typescript
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EqualsPasswordValidator } from '../../../validators/equals.password.validator';

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
  
  constructor(private formBuilder: FormBuilder) {
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
  }

}
```

##### No arquivo src/app/main/usuario/formulario/formulario.component.html
``` typescript
<mat-error *ngIf="form.controls['confirmacao'].hasError('passwordEquals') && !form.controls['confirmacao'].hasError('required')">
    Campo Confirmação não é igual ao campo Senha
</mat-error>
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
      <button mat-raised-button color="primary" [disabled]="!form.valid">Salvar</button>
      <button mat-raised-button color="warn" routerLink="/main/usuario/consulta">Cancelar</button>
  </div>
</form>
```

Criando Serviço de Usuário
--------------------------

##### No diretório src/app/main/usuario
``` typescript
ng g service usuario
```

##### No arquivo src/app/main/usuario/usuario.service.ts
``` typescript
import { Injectable } from '@angular/core';

@Injectable()
export class UsuarioService {

  private usuarios = [
    {id: 1, nome: 'José da Silva', login: "jose", email: 'jose@ponto.com.br', perfil:"ALUNO"},
    {id: 2, nome: 'Mariano das Neves', login: "mariano", email: 'marino@ponto.com.br', perfil:"ALUNO"},
    {id: 3, nome: 'Magyver da Silva', login: "magyver", email: 'magyver@ponto.com.br', perfil:"ALUNO"},
    {id: 4, nome: 'Irineu Nunes', login: "irineu", email: 'irineu@ponto.com.br', perfil:"ALUNO"},
    {id: 5, nome: 'Carlos Silva', login: "carlos1", email: 'carlos@ponto.com.br', perfil:"ALUNO"}
  ];

  constructor() { }
  
  adicionar(usuario){
    let maxIdentifier = 0;
    this.usuarios.forEach(usuario=>{
      maxIdentifier < usuario.id ? maxIdentifier = usuario.id : maxIdentifier = maxIdentifier;
    });
    usuario.identifier = maxIdentifier + 1;
    this.usuarios.push(usuario);
  }

  excluir(id){
    let index = this.usuarios.findIndex(item=> item.id == id);
    if(index > -1){
      this.usuarios.splice(index, 1);
    }
  }

  editar(usuario){
    let index = this.usuarios.findIndex(item=> item.id == usuario.id);
    if(index > -1){
      this.usuarios[index] = usuario;
    }
  }

  listar(){
    return this.usuarios;
  }

  carregar(id){
    return this.usuarios.find(item=> item.id == id);
  }

}
```

##### No arquivo src/app/main/main.module.ts
``` typescript
import { UsuarioService } from './usuario/usuario.service';
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
    FormsModule
  ],
  providers: [
    FormBuilder,
    UsuarioService
  ],
  declarations: [MainComponent, ConsultaComponent, FormularioComponent]
})
export class MainModule { }
```

Utilizando Serviço na Consulta de Usuário
-----------------------------------------

##### No arquivo src/app/main/usuario/consulta.component.ts

``` typescript
import { MatTableDataSource } from '@angular/material';

constructor(private _usuarioService: UsuarioService) { 
  let listaUsuarios = _usuarioService.listar();
  this.dataSource = new MatTableDataSource<any>(listaUsuarios);
}
```

``` typescript
import { Component, OnInit } from '@angular/core';

import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { UsuarioService } from '../usuario.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit {

  public displayedColumns = ['nome', 'login', 'email', 'perfil', 'id'];
  public dataSource = null;

  constructor(private _usuarioService: UsuarioService) { 
    let listaUsuarios = _usuarioService.listar();
    this.dataSource = new MatTableDataSource<any>(listaUsuarios);
  }

  ngOnInit() {
  }

}
```