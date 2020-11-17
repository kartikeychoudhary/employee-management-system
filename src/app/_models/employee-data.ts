import { ThrowStmt } from '@angular/compiler';

export class EmployeeData {
  id: number;
  fname: string;
  lname: string;
  designation: string;
  salary: string;
  doj: string;
  skills: number;
  constructor(id, fname, lname, designation, salary, doj, skills){
    this.id = id;
    this.fname = fname;
    this.lname = lname;
    this.designation = designation;
    this.salary = salary;
    this.doj = doj;
    this.skills = skills;
  }
}
