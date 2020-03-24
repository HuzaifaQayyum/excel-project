import { MainService } from './../services/main.service';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate { 
    
    constructor(private mainService: MainService, private router: Router) { }
    
    canActivate(): boolean | UrlTree { 
        return this.mainService.user.admin? true : this.router.createUrlTree(['']);
    }
}