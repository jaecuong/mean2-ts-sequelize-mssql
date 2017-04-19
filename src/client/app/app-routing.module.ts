import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CatComponent } from './cat/cat.component';
import { LoginComponent } from './account/login/login.component';
import { SignupComponent } from './account/signup/signup.component';
import { AuthGuard } from "./shared/guard/index";

const routes: Routes = [
  { path: '', component: HomeComponent,canActivate: [AuthGuard]},
  { path: 'about', component: AboutComponent },
  { path: 'cat', component: CatComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },



  // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
