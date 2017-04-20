/**
 * The authentication service is used to login and logout of the application, to login it posts the users
 * credentials to the api and checks the response for a JWT token, if there is one it means authentication
 * was successful so the user details including the token are added to local storage.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../../app.config';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
  constructor(private http: Http, private config: AppConfig) { }

  login(username: string, password: string) {
    this.http.get(this.config.apiUrl + '/products', () => { });
    return this.http.post(this.config.apiUrl + '/authenticate', JSON.stringify({ username: username, password: password }))
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let user = response.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
