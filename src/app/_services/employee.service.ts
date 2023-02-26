import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employees } from '../_models/employees';

const employeesUrl = "http://localhost:3000/employees";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees: Employees[] = [];

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<Employees[]>(employeesUrl);
  }
}
