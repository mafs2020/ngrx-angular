import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../state/app.state';
import { token } from '../state/user.reduce';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  token: boolean;
  constructor(private store: Store<State>, private router: Router) {}
  // Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    console.log('si se ejecuto');
    if( this.isLogin() ){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  isLogin(): boolean {
    console.log('destinoooooooooooooooooo');
    this.store.select( token ).subscribe((tokenM) => this.token = !!tokenM);
    return this.token;
  }

}
