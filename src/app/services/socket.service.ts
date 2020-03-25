import { AuthService } from './auth.service';
import { Injectable, OnInit } from "@angular/core";
import * as io from 'socket.io-client';

@Injectable({ 
    providedIn: 'root'
})
export class SocketService implements OnInit { 

    private wsUrl = 'ws://localhost:4000';
    private _connection: SocketIOClient.Socket;

    get connection(): SocketIOClient.Socket { return this._connection; }

    constructor(private authService: AuthService) { 
        this._connection = io.connect(this.wsUrl, { query: { token: this.authService.token }});
    }
    
    ngOnInit() {
    }

}