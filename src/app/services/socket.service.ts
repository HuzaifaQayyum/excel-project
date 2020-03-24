import { Injectable, OnInit } from "@angular/core";
import * as io from 'socket.io-client';

@Injectable({ 
    providedIn: 'root'
})
export class SocketService implements OnInit { 

    private wsUrl = 'ws://localhost:4000';
    private _connection = io.connect(this.wsUrl);

    get connection(): SocketIOClient.Socket { return this._connection; }

    ngOnInit() { 
    }

}