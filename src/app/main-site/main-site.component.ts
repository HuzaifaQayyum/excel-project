import { User } from './../models/User.model';
import { MainService } from './../services/main.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, HostListener } from '@angular/core';

@Component({
    templateUrl: './main-site.component.html',
    styleUrls: ['./main-site.component.css']
})
export class MainSiteComponent implements OnInit {
    user: User;
    toggleNavActive = false;
    showNavBar = window.innerWidth <= 1040;

    @HostListener('window:resize', ['$event']) private onWindowResize(event: Event): void { 
        this.showNavBar = (event.target as Window).innerWidth <= 1040;
    }

    constructor(private authService: AuthService, private mainService: MainService) { }

    ngOnInit(): void {
        this.user = this.mainService.user;
    }

    onLogout(): void { this.authService.logoutUser(); }
}
