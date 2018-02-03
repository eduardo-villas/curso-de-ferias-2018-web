import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private _router:Router){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
      return this.validarAcesso();
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean>|Promise<boolean>|boolean {
    return this.validarAcesso();
  }

  private validarAcesso() {
    let item = JSON.parse(sessionStorage.getItem("access"));
    let validacao = item && item.access_token != null;
    if(!validacao){
      this._router.navigate(["/login"]);
    }
    return validacao;
  }

}