import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeData } from 'src/app/_models';
import { AlertService, EmployeeBackend } from 'src/app/_services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  id: string;
  employee: EmployeeData;

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private employeeBackend: EmployeeBackend,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService
  ) {}

  refresh() {
    this.loginForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      designation: ['', Validators.required],
      salary: ['', Validators.required],
      doj: ['', Validators.required],
      skills: ['', Validators.required],
    });
    this.employeeBackend.getEmployeeData(parseInt(this.id)).subscribe((employee: any) => {
      this.employee = new EmployeeData(
        employee['id'],
        employee['fname'],
        employee['lname'],
        employee['designation'],
        employee['salary'],
        employee['doj'],
        employee['skills']
      );
      var date = new Date(employee['doj']).toString();

      this.loginForm = this.formBuilder.group({
        fname: [employee.fname, Validators.required],
        lname: [employee.lname, Validators.required],
        designation: [employee.designation, Validators.required],
        salary: [employee.salary, Validators.required],
        doj: [employee.doj, Validators.required],
        skills: [employee.skills, Validators.required],
      });
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.employeeBackend
      .updateEmployeeData(
        {
          // id:this.employee.id,
          fname: this.f.fname.value,
          lname: this.f.lname.value,
          designation: this.f.designation.value,
          salary: this.f.salary.value,
          doj: this.f.doj.value,
          skills: this.f.skills.value,
        },
        this.employee.id
      )
      .subscribe(
        (response) => {
          // console.log(response)
          this.loading = false;
          this.alertService.success(`Employee with id : ${this.employee.id} updated`);
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.id = localStorage.getItem('currentUser').toString();
    this.refresh()
  }
}
