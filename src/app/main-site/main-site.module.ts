import { EntryManagmentComponent } from './entry-managment/entry-managment.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MainSiteComponent } from './main-site.component';
import { DownloadReportComponent } from './download-report/download-report.component';
import { MainSiteRoutingModule } from './main-site-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotificationComponent } from './notification/notification.component';
import { SharedModule } from '../shared-components/shared.module';
import { AddUpdateEntryComponent } from './entry-managment/add-update-entry/add-update-entry.component';
import { CustomPipes } from '../pipes/pipe.module';

@NgModule({
    declarations: [
        MainSiteComponent,
        DownloadReportComponent,
        AddUpdateEntryComponent,
        NotificationComponent,
        EntryManagmentComponent
    ],
    imports: [
        CommonModule,
        MainSiteRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        CustomPipes
    ]
})
export class MainSiteModule { }
