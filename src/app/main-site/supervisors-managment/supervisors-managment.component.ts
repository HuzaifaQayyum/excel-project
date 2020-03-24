import { ErrorService } from './../../services/Error.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MainService } from './../../services/main.service';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Supervisor } from '../../models/supervisor.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-supervisors-managment',
  templateUrl: './supervisors-managment.component.html',
  styleUrls: ['./supervisors-managment.component.css']
})
export class SupervisorsManagmentComponent implements OnInit, OnDestroy {
  isLoading = true;
  supervisors: Supervisor[] = [];
  filteredSupervisors: Supervisor[] = [];
  isSearching: boolean;
  serverError?: boolean;
  serverMsg?: string;
  private subscriptions: Subscription[] = [];

  constructor(private adminService: AdminService, private mainService: MainService, private errorService: ErrorService) { }

  ngOnInit(): void {
    this.mainService.fetchSupervisors()
      .subscribe(supervisors => {
        this.isLoading = false;
        this.errorService.handle404(supervisors);

        this.supervisors = supervisors;
      });

    const subscrption1 = this.errorService.onPageErrorAlert.subscribe(({ isServerError, msg }) => {
      if (this.isLoading) this.isLoading = false;
      
      this.serverError = isServerError;
      this.serverMsg = msg;
    });

    this.subscriptions.push(subscrption1);
  }

  onQuery(searchTxt: string): void {
    this.isSearching = searchTxt.length > 0;
    this.filteredSupervisors = this.supervisors.filter(({ name }) =>
      name.toLowerCase().slice(0, searchTxt.length) === searchTxt.toLowerCase());
  }

  onSupervisorDelete(_id: string): void {
    const confirmed = confirm(`Are you sure you want to delete this supervisor ?`);
    if (!confirmed) return;

    this.adminService.deleteSupervisor(_id)
      .subscribe(_ => {
        const indexToRemove = this.supervisors.findIndex(e => e._id === _id);
        this.supervisors.splice(indexToRemove, 1);

        this.errorService.handle404(this.supervisors);
      });
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) subscription.unsubscribe();
  }

}
