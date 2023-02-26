import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employees } from '../_models/employees';
import { Groups } from '../_models/groups';

const employeesUrl = "http://localhost:3000/employees";
const groupsUrl = "http://localhost:3000/groups";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees: Employees[] = [];

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<Employees[]>(employeesUrl);
  }

  getGroups() {
    return this.http.get<Groups[]>(groupsUrl);
  }

  create(payload: Employees) {
    return this.http.post<Employees>(employeesUrl, payload);
  }

  getById(id: string) {
    return this.http.get<Employees>(`${employeesUrl}/${id}`);
  }

  update(payload: Employees, id: string) {
    return this.http.put(`${employeesUrl}/${id}`, payload);
  }

  delete(id: string) {
    return this.http.delete<Employees>(`${employeesUrl}/${id}`);
  }
}
