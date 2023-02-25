import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  login() {
    return this.http.get<any>("http://localhost:3000/signup")
  }
  getUser() {
    return sessionStorage.getItem('user');
  }
  logout() {
    sessionStorage.clear();
  }
}
