import { Injectable } from '@angular/core';
import {
   ActivatedRouteSnapshot,
   CanActivate,
   CanActivateChild,
   CanLoad,
   Route,
   Router,
   RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ROUTES } from '../enums/routes';

@Injectable({
   providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
   constructor(private authService: AuthService, private router: Router) { }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      return this.checkLogin(state.url);
   }

   canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      return this.canActivate(route, state);
   }

   canLoad(route: Route): boolean {
      const url: string = route.path;
      return this.checkLogin(url);
   }

   checkLogin(url): boolean {
      //console.log(this.authService.isLoggedIn)
      if (this.authService.isLoggedIn == true) {
         return true;
      }
      // Store the attempted URL for redirecting
      // Once the user is authenticated, the app will redirect him to the redirectUrl
      this.authService.redirectUrl = url;
      // Navigate to the login page with extras
      this.router.navigate([ROUTES.LOGIN]);
      return false;
   }
}
