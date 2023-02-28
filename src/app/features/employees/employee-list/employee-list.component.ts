import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';
import { Employees } from 'src/app/_models/employees';
import { EmployeeService } from 'src/app/_services/employee.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeModal } from '../modal/employee-modal.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'email', 'status', 'actions'];
  dataSource = new MatTableDataSource<Employees>();

  filterKeyword!: string;
  pageState!: PageEvent;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private titleService: Title,
    private employeeService: EmployeeService,
    private notificationService: NotificationService
  ) {
    this.filterKeyword = localStorage.getItem('filterPageEmployeList')! || "";
    this.pageState = JSON.parse(localStorage.getItem('pageStateEmployeeList')!) || this.pageState;
    this.dataSource.data = JSON.parse(localStorage.getItem('employeeList')!) || this.dataSource.data;
  }

  ngOnInit() {
    this.titleService.setTitle('Employee List');
    this.getEmployees();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  updateStorageList(data: Employees[]) {
    localStorage.setItem('employeeList', JSON.stringify(data));
  }

  add() {
    this.router.navigate(['/employees/add']);
  }

  edit(id: string) {
    this.router.navigate(['/employees/edit/', id]);
  }

  filter() {
    localStorage.setItem('filterPageEmployeList', this.filterKeyword);
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.get().subscribe(res => {
      const data = res.length > 0 ? res as Employees[] : [];
      this.updateStorageList(data);
      this.dataSource.data = data;
      this.dataSource.filter = this.filterKeyword.trim().toLocaleLowerCase();
    }, err => {
      console.log(err);
      this.notificationService.openSnackBar('something went wrong')
    })
  }

  getEmployee(id: string, modalType: string) {
    this.employeeService.getById(id).subscribe(res => {
      this.openDialog(res, modalType);
    }, err => {
      console.log(err);
      this.notificationService.openSnackBar('something went wrong')
    })
  }

  deleteEmployee(id: string) {
    this.employeeService.delete(id).subscribe(res => {
      this.getEmployees();
    }, err => {
      console.log(err);
      this.notificationService.openSnackBar('something went wrong')
    })
  }

  openDialog(employee: Employees, type: string) {
    const dialogRef = this.dialog.open(EmployeeModal, {
      data: {
        type,
        employee,
        loading: false
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteEmployee(result.employee.id)
      }
    });
  }

  changePage(event: PageEvent) {
    this.pageState = event;
    localStorage.setItem('pageStateEmployeeList', JSON.stringify(this.pageState))
  }

  show(id: string) {
    this.getEmployee(id, 'Detail');
  }

  delete(id: string) {
    this.getEmployee(id, 'Delete');
  }


}
