import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeData, TicketDetails } from 'src/app/_models';
import { AlertService, EmployeeBackend } from 'src/app/_services';
import { AdminBackend } from 'src/app/_services/admin-backend.service';

@Component({
  selector: 'app-admin-tickets',
  templateUrl: './admin-tickets.component.html',
  styleUrls: ['./admin-tickets.component.css'],
})
export class AdminTicketsComponent implements OnInit {
  tickets: any[] = [];

  constructor(
    private adminBackend: AdminBackend,
    private router: Router,
    private alertService: AlertService
  ) {}

  returnDate(date) {
    return new Date(parseInt(date)).toLocaleDateString();
  }

  refresh() {}

  handleStatus(ticket, event) {
    console.log(ticket, event.target.value);

    var temp = {};
    temp[ticket.id] = {
      fname: ticket.fname,
      lname: ticket.lname,
      designation: ticket.designation,
      issue: ticket.issue,
      department: ticket.department,
      status: event.target.value,
    };

    this.adminBackend.changeTicketsStatus(temp).subscribe((response) => {
      this.alertService.success(`${ticket.id} : updated`);
    })
  }

  ngOnInit(): void {
    this.adminBackend.getTicketsDetails().subscribe((response: any) => {
      Object.keys(response).forEach((key: string) => {
        this.tickets.push(
          new TicketDetails(
            key,
            response[key]['fname'],
            response[key]['lname'],
            response[key]['designation'],
            response[key]['issue'],
            response[key]['department'],
            response[key]['status']
          )
        );
      });
    });

    this.refresh();
  }
}
