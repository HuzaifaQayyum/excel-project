import { Observable } from 'rxjs';
import { Supervisor } from './../models/Supervisor.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../models/Account.model';

@Injectable({ providedIn: 'root' })
export class AdminService {
    private url = 'http://localhost:4000/api/admin';

    constructor(private http: HttpClient) { }

    createSupervisor(formData: Supervisor): Observable<Supervisor> {
        return this.http.post<Supervisor>(this.url + '/supervisors', formData);
    }

    updateSupervisor(_id: string, formData: Supervisor): Observable<Supervisor> {
        return this.http.put<Supervisor>(this.url + `/supervisors/${_id}`, formData);
    }

    deleteSupervisor(_id: string): Observable<Supervisor> {
        return this.http.delete<Supervisor>(this.url + `/supervisors/${_id}`);
    }

    fetchAccounts(): Observable<Account[]> { 
        return this.http.get<Account[]>(this.url + '/accounts');
    }

    deleteAccount(_id: string): Observable<Account> { 
        return this.http.delete<Account>(this.url + `/accounts/${_id}`);
    }
}
