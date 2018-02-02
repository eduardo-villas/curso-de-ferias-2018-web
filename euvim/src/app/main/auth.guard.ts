import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _router:Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let item = JSON.parse(sessionStorage.getItem("access"));
      let validacao = item && item.access_token != null;
      if(!validacao){
        this._router.navigate(["/login"]);
      }
      return validacao;
  }
}
