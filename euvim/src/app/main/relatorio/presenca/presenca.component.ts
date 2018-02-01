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