import { Component } from '@angular/core';

@Component({
    template: `
        <div class="wrapper">
            <header>
                <h3 routerLink="/auth">Authentication Zone</h3>
            </header>
            <router-outlet></router-outlet>
        </div>
    `,
    styles: [`
        .wrapper {
            background: #718096;
            height: 100vh;
        }

        header {
            background: var(--secondary-color);
            color: #fff;
            padding: 0 10px;
            cursor: pointer;
            height: 8vh;
            line-height: 8vh;
        }
    `]
})
export class AuthComponent { }
