import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import { take } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private store: Store<fromRoot.State>, private router: Router){}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.store.select(fromRoot.getIsAuth);
    // return this.store.select(fromRoot.getIsAuth).pipe(take(1)); " in tutorial he used this line while he faces to login but in my case it works normally"
  }
  canLoad(route: Route) {
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));
    // return this.store.select(fromRoot.getIsAuth).pipe(take(1)); " in tutorial he used this line while he faces to login"
  }

}
