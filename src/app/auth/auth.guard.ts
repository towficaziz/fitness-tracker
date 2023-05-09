import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router){}

  canLoad(route: Route) {
    const isDoneAuth = this.authService.isAuth();
      if(!isDoneAuth){
        this.router.navigate(["/login"]);
      }
      return isDoneAuth;
  }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   if(this.authService.isAuth()){
  //     return true;
  //   } else {
  //     this.router.navigate(['/login']);
  //   }
  // }

  // coding upper way gives error but why?

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const isDoneAuth = this.authService.isAuth();
      if(!isDoneAuth){
        this.router.navigate(["/login"]);
      }
      return isDoneAuth;
  }
}
