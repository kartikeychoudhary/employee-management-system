import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeData } from 'src/app/_models';
import { AlertService } from 'src/app/_services';
import { AdminBackend } from 'src/app/_services/admin-backend.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  id: number;
  employee: EmployeeData;

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private adminBackend: AdminBackend,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService
  ) {}

  refresh() {
    this.adminBackend.getEmployeeData(this.id).subscribe((employee: any) => {
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

  handleDelete() {
    this.adminBackend.deleteEmployeeData(this.id).subscribe(() => {
      var t = this.employee.fname + '_' + this.id;
      this.adminBackend.deleteEmployee(t).subscribe(() => {
        console.log('deleted');
        this.router.navigate(['/view-employees']);
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
    this.adminBackend
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
          this.alertService.success(
            `Employee with id : ${this.employee.id} updated`
          );
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
    this.id = this.route.snapshot.params['id'];
    this.refresh();
  }
}
