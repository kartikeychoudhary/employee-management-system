import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class EmployeeBackend {
  public static baseUrl: 'http://localhost:6565/';

  constructor(private http: HttpClient) {
      console.log("test")
  }

  getEmployee() {
    return this.http
      .get('http://localhost:6565/employee', httpOptions)
      .pipe(map((response: Response) => {
          console.log(response);
          return response}));
  }

  getEmployeeData(id:number){
    return this.http
    .get(`http://localhost:6565/employee_data/${id.toString()}`, httpOptions)
    .pipe(map((response: Response) => {
        console.log(response);
        return response}));
  }

  updateEmployeeData(data, id){
    return this.http
    .patch(`http://localhost:6565/employee_data/${id}`, data,httpOptions)
    .pipe(map((response:Response)=> response));
  }

  raiseTicket(data){
    return this.http
    .patch(`http://localhost:6565/tickets`, data, httpOptions)
    .pipe(map((response:Response)=>response));
  }

  raiseTicketDetails(data){
    return this.http.patch(`http://localhost:6565/tickets_details`, data, httpOptions)
    .pipe(map((response:Response)=>{response}));
  }

  getTickets(){
    return this.http
    .get(`http://localhost:6565/tickets`, httpOptions)
    .pipe(map((response:Response)=>response));
  }

  getTicketsDetails(){
    return this.http
    .get(`http://localhost:6565/tickets_details`, httpOptions)
    .pipe(map((response:Response)=>response));
  }
}
