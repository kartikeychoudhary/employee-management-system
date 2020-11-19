import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeData } from 'src/app/_models';
import { AlertService, EmployeeBackend } from 'src/app/_services';
import { AdminBackend } from 'src/app/_services/admin-backend.service';

@Component({
  selector: 'app-ticket-raise',
  templateUrl: './ticket-raise.component.html',
  styleUrls: ['./ticket-raise.component.css'],
})
export class TicketRaiseComponent implements OnInit {
  id: string;
  employee: EmployeeData;
  username: string;

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  tickets: any[];
  tickets_details: {};

  constructor(
    private route: ActivatedRoute,
    private employeeBackend: EmployeeBackend,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService
  ) {}

  refresh() {
    this.loginForm = this.formBuilder.group({
      issue: ['', Validators.required],
      department: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    var temp = {};
    var date = Date.now().toString();
    temp[date] = {
      fname: this.employee.fname,
      lname: this.employee.lname,
      designation: this.employee.designation,
      issue: this.f.issue.value,
      department: this.f.department.value,
      status: 'awaited',
    };
    console.log(temp);
    this.tickets.push(date);
    var ticket = {};
    ticket[this.username] = this.tickets;
    this.employeeBackend.raiseTicket(ticket).subscribe(
      (response: any) => {
        this.employeeBackend.raiseTicketDetails(temp).subscribe((response) => {
          this.alertService.success('Ticket Raised');
          this.loading = false;
          window.location.reload();
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
    this.username = localStorage.getItem('username');
    this.id = localStorage.getItem('currentUser');
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
          console.log(this.employee)
        this.employeeBackend.getTickets().subscribe((ticketsAll: any) => {
          if (ticketsAll[this.username]) {
            this.tickets = ticketsAll[this.username];
          }else{
            this.tickets = [];
          }

          this.employeeBackend
            .getTicketsDetails()
            .subscribe((ticketsDetails: any) => {
              this.tickets_details = ticketsDetails;
              console.log(ticketsDetails);
            });
        });
      });

      this.refresh();

  }
}
