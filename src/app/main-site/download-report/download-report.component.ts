import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MainService } from './../../services/main.service';
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './download-report.component.html',
    styleUrls: ['./download-report.component.css']
})
export class DownloadReportComponent implements OnInit {
    reportForm: FormGroup;
    isFormSubmitted = false;

    get from(): AbstractControl { return this.reportForm.get('from'); }
    get to(): AbstractControl { return this.reportForm.get('to'); }

    constructor(private mainService: MainService) { }

    ngOnInit(): void {
        this.reportForm = new FormGroup({
            from: new FormControl('2002-05-12', Validators.required),
            to: new FormControl('2022-05-12', Validators.required)
        });
    }

    onReportDownload(): void {
        this.isFormSubmitted = true;
        if (this.reportForm.invalid) { return console.log(`Invalid form`); }

        this.mainService.downloadReport(this.reportForm.value);
    }
}
