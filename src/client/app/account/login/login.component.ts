import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

import { AlertService, AuthenticationService } from '../../services/index';
import { ToastComponent } from "../../shared/toast/toast.component";
import { User } from '../../models/index';
// import { DataService } from '../services/data.service';
// import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // cats = [];
  // isisLoading = true;

  // cat = {};
  // isEditing = false;

  // addCatForm: FormGroup;
  // name = new FormControl('', Validators.required);
  // age = new FormControl('', Validators.required);
  // weight = new FormControl('', Validators.required);

  constructor(private fb: FormBuilder) { }
  model: User = new User();
  isLoading = false;
  returnUrl: string;
  signinForm: FormGroup;

  // constructor(
  //   private route: ActivatedRoute,
  //   private router: Router,
  //   private authenticationService: AuthenticationService,
  //   private toast: ToastComponent) { }

  ngOnInit() {
    // reset login status
    // this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
      password: ''
    });
  }
  signin() {
    console.log(this.signinForm);
    console.log('Signup = ' + JSON.stringify(this.signinForm.value));
  }
  // login() {
  //   this.isLoading = true;
  //   this.authenticationService.login(this.model.username, this.model.password)
  //     .subscribe(
  //     data => {
  //       this.toast.setMessage('Login successfully.', 'success');
  //       this.router.navigate([this.returnUrl]);
  //     },
  //     error => {
  //       // this.alertService.error(error);
  //       this.toast.setMessage('Could not login ' + error, 'warning');
  //       this.isLoading = false;
  //     });
  // }

  // getCats() {
  //   this.dataService.getCats().subscribe(
  //     data => this.cats = data,
  //     error => console.log(error),
  //     () => this.isisLoading = false
  //   );
  // }

  // addCat() {
  //   this.dataService.addCat(this.addCatForm.value).subscribe(
  //     res => {
  //       const newCat = res.json();
  //       this.cats.push(newCat);
  //       this.addCatForm.reset();
  //       this.toast.setMessage('item added successfully.', 'success');
  //     },
  //     error => console.log(error)
  //   );
  // }

  // enableEditing(cat) {
  //   this.isEditing = true;
  //   this.cat = cat;
  // }

  // cancelEditing() {
  //   this.isEditing = false;
  //   this.cat = {};
  //   this.toast.setMessage('item editing cancelled.', 'warning');
  //   // reload the cats to reset the editing
  //   this.getCats();
  // }

  // editCat(cat) {
  //   this.dataService.editCat(cat).subscribe(
  //     res => {
  //       this.isEditing = false;
  //       this.cat = cat;
  //       this.toast.setMessage('item edited successfully.', 'success');
  //     },
  //     error => console.log(error)
  //   );
  // }

  // deleteCat(cat) {
  //   if (window.confirm('Are you sure you want to permanently delete this item?')) {
  //     this.dataService.deleteCat(cat).subscribe(
  //       res => {
  //         const pos = this.cats.map(elem => { return elem._id; }).indexOf(cat._id);
  //         this.cats.splice(pos, 1);
  //         this.toast.setMessage('item deleted successfully.', 'success');
  //       },
  //       error => console.log(error)
  //     );
  //   }
  // }

}
