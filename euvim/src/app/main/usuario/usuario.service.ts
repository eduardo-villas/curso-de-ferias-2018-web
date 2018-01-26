import { Injectable } from '@angular/core';

@Injectable()
export class UsuarioService {

  private usuarios = [
    {id: 1, nome: 'José da Silva', login: "jose", email: 'jose@ponto.com.br', perfil:"ALUNO"},
    {id: 2, nome: 'Mariano das Neves', login: "mariano", email: 'marino@ponto.com.br', perfil:"ALUNO"},
    {id: 3, nome: 'Magyver da Silva', login: "magyver", email: 'magyver@ponto.com.br', perfil:"ALUNO"},
    {id: 4, nome: 'Irineu Nunes', login: "irineu", email: 'irineu@ponto.com.br', perfil:"ALUNO"},
    {id: 5, nome: 'Carlos Silva', login: "carlos1", email: 'carlos@ponto.com.br', perfil:"ALUNO"}
  ];

  constructor() { }
  
  adicionar(usuario){
    let maxIdentifier = 0;
    this.usuarios.forEach(usuario=>{
      maxIdentifier < usuario.id ? maxIdentifier = usuario.id : maxIdentifier = maxIdentifier;
    });
    usuario.identifier = maxIdentifier + 1;
    this.usuarios.push(usuario);
  }

  excluir(id){
    let index = this.usuarios.findIndex(item=> item.id == id);
    if(index > -1){
      this.usuarios.splice(index, 1);
    }
  }

  editar(usuario){
    let index = this.usuarios.findIndex(item=> item.id == usuario.id);
    if(index > -1){
      this.usuarios[index] = usuario;
    }
  }

  listar(){
    return this.usuarios;
  }

  carregar(id){
    return this.usuarios.find(item=> item.id == id);
  }

}