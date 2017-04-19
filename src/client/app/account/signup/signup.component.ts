import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertService, UserService } from '../../services/index';
import { ToastComponent } from "app/shared/toast/toast.component";
// import { DataService } from '../services/data.service';
// import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  model: any = {};
  isLoading = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private toast: ToastComponent) { }

  register() {
    this.isLoading = true;
    this.userService.create(this.model)
      .subscribe(
      data => {
        // set success message and pass true paramater to persist the message after redirecting to the login page
        // this.alertService.success('Registration successful', true);
        this.toast.setMessage('Registration successful', 'warning');
        this.router.navigate(['/login']);
      },
      error => {
        // this.alertService.error(error);
        this.toast.setMessage('Could not register - ' + error, 'warning');
        this.isLoading = false;
      });
  }
}
