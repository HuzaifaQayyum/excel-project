import { MainService } from './../services/main.service';
import { CanActivate, UrlTree, Router, CanLoad, Route, CanActivateChild, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate, CanLoad, CanActivateChild {

    constructor(private mainService: MainService, private router: Router) { }

    canActivate(): boolean | UrlTree {
        return this.mainService.user.admin ? true : this.router.createUrlTree(['']);
    }

    canActivateChild(): boolean | UrlTree  {
        return this.mainService.user.admin ? true : this.router.createUrlTree(['']);
    }

    canLoad(route: Route): boolean {
        return this.mainService.user.admin;
    }
}
