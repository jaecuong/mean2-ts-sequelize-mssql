import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './account/login/login.component';
import { SignupComponent } from './account/signup/signup.component';
import { CatComponent } from './cat/cat.component';
// import { DataService } from './services/data.service';
import { AlertComponent } from './directives/index';
import { AuthGuard } from './shared/guard/index';
import { AlertService, AuthenticationService, UserService, DataService } from './services/index';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    CatComponent,
    LoginComponent,
    SignupComponent,
    AlertComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    DataService,
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
