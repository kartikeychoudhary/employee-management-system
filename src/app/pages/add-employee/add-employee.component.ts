import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeData } from 'src/app/_models';
import { AlertService } from 'src/app/_services';
import { AdminBackend } from 'src/app/_services/admin-backend.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  id: number;
  employee: EmployeeData;
  username: string;

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
    this.loginForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      designation: ['', Validators.required],
      salary: ['', Validators.required],
      doj: ['', Validators.required],
      skills: ['', Validators.required],
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
      .addEmployeeData({
        fname: this.f.fname.value,
        lname: this.f.lname.value,
        designation: this.f.designation.value,
        salary: this.f.salary.value,
        doj: this.f.doj.value,
        skills: this.f.skills.value,
      })
      .subscribe(
        (response: any) => {
          this.username = this.f.fname.value + '_' + response.id;
          var temp = {};
          temp[this.username.toLowerCase()] = {
            id: response['id'],
            password: '12345678',
          };
          this.id = response['id'];
          this.adminBackend.addEmployee(temp).subscribe((response:any) => {
            this.loading = false;
            console.log( `Employee with username : ${this.f.fname.value.toLowerCase()}_${this.id} created.`, response)
            this.alertService.success(
              `Employee with username : ${this.f.fname.value.toLowerCase()}_${this.id} created.`
            );
          });
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
    this.refresh();
  }
}
