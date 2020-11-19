import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

export class TicketDetails {
  id: string;
  fname: string;
  lname: string;
  designation: string;
  issue: string;
  department: string;
  status: string;

  constructor(id, fname, lname, designation, issue, department, status) {
    this.id = id;
    this.fname = fname;
    this.lname = lname;
    this.designation = designation;
    this.issue = issue;
    this.department = department;
    this.status = status;
  }
}
