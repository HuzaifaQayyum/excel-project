import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { AdminService } from '../../services/admin.service';
import { SharedValidator } from '../../shared.validator';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-supervisor',
  templateUrl: './add-update-supervisor.component.html',
  styleUrls: ['./add-update-supervisor.component.css']
})
export class AddUpdateSupervisor implements OnInit {
  newSupervisorForm: FormGroup;
  isFormSubmitted = false;
  serverMsg: string;
  _id: string;
  backupName: string;
  isEditing = false;

  get name(): AbstractControl { return this.newSupervisorForm.get('name'); }

  constructor(private route: ActivatedRoute, private router: Router, private adminService: AdminService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('_id');
    const name = this.route.snapshot.queryParamMap.get('name');

    if (id) {
      this._id = id;
      this.backupName = name;
      this.isEditing = true;
    }

    this.newSupervisorForm = new FormGroup({
      name: new FormControl(name, SharedValidator.required)
    })
  }

  resetSupervisorData(): void {
    this.newSupervisorForm.patchValue({ name: this.backupName });
    this.newSupervisorForm.updateValueAndValidity();
  }

  private onSupervisorFormSubmitted(msg: string): void {
    if (this.serverMsg) this.serverMsg = '';

    this.notificationService.add(msg);

    this.isFormSubmitted = false;
    this.newSupervisorForm.reset();
  }

  private onSupervisorFormSubmittedError({ error: { errorMsg } }): void {
    this.serverMsg = errorMsg;
  }

  onCreateSupervisor(): void {
    this.isFormSubmitted = true;
    if (this.newSupervisorForm.invalid) return;

    if (this.isEditing)
      this.adminService.updateSupervisor(this._id, this.newSupervisorForm.value)
        .subscribe(_ => {
          this.onSupervisorFormSubmitted(`Supervisor updated successfully`);
          this.router.navigate(['/supervisors-managment']);
        }, e => this.onSupervisorFormSubmittedError(e));


    else
      this.adminService.createSupervisor(this.newSupervisorForm.value)
        .subscribe(_ => this.onSupervisorFormSubmitted(`Supervisor added successfully`), (e => this.onSupervisorFormSubmittedError(e)));
  }

}
