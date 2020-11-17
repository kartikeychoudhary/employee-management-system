import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeData } from 'src/app/_models';
import { AdminBackend } from 'src/app/_services/admin-backend.service';

@Component({
  selector: 'app-search-employee',
  templateUrl: './search-employee.component.html',
  styleUrls: ['./search-employee.component.css']
})
export class SearchEmployeeComponent implements OnInit {
  employees: EmployeeData[] = [];
  reverse:boolean = false;
  key:string = "id";
  p:number=1;
  search:string="";
  searchKey:string="fname";
  admin:boolean=false;
  doj:boolean=false;

  startDate:number;
  endDate:number;

  constructor(private adminBackend: AdminBackend, private router: Router) {}

  refresh() {
    this.employees = [];
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

  onKey(event: any) { // without type info
    if(event.key === "Backspace"){
      this.search = "";
      this.Search();
    }
    this.search = event.target.value;
    this.Search();
  }

  handleSearchType(event:any){
    // console.log(event.target.value)
    this.searchKey = event.target.value;
    this.search = "";
    if(event.target.value === "doj"){
      this.doj = true;
    }else{
      this.doj =false;
    }
    this.Search();
  }

  handleStartDate(event:any){
    this.startDate = Date.parse(event.target.value);
  }

  handleEndDate(event:any){
    // this.ngOnInit();
    this.endDate = Date.parse(event.target.value);
    var count=0
    var temp = []
    this.employees.forEach(res=>{
      var dt = new Date(res['doj']).getTime()
      if(this.startDate <= dt && dt <= this.endDate){
        temp.push(res);
        count+=1;
      }
    });
    this.employees = temp;
    console.log(count);
  }

  Search(){
    if(this.search == ""){
      this.ngOnInit();
    }else{
      if(this.searchKey === 'doj'){
        var startDate = "01/01/2009";
        var endDate = "01/01/2020";
        var count = 0
        
        console.log(count)
      }else{
        this.employees = this.employees.filter(res=>{
          return res[this.searchKey].toLocaleLowerCase().match(this.search.toLocaleLowerCase());
        })
      }
      
    }
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
    if(localStorage.getItem("role") === "admin"){
      this.admin = true;
    }
    this.refresh();
  }
}
