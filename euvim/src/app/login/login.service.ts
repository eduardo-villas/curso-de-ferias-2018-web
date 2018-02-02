import { Injectable } from '@angular/core';
import { environment }  from '../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Promise } from 'q';
import { HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoginService {

  private urlLogin = environment.URL+"/oauth/token";

  constructor(private _httpCliente: HttpClient, private _router:Router) { }

  public login(dados) {
    const accessData = new HttpParams()
                          .set('grant_type', 'password')
                          .append('username', dados.usuario)
                          .append('password', dados.senha);
    const access = btoa('angular:alunos');
    const headerss = new HttpHeaders().set('Authorization', 'Basic ' + access.toString())
                                      .append('Content-Type', 'application/x-www-form-urlencoded');
    return this._httpCliente.post(this.urlLogin,
                                  accessData.toString,
                                 {headers: headerss}
                                );
 }

  public deslogar(){
    sessionStorage.removeItem("access");
    this._router.navigate(["/login"]);
  }

}
