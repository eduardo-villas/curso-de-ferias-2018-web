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