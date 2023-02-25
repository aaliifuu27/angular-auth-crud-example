import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeAddEditComponent } from './employee-add-edit/employee-add-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeAddEditComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    SharedModule
  ]
})
export class EmployeesModule { }
