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
import { ROUTES } from '../enums/routes';
import { AuthService } from '../services/auth.service';

@Injectable({
   providedIn: 'root',
})
export class AuthGuardUnlogged implements CanActivate, CanActivateChild, CanLoad {
   constructor(private authService: AuthService, private router: Router) {}

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      return this.checkUnlogged(state.url);
   }

   canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      return this.canActivate(route, state);
   }

   canLoad(route: Route): boolean {
      
      const url: string = route.path;
      console.log('pasooo');
      
      return this.checkUnlogged(url);
   }

   checkUnlogged(url: string): boolean {
      console.log(this.authService.isLoggedIn)
      if (this.authService.isLoggedIn !== true) {
         console.log(this.authService.userData);
         return true;
      }
      // Redirect to HOME
      this.router.navigate([ROUTES.HOME]);
      return false;
   }
}
