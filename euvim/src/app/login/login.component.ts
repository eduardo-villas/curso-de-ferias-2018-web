import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  public form:FormGroup;
  public login:boolean = false;
  public erro;
  
  constructor(private _form:FormBuilder, private _loginService : LoginService, private _router:Router) {
    this.form  = _form.group({
      "usuario": [null, Validators.required],
      "senha"  : [null, Validators.required]
    })
   }

  ngOnInit() {
    sessionStorage.clear();
    this.erro = null;
    this.login = false;
  }

  realizarLogin(){
    this.login = true;
    this._loginService.login(this.form.value).subscribe(suc=>{
      sessionStorage.setItem("access", JSON.stringify(suc));
      this._router.navigate(["/main"]);
      this.login = false;
    },err=>{
      this.login = false;
      this.erro = err;
    })
  }

}
