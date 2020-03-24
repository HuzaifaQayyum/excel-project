import { HttpErrorResponse } from '@angular/common/http';
import { Notification } from './../models/Notification';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { stat } from 'fs';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {
    popupErrorAlert = new Subject<Notification>();
    private currentId = 1;

    onPageErrorAlert = new Subject<{ isServerError: boolean; msg?: string; }>();

    add(msg: string, title?: string): void {
        this.popupErrorAlert.next({ _id: this.currentId++, title, msg });
    }

    private clearErrorOnPage(): void {
        this.onPageErrorAlert.next({ isServerError: false, msg: null });
    }


    handle404(record: any[], msg?: string): void {
        if (record.length) return this.clearErrorOnPage();

        this.onPageErrorAlert.next({ isServerError: true, msg: msg || 'No Record Found.' });
    }

    handleHttpError({ status}: HttpErrorResponse): void {
        let msg: string;
        switch (status) {
            case 0:
                msg = 'Unable to connect to server. Make sure you have an active internet connection';
                break;
            case 500:
            default:
                msg = 'Something went wrong. Please try again later. We will fix issues as soon as possible. Sorry for inconvinience';
                break;
        }
        this.onPageErrorAlert.next({ isServerError: true, msg: msg });
    }
}
