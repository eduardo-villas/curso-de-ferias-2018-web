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