import { Component } from '@angular/core';

@Component({
    template: `
        <header>
            <h3 routerLink="/auth">Authentication Zone</h3>
        </header>
        <router-outlet></router-outlet>
    `,
    styles: [`
        header {
            background: var(--secondary-color);
            color: #fff;
            padding: 10px 10px;
            cursor: pointer;
        }
    `]
})
export class AuthComponent { }
