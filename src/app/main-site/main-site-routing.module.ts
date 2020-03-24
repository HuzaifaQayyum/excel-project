import { EntryManagmentComponent } from './entry-managment/entry-managment.component';
import { AdminGuard } from './../guards/admin.guard';
import { SupervisorsManagmentComponent } from './supervisors-managment/supervisors-managment.component';
import { MainGuard } from './../guards/main.guard';
import { DownloadReportComponent } from './download-report/download-report.component';
import { MainSiteComponent } from './main-site.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AddUpdateEntryComponent } from './add-update-entry/add-update-entry.component';
import { AddUpdateSupervisor } from './add-update-supervisor/add-update-supervisor.component';

const routes: Routes = [
    { path: '', canActivate: [MainGuard], canActivateChild: [MainGuard], component: MainSiteComponent, children: [
        { path: 'entry-managment/add', component: AddUpdateEntryComponent },
        { path: 'entry-managment/update', component: AddUpdateEntryComponent },
        { path: 'entry-managment', component: EntryManagmentComponent },
        { path: 'download-report', component: DownloadReportComponent },
        { path: 'supervisors-managment', component: SupervisorsManagmentComponent, canActivate: [AdminGuard] },
        { path: 'supervisors-managment/add', component: AddUpdateSupervisor, canActivate: [AdminGuard] },
        { path: 'supervisors-managment/update', component: AddUpdateSupervisor, canActivate: [AdminGuard] },
        { path: '**', redirectTo: '/entry-managment' }
    ]}
];

@NgModule({ 
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainSiteRoutingModule { }
