
## **Curso de Férias 2018 - Desenvolvimento Frontend com Angular - Aula 07**

Sumário
=======

* [Conceitos](#conceitos)
  * [Injeção de Dependências](#injeção-de-dependências)
* [Hands-on](#hands-on)
  * [Alterando Formulário de Disciplina](#Alterando Formulário de Disciplina)
  
Conceitos
=========

[Componentes Angular Material](https://material.angular.io/components)

Injeção de Dependências
-----------------------
``` typescript
import { Component, Inject } from '@angular/core';
constructor(@Inject(ChatWidget) private chatWidget) { }
```

Hands-on
========

Alterando Formulário de Disciplina
----------------------------------
##### No arquivo src/app/main/disciplina/disciplina/disciplina.module.ts
``` typescript
carregarImagem(event){
  event.target.src = "https://d30y9cdsu7xlg0.cloudfront.net/png/20804-200.png";
}

abrirCalendario(item){
  item.open();
}

adicionarProfessor(){
  let listaProfessores = (<FormArray>this.form.get("professores"));
  if(!listaProfessores.value.includes(this.professorSelecionado.id)){
    listaProfessores.value.push(this.professorSelecionado.id);
  }
  this.professorSelecionado.selected = true;
  delete this.professorSelecionado;
}

carregarNomeProfessor(id){
  let item = this.professores.find(item=>{ return item.id == id});
  return item ? item.nome : "Professor indisponível";
}

removerProfessor(id){
  let listaProfessores = (<FormArray>this.form.get("professores"));
  let index = listaProfessores.value.findIndex(item=>{return item == id});
  if(index > -1){
    listaProfessores.value.splice(index,1);
  }
  let item = this.professores.find(item=>{ return item.id == id});
  item.selected = false;
}
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
  
  constructor(
    private formBuilder: FormBuilder, 
    private _disciplinaService: DisciplinaService, 
    private _professorService: ProfessorService, 
    private _router: Router, 
    private _activateRoute: ActivatedRoute
    ) {
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
        suc.professores.forEach(disciplina => {
          let item = this.professores.find(item=>{ return item.id == disciplina});
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
    let listaProfessores = (<FormArray>this.form.get("professores"));
    if(!listaProfessores.value.includes(this.professorSelecionado.id)){
      listaProfessores.value.push(this.professorSelecionado.id);
    }
    this.professorSelecionado.selected = true;
    delete this.professorSelecionado;
  }

  carregarNomeProfessor(id){
    let item = this.professores.find(item=>{ return item.id == id});
    return item ? item.nome : "Professor indisponível";
  }
  
  removerProfessor(id){
    let listaProfessores = (<FormArray>this.form.get("professores"));
    let index = listaProfessores.value.findIndex(item=>{return item == id});
    if(index > -1){
      listaProfessores.value.splice(index,1);
    }
    let item = this.professores.find(item=>{ return item.id == id});
    item.selected = false;
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
          <input matInput formControlName="urlLogo" placeholder="Url Logo" >
          <mat-error *ngIf="form.controls['urlLogo'].hasError('required')">
            Campo obrigatório
          </mat-error>
      </mat-form-field>
      <span fxFlex="5"></span>
      <img class="urlLogo" [src]="form.controls['urlLogo'].value" (error)="carregarImagem($event)"/>
    </div>
    <div fxFlex="100" fxLayout="row">
      <mat-form-field fxFlex="75"> 
        <mat-select [(ngModel)]="professorSelecionado" [ngModelOptions]="{standalone: true}" placeholder="Professores" >
            <mat-option *ngFor="let professor of professores" [value]="professor">
              {{ professor.nome }}
            </mat-option>
        </mat-select>
        <mat-hint>
          Necessário pelo menos 2 professores cadastrados
        </mat-hint>
      </mat-form-field>      
      <span fxFlex="5"></span>
      <button mat-raised-button  mat-icon-button color="primary" [disabled]="professorSelecionado == null" (click)="adicionarProfessor()">
          <mat-icon>add</mat-icon>
      </button>
    </div>
    <mat-list *ngIf="form.get('professores').value.length > 0">
      <h3 mat-subheader>Professores selecionados</h3>
      <ng-container *ngFor="let id of form.get('professores').value">
        <mat-list-item>
            <button mat-mini-fab type="button" color="warn" (click)="removerProfessor(id)">
                <mat-icon>delete</mat-icon>
            </button>
            <p fxFlexOffset="10px">
              {{carregarNomeProfessor(id)}}
            </p>
        </mat-list-item>
        <mat-divider></mat-divider>
      </ng-container>
    </mat-list>
    <br/>
    <div fxFlex="100" fxLayout="row" fxLayoutAlign="space-between">
        <button mat-raised-button color="primary"  [disabled]="!form.valid || form.get('professores').value.length < 2" (click)="salvar()">Salvar</button>
        <button mat-raised-button color="warn" routerLink="/main/disciplina/consulta">Cancelar</button>
    </div>
  </form>
</div>
```
