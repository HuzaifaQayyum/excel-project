import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from './../../services/notification.service';
import { Entry } from './../../models/Entry.model';
import { MainService } from './../../services/main.service';
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './entry-managment.component.html',
    styleUrls: ['./entry-managment.component.css']
})
export class EntryManagmentComponent implements OnInit {
    isLoading = true;
    entries: Entry[] = [];

    constructor(private mainService: MainService, private notificationService: NotificationService) { }

    ngOnInit(): void {
        this.mainService.fetchEntries()
            .subscribe(entries => {
                this.entries = entries;
                this.isLoading = false;
            });
    }
     
    onQuery(searchTxt: string): void {
        console.log(searchTxt);
    }
    
    onDeleteEntry(_id: string): void {
        const confirmed = confirm(`Are you sure you want to delete this supervisor ?`);
        if (!confirmed) return;

        this.mainService.deleteEntry(_id)
            .subscribe(_ => {
                this.removeEntry(_id)
                this.notificationService.add(`Entry deleted successfully.`);
            }, ({ status, error: { errorMsg } }: HttpErrorResponse) => {
                if (status === 404) {
                    this.removeEntry(_id);
                    this.notificationService.add(errorMsg);
                };
            });
    }

    private removeEntry(_id: string): void {
        const index = this.entries.findIndex(e => e._id === _id);
        this.entries.splice(index, 1);
    }
}
