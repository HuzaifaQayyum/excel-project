import { EntryNonPopulated } from './../models/Entry-nonPopulated.model';
import { Entry } from './../models/Entry.model';
import { AuthService } from './auth.service';
import { User } from '../models/User.model';
import { Supervisor } from '../models/Supervisor.model';
import { Observable, Subscription } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { saveAs } from 'file-saver';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MainService {
    private url = `${environment.serverUrl}/main`;
    private _user: User;

    get user(): User { return this._user; }

    constructor(private injector: Injector, private http: HttpClient) { }

    setUser(): void {
        this._user = jwt_decode(this.injector.get(AuthService).token);
    }

    fetchSupervisors(): Observable<Supervisor[]> {
        return this.http.get<Supervisor[]>(this.url + '/supervisors');
    }

    uploadEntry(formData: { date: string | Date, noOfHrs: number, to: string, from: string }): Observable<Entry> {
        return this.http.post<Entry>(this.url + '/entries', formData);
    }

    fetchEntries(pageNo = 0): Observable<Entry[]> {
        return this.http.get<Entry[]>(this.url + '/entries', { params: new HttpParams().set('pageNo', pageNo.toString() ) });
    }

    fetchTotalPagesOfEntries(): Observable<{ pages: number }> { 
        return this.http.get<{ pages: number }>(this.url + '/entries-no-of-pages');
    }

    updateEntry(_id: string, formData: EntryNonPopulated): Observable<EntryNonPopulated> {
        return this.http.put<EntryNonPopulated>(this.url + `/entries/${_id}`, formData);
    }

    deleteEntry(_id: string): Observable<Entry> {
        return this.http.delete<Entry>(this.url + `/entries/${_id}`);
    }

    downloadReport({ from, to }: { from: Date, to: Date }): void {
        this.http.get(this.url + `/download-report/${from}/${to}`, {
            responseType: 'blob'
        }).subscribe((data: Blob) => {
            const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' });
            saveAs(blob, `${from}-${to}`);
        });
    }

    registerPushNotification(subscription: PushSubscription): void { 
        this.http.post(this.url + '/notifications',  { subscription })
            .subscribe(res => console.log(res), err => console.log(err));
    }
}
