import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { EmployeeData } from 'src/app/_models';
import { EmployeeBackend } from '../../_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {
  id: string;
  employee: EmployeeData;
  lastLogin:string;

  constructor(private employeeBackend: EmployeeBackend) {}

  ngOnInit() {
    this.id = localStorage.getItem('currentUser');
    if(localStorage.getItem("lastLogin")){
        this.lastLogin = localStorage.getItem("lastLogin");
    }else{
        this.lastLogin = new Date().toLocaleString();
    }
    this.loadUser();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
  }

  deleteUser(id: number) {}

  private loadUser() {
    this.employeeBackend
      .getEmployeeData(parseInt(this.id))
      .subscribe((employee) => {
        this.employee = new EmployeeData(
          employee['id'],
          employee['fname'],
          employee['lname'],
          employee['designation'],
          employee['salary'],
          employee['doj'],
          employee['skills']
        );
      });
  }
}
