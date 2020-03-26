import { MainService } from './../services/main.service';
import { UrlTree, Router, CanLoad, Route, CanActivateChild } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanLoad, CanActivateChild {

    constructor(private mainService: MainService, private router: Router) { }

    canActivateChild(): boolean | UrlTree  {
        return this.mainService.user.admin ? true : this.router.createUrlTree(['']);
    }

    canLoad(route: Route): boolean {
        return this.mainService.user.admin;
    }
}
