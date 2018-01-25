import { Component, OnInit } from '@angular/core';

import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit {

  public displayedColumns = ['nome', 'login', 'email', 'perfil', 'id'];
  public dataSource = new UsuarioDataSource();

  constructor() { }

  ngOnInit() {
  }

}

export interface Element {
  id: number;
  nome: string;
  login: number;
  email: string;
  perfil: string;
}

export class UsuarioDataSource extends DataSource<any> {
  
  connect(): Observable<any[]> {
    return Observable.of([
      {id: 1, nome: 'José da Silva', login: "jose", email: 'jose@ponto.com.br', perfil:"Aluno"},
      {id: 2, nome: 'Mariano das Neves', login: "mariano", email: 'marino@ponto.com.br', perfil:"Aluno"},
      {id: 3, nome: 'Magyver da Silva', login: "magyver", email: 'magyver@ponto.com.br', perfil:"Aluno"},
      {id: 4, nome: 'Irineu Nunes', login: "irineu", email: 'irineu@ponto.com.br', perfil:"Aluno"},
      {id: 5, nome: 'Carlos Silva', login: "carlos", email: 'carlos@ponto.com.br', perfil:"Aluno"}
    ]);
  }

  disconnect() {}
}