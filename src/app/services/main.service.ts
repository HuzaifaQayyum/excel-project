import { EntryNonPopulated } from './../models/Entry-nonPopulated.model';
import { Entry } from './../models/Entry.model';
import { AuthService } from './auth.service';
import { User } from '../models/User.model';
import { Supervisor } from '../models/Supervisor.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { saveAs } from 'file-saver';

@Injectable({ providedIn: 'root' })
export class MainService {
    private url = 'http://localhost:4000/api/main';
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

    fetchEntries(): Observable<Entry[]> {
        return this.http.get<Entry[]>(this.url + '/entries');
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
}
