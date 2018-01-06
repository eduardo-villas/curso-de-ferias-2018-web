import { Component, OnInit, ViewEncapsulation, Injectable } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { MatTableDataSource } from '@angular/material';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';
import { Navigation } from 'selenium-webdriver';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConsultaComponent implements OnInit {

  public displayedColumns = ['nome', 'login', 'email', 'perfil', 'id'];
  
  public dataSource;
  public noResults$ = false;

  constructor(private usuarioService:UsuarioService, private _router: Router) { }

  ngOnInit() {
    this.getListUsers();
  }

  remover(identifer){
    this.usuarioService.excluir(identifer).subscribe(suc=>{
      this.getListUsers();
    });
    
  }

  private getListUsers(){
    this.usuarioService.listar().subscribe(suc => {
        this.noResults$ = suc.length == 0;
        this.dataSource = new MatTableDataSource(suc);
      }
    );
  }

  editar(identifier){
    this._router.navigate(["/main/usuario/editar", identifier]);
  }


}