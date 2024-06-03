import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(private _router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let loggedIn = sessionStorage.getItem('logged_in');
    if(loggedIn){
      this._router.navigate(['/home']);
      return false
    }else{
      return true
    }
  }
}