import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class DisciplinaService {

  constructor(private _httpClient:HttpClient ) { }

  private _urlDisciplina = environment.URL+"/api/v1/disciplinas";

  adicionar(item){
    return this._httpClient.post(this._urlDisciplina, item, {responseType: 'text'});
  }

  excluir(identifier){
    return this._httpClient.delete(this._urlDisciplina+"/"+identifier, {responseType: 'text'})
  }

  editar(editItem){
    return this._httpClient.put(this._urlDisciplina+"/"+editItem.id, editItem, {responseType: 'text'});
  }

  getItem(identifier){
    return this._httpClient.get<any>(this._urlDisciplina+"/"+identifier);
  }

  listar(){
    return this._httpClient.get<Array<Object>>(this._urlDisciplina);
  }
}
