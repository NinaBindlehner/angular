import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "./shared/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class CanNavigateToNewPadletGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (this.authService.isLoggedIn()) {
        return true;
      } else {
        window.alert("Bitte logge dich ein, um ein neues Padlet erstellen zu können");
      }
      this.router.navigate(["../"], {relativeTo: this.route});
      return false;
  }

}
