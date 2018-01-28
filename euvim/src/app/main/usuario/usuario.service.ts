import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class UsuarioService {
s
  private _urlUsuario = environment.url+"/api/v1/usuarios";

  constructor(private _httpClient: HttpClient) { }
  
  adicionar(usuario){
    return this._httpClient.post(this._urlUsuario, usuario, {responseType: 'text'});
  }

  excluir(id){
    return this._httpClient.delete(this._urlUsuario+"/"+id, {responseType: 'text'});
  }

  editar(usuario){
    return this._httpClient.put(this._urlUsuario+"/"+usuario.id, usuario, {responseType: 'text'});
  }

  listar(){
    return this._httpClient.get<Array<any>>(this._urlUsuario);
  }

  carregar(id){
    return this._httpClient.get<any>(this._urlUsuario+"/"+id);
  }

}