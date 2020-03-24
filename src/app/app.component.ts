import { Notification } from './models/Notification';
import { ErrorService } from './services/Error.service';
import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  errors: Notification[] = [];

  constructor(private authService: AuthService, private errorServie: ErrorService) { }
  
  ngOnInit() { 
    this.authService.authenticateUser();
    this.errorServie.popupErrorAlert.subscribe(error => this.errors.push(error));
  }

  closeError(_id: number): void { 
    this.errors.splice(this.errors.findIndex(e => e._id === _id), 1)
  }
}
