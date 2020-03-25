import { AccountsManagementComponent } from './account-management/account-management.component';
import { AdminGuard } from './../../guards/admin.guard';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";

import { SupervisorsManagmentComponent } from './supervisors-managment/supervisors-managment.component';
import { AddUpdateSupervisor } from './supervisors-managment/add-update-supervisor/add-update-supervisor.component';

const routes: Routes = [
    {
        path: '', canActivate: [AdminGuard], canActivateChild: [AdminGuard], children: [
            { path: 'supervisors-managment', component: SupervisorsManagmentComponent },
            { path: 'supervisors-managment/add', component: AddUpdateSupervisor },
            { path: 'supervisors-managment/update', component: AddUpdateSupervisor },
            { path: 'accounts-management', component: AccountsManagementComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
