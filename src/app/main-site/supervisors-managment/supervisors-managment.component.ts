import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MainService } from './../../services/main.service';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { Supervisor } from '../../models/supervisor.model';

@Component({
  selector: 'app-supervisors-managment',
  templateUrl: './supervisors-managment.component.html',
  styleUrls: ['./supervisors-managment.component.css']
})
export class SupervisorsManagmentComponent implements OnInit {
  isLoading = true;
  supervisors: Supervisor[] = [];
  filteredSupervisors: Supervisor[] = [];
  isSearching: boolean;

  constructor(private adminService: AdminService, private mainService: MainService) { }

  ngOnInit(): void {
    this.mainService.fetchSupervisors()
      .subscribe(supervisors => {
        this.supervisors = supervisors;
        this.isLoading = false;
      });
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
      .subscribe(supervisor => this.supervisors.splice(this.supervisors.findIndex(e => e._id === _id), 1));
  }

}
