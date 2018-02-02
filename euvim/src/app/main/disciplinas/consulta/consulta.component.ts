import { Component, OnInit, ViewEncapsulation, Injectable } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Navigation } from 'selenium-webdriver';
import { ProfessorDialogComponent } from "./professor-dialog/professor-dialog.component";
import { QrCodeDialogComponent } from "./qr-code-dialog/qr-code-dialog.component";
import { DisciplinaService } from '../../../services/disciplina.service';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConsultaComponent implements OnInit {

  public displayedColumns = ['segmento', 'descricao', 'dataInicio', 'dataTermino','professores', 'id'];
  
  public dataSource;
  public noResults$ = false;

  constructor(private _disciplinaService:DisciplinaService, private _router: Router, public dialog: MatDialog ,
              private _loadingService:LoadingService) { }

  ngOnInit() {
    this.getListDisciplinas();
  }

  remover(identifer){
    this._loadingService.callNextStatus(true);
    this._disciplinaService.excluir(identifer).subscribe(suc=>{
      this.getListDisciplinas();
    },err=>{this._loadingService.callNextStatus(false);});
    
  }

  private getListDisciplinas(){
    this._loadingService.callNextStatus(true);
    this._disciplinaService.listar().subscribe(suc => {
        this.noResults$ = suc.length == 0;
        this.dataSource = new MatTableDataSource(suc);
        this._loadingService.callNextStatus(false);
      },err=>{this._loadingService.callNextStatus(false);}
    );
  }

  editar(identifier){
    this._router.navigate(["/main/disciplina/editar", identifier]);
  }

  dialogProfessores(listProf){
     let dialogRef = this.dialog.open(ProfessorDialogComponent, {
      width: '250px',
      data: { professores: listProf }
    });
  }

  qrCode(item){
    let dialogRef = this.dialog.open(QrCodeDialogComponent, {
      width: '250px',
      data: { idCurso: item.id, descricao: item.descricao}
    });
  }


}