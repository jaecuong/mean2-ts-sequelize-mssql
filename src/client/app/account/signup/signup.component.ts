import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { AlertService, UserService } from '../../services/index';
import { ToastComponent } from "../../shared/toast/toast.component";
import { User } from '../../models/index';
// import { DataService } from '../services/data.service';
// import { ToastComponent } from '../shared/toast/toast.component';

// Custom validator email and confirm email
function emailMatcher(c: AbstractControl) {
  let emailControl = c.get('email');
  let confirmControl = c.get('confirmEmail');
  if (emailControl.pristine === confirmControl.pristine) {
    return null;
  }
  if (emailControl.value === confirmControl.value) {
    return null;
  }
  return { 'match': true };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  model: User = new User();
  signupForm: FormGroup;
  isLoading = false;

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      // email: { value: 'N/A', disabled: true },
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
        confirmEmail: ['', Validators.required],
      }, { validator: emailMatcher }),
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toast: ToastComponent) { }

  register() {
    console.log(this.signupForm);
    console.log('Signup = ' + JSON.stringify(this.signupForm.value));
    // this.isLoading = true;
    // this.userService.create(this.model)
    //   .subscribe(
    //   data => {
    //     // set success message and pass true paramater to persist the message after redirecting to the login page
    //     // this.alertService.success('Registration successful', true);
    //     this.toast.setMessage('Registration successful', 'warning');
    //     this.router.navigate(['/login']);
    //   },
    //   error => {
    //     // this.alertService.error(error);
    //     this.toast.setMessage('Could not register - ' + error, 'warning');
    //     this.isLoading = false;
    //   });
  }
}
