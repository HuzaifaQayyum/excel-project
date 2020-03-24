import { AddUpdateSupervisor } from './add-update-supervisor/add-update-supervisor.component';
import { EntryManagmentComponent } from './entry-managment/entry-managment.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MainSiteComponent } from './main-site.component';
import { DownloadReportComponent } from './download-report/download-report.component';
import { MainSiteRoutingModule } from './main-site-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SupervisorsManagmentComponent } from './supervisors-managment/supervisors-managment.component';
import { NotificationComponent } from './notification/notification.component';
import { SharedModule } from '../shared-components/shared.module';
import { AddUpdateEntryComponent } from './add-update-entry/add-update-entry.component';

@NgModule({ 
    declarations: [
        MainSiteComponent,
        DownloadReportComponent,
        AddUpdateEntryComponent,
        SupervisorsManagmentComponent,
        AddUpdateSupervisor,
        NotificationComponent,
        EntryManagmentComponent
    ],
    imports: [
        CommonModule,
        MainSiteRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule
    ]
})
export class MainSiteModule { }
