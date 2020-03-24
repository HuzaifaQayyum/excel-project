import { ErrorService } from './../../services/Error.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from './../../services/notification.service';
import { Entry } from './../../models/Entry.model';
import { MainService } from './../../services/main.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: './entry-managment.component.html',
    styleUrls: ['./entry-managment.component.css']
})
export class EntryManagmentComponent implements OnInit, OnDestroy {
    isLoading = true;
    entries: Entry[] = [];
    serverError?: boolean;
    serverMsg?: string;
    private subscriptions: Subscription[] = [];

    constructor(private mainService: MainService, private notificationService: NotificationService, private errorService: ErrorService) { }

    ngOnInit(): void {
        this.mainService.fetchEntries()
            .subscribe(entries => {
                this.isLoading = false;
                this.errorService.handle404(this.entries);

                this.entries = entries;
            });

        const subscrption1 = this.errorService.onPageErrorAlert.subscribe(({ isServerError, msg }) => {
            if (this.isLoading) this.isLoading = false;

            this.serverError = isServerError;
            this.serverMsg = msg;
        });

        this.subscriptions.push(subscrption1);
    }

    onQuery(searchTxt: string): void {
        console.log(searchTxt);
    }

    onDeleteEntry(_id: string): void {
        const confirmed = confirm(`Are you sure you want to delete this supervisor ?`);
        if (!confirmed) { return; }

        this.mainService.deleteEntry(_id)
            .subscribe(_ => {
                this.removeEntry(_id);
                this.notificationService.add(`Entry deleted successfully.`);
            }, ({ status, error: { errorMsg } }: HttpErrorResponse) => {
                if (status === 404) {
                    this.removeEntry(_id);
                    this.notificationService.add(errorMsg);
                }
            });
    }

    private removeEntry(_id: string): void {
        const indexToRemove = this.entries.findIndex(e => e._id === _id);
        this.entries.splice(indexToRemove, 1);

        this.errorService.handle404(this.entries);
    }

    ngOnDestroy(): void {
        for (const subscription of this.subscriptions) subscription.unsubscribe();
    }
}
