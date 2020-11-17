import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeData } from 'src/app/_models';
import { AdminBackend } from 'src/app/_services/admin-backend.service';

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.css'],
})
export class ViewEmployeesComponent implements OnInit {
  employees: EmployeeData[] = [];
  reverse:boolean = false;
  key:string = "id";
  p:number=1;

  constructor(private adminBackend: AdminBackend, private router: Router) {}

  refresh() {
    this.adminBackend.getEmployeeDataAll().subscribe((arrayData: any) => {
      arrayData.forEach((employee) => {
        this.employees.push(
          new EmployeeData(
            employee['id'],
            employee['fname'],
            employee['lname'],
            employee['designation'],
            employee['salary'],
            employee['doj'],
            employee['skills']
          )
        );
      });
    });
  }

  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  redirectEdit(id) {
    this.router.navigate([`edit-employee/${id}`]);
  }

  status() {
    console.log(this.employees);
  }

  ngOnInit(): void {
    this.refresh();
  }
}
