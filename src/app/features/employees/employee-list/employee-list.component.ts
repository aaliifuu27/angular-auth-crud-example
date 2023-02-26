import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';
import { Employees } from 'src/app/_models/employees';
import { EmployeeService } from 'src/app/_services/employee.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'email', 'status', 'actions'];
  dataSource = new MatTableDataSource<Employees>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private titleService: Title,
    private employeeService: EmployeeService,
    private notificationService: NotificationService
  ) {

  }

  ngOnInit() {
    this.titleService.setTitle('Employee List');
    this.getEmployees();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  add() {
    this.router.navigate(['/employees/add']);
  }

  edit(id:string) {
    this.router.navigate(['/employees/edit/',id]);
  }

  filter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLocaleLowerCase();
  }

  getEmployees() {
    this.employeeService.get().subscribe(res => {
      console.log(res)
      console.log(res.length)
      this.dataSource.data = res.length > 0 ? res as Employees[] : [];
    }, err => {
      console.log(err);
      this.notificationService.openSnackBar('something went wrong')
    })
  }

}
