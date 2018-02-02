import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class ProfessorService {

  constructor(private _httpClient:HttpClient ) { }

  private _urlProfessores = environment.URL+"/api/v1/usuarios";

  listarProfessores(){
    let httpParams = new HttpParams().set("tipo","PROFESSOR")
    return this._httpClient.get<Array<Object>>(this._urlProfessores, {params:httpParams});
  }

  getItem(id){
    let httpParams = new HttpParams().set("tipo","PROFESSOR")
    return this._httpClient.get<any>(this._urlProfessores+"/"+id, {params:httpParams});
  }
}
