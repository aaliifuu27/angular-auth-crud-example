import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Groups } from 'src/app/_models/groups';
import { EmployeeService } from 'src/app/_services/employee.service';
import { NotificationService } from 'src/app/_services/notification.service';

import {map, startWith} from 'rxjs/operators';
import { Employees } from 'src/app/_models/employees';
@Component({
  selector: 'app-employee-add-edit',
  templateUrl: './employee-add-edit.component.html',
  styleUrls: ['./employee-add-edit.component.css']
})
export class EmployeeAddEditComponent implements OnInit {
  employeeForm!: UntypedFormGroup;
  id!: string;
  isAddMode!: boolean;
  groups!: Groups[];
  groupOptions!: Observable<Groups[]>;

  loading = false;
  submitted = false;

  maxDate = new Date();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if(!this.isAddMode) {
      this.getEmployee(this.id);
    }
    this.getGroups();
    this.createForm();
  }

  private createForm() {
    this.employeeForm = new UntypedFormGroup({
      username: new UntypedFormControl('', Validators.required),
      firstName: new UntypedFormControl('', Validators.required),
      lastName: new UntypedFormControl('', Validators.required),
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      birthDate: new UntypedFormControl('', Validators.required),
      basicSalary: new UntypedFormControl('', [Validators.required]),
      status: new UntypedFormControl('', Validators.required),
      group: new UntypedFormControl('', Validators.required),
      description: new UntypedFormControl('', Validators.required)
    });
  }

  store() {
    const payload: Employees = {
      username:  this.employeeForm.get('username')?.value,
      firstName:  this.employeeForm.get('firstName')?.value,
      lastName:  this.employeeForm.get('lastName')?.value,
      email: this.employeeForm.get('email')?.value,
      birthDate:  this.employeeForm.get('birthDate')?.value,
      basicSalary:  this.employeeForm.get('basicSalary')?.value,
      status:  this.employeeForm.get('status')?.value,
      group:  this.employeeForm.get('group')?.value,
      description:  this.employeeForm.get('description')?.value
    }
    
    if (this.isAddMode) {
      this.employeeService.create(payload).subscribe(res => {
        this.notificationService.openSnackBar('Data saved')
        this.router.navigate(['/employees']);
      }, err => {
        console.log(err);
        this.notificationService.openSnackBar('something went wrong')
      })
    } else {
      this.employeeService.update(payload, this.id).subscribe(res => {
        this.notificationService.openSnackBar('Data updated')
        this.router.navigate(['/employees']);
      }, err => {
        console.log(err);
        this.notificationService.openSnackBar('something went wrong')
      })
    }

  }

  getGroups() {
    this.employeeService.getGroups().subscribe(res => {
      this.groups = res;
      this.groupOptions = this.employeeForm.valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : value?.name;
          return name ? this._filter(name as string) : this.groups.slice();
        }),
      );
    }, err => {
      console.log(err);
      this.notificationService.openSnackBar('something went wrong')
    })
  }

  getEmployee(id: string) {
    this.employeeService.getById(id).subscribe(res => {
      this.employeeForm.patchValue(res)
    }, err => {
      console.log(err);
      this.notificationService.openSnackBar('something went wrong')
    })
  }

  displayFn(group: Groups): string {
    return group && group.name ? group.name : '';
  }

  private _filter(name: string): Groups[] {
    const filterValue = name.toLowerCase();

    return this.groups.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  reset() {

  }

  back() {
    this.router.navigate(['/employees'])
  }
}
