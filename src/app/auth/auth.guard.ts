import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){}

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
