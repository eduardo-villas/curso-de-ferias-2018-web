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