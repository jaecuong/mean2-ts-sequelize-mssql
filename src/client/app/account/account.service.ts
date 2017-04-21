import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AppConfig } from '../app.config';
import { User } from '../models/index';

@Injectable()
export class SignupService {
  private baseUrl = `${this.config.apiUrl}/auth`;
  constructor(private http: Http, private config: AppConfig) { }

  // registerUser(userParam: User): Observable<User> {
  //   const url = `${this.baseUrl}/register`;
  //   return this.http.post(url).map(this.extractData);
  // }
  private extractData(response: Response) {
    let body = response.json();
    return body.data || {};

  }

  // insertAccount(userParam: User) { return this.http.post(this.config.apiUrl + '/users/signup', userParam, this.jwt()); }
  updateAccount(userParam: User) { }
  getAccountById(profile_id: number) { }

  // getAll() {
  //   return this.http.get(this.config.apiUrl + '/users', this.jwt()).map((response: Response) => response.json());
  // }

  // getById(profile_id: number) {
  //   return this.http.get(this.config.apiUrl + '/users/' + profile_id, this.jwt()).map((response: Response) => response.json());
  // }

  // create(user: User) {
  //   return this.http.post(this.config.apiUrl + '/users/signup', user, this.jwt());
  // }

  // // update(user: User) {
  // //     return this.http.put(this.config.apiUrl + '/users/' + user.profile_id, user, this.jwt());
  // // }

  // delete(_id: number) {
  //   return this.http.delete(this.config.apiUrl + '/users/' + _id, this.jwt());
  // }

  // // private helper methods

  // private jwt() {
  //   // create authorization header with jwt token
  //   let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  //   if (currentUser && currentUser.token) {
  //     let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
  //     return new RequestOptions({ headers: headers });
  //   }
  // }
}
