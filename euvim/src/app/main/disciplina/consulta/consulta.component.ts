import { Component, OnInit } from '@angular/core';

import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { DisciplinaService } from '../../services/disciplina.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ProfessorComponent } from '../professor/professor.component';
import { QrcodeComponent } from '../qrcode/qrcode.component';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit {

  public displayedColumns = ['segmento', 'descricao', 'dataInicio', 'dataTermino', 'professores', 'id'];
  public dataSource: MatTableDataSource<any>;

  public noResults$ = false;
  constructor(private _disciplinaService: DisciplinaService, private _router: Router, public dialog: MatDialog) { }
  
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