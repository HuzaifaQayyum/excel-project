import { Notification } from './../models/Notification';
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable({ 
    providedIn: 'root'
})
export class ErrorService { 
    errorAlert = new Subject<Notification>();
    private currentId = 1;

    add(msg: string, title?: string): void { 
        this.errorAlert.next({ _id: this.currentId++, title, msg });
    }
}