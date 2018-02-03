import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

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

  constructor(private _formBuilder:FormBuilder, private _loginService: LoginService, private _router: Router) {
    this.form  = _formBuilder.group({
      "usuario": [null, Validators.compose([Validators.required, Validators.email])],
      "senha"  : [null, Validators.required]
    });
   }

   ngOnInit() {
    sessionStorage.clear();
    this.erro = null;
    this.login = false;
  }
  
  realizarLogin(){
    this.login = true;
    this._loginService.login(this.form.value).subscribe(
      suc=>{
        sessionStorage.setItem("access", JSON.stringify(suc));
        this._router.navigate(["/main"]);
        this.login = false;
      },
      err=>{
        this.login = false;
        this.erro = err;
      }
    );
  }

}