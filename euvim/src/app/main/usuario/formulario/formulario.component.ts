import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EqualsPasswordValidator } from '../../../validators/equals.password.validator';
import { UsuarioService } from '../usuario.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  public perfis = [
    { id: "PROFESSOR", descricao: 'Professor' },
    { id: "ADMINISTRADOR", descricao: 'Administrador' },
    { id: "ALUNO", descricao: 'Aluno' },
  ];

  public form : FormGroup;
  public id;
  
  constructor(private formBuilder: FormBuilder, private _usuarioService: UsuarioService, private _router: Router, private _activateRoute: ActivatedRoute) {
    this.form = formBuilder.group({
        id: [null],
        nome: [null, Validators.required],
        email: [null, Validators.compose([Validators.required, Validators.email])],
        login: [null, Validators.required],
        perfil: [null, Validators.required],
        senha: [null, Validators.required],
        confirmacao: [null, Validators.required]
    }, {validator: EqualsPasswordValidator.validate("senha", "confirmacao")})
   }
  
  ngOnInit() {
    this.id = null;    
    this._activateRoute.params.subscribe(params=>{
      this.id = params['id'];
    });
    if(this.id){
      this._usuarioService.carregar(this.id).subscribe(suc=>{
        var item = Object(suc);
        delete item.urlFoto;
        item.senha = null;
        item.confirmacao = null;
        this.form.get("senha").setValidators(null);
        this.form.get("confirmacao").setValidators(null);
        this.form.setValue(item);
      });
    }
  }

  salvar() {
    if(this.form.valid){
      if(this.id){
        this._usuarioService.editar(this.form.value).subscribe(suc=>{
          this.consultar();
        });
      } else {
        this._usuarioService.adicionar(this.form.value).subscribe(suc=>{
          this.consultar();
        });
      }
    }
  }

  consultar() {
    this.form.reset();
    this._router.navigate(['/main/usuario/consulta']);
  } 

}