import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EqualsPasswordValidator } from '../../../validators/equals.password.validator';

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
  
  constructor(private formBuilder: FormBuilder) {
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
  }

}