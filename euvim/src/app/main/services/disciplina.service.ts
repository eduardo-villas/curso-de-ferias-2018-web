import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class DisciplinaService {

  private _urlDisciplina = environment.url+"/api/v1/disciplinas";

  constructor(private _httpClient: HttpClient) { }
  
  adicionar(disciplina){
    return this._httpClient.post(this._urlDisciplina, disciplina, {responseType: 'text'});
  }

  excluir(id){
    return this._httpClient.delete(this._urlDisciplina+"/"+id, {responseType: 'text'});
  }

  editar(disciplina){
    return this._httpClient.put(this._urlDisciplina+"/"+disciplina.id, disciplina, {responseType: 'text'});
  }

  listar(){
    return this._httpClient.get<Array<any>>(this._urlDisciplina);
  }

  carregar(id){
    return this._httpClient.get<any>(this._urlDisciplina+"/"+id);
  }

}