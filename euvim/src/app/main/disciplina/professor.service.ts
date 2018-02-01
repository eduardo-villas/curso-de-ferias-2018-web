import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class ProfessorService {

  constructor(private _httpClient: HttpClient ) { }
  
  private _urlProfessores = environment.url+"/api/v1/usuarios";

  listar(){
    let httpParams = new HttpParams().set("tipo","PROFESSOR")
    return this._httpClient.get<Array<Object>>(this._urlProfessores, {params:httpParams});
  }

  professor(id){
    let httpParams = new HttpParams().set("tipo","PROFESSOR")
    return this._httpClient.get<any>(this._urlProfessores+"/"+id, {params:httpParams});
  }

}