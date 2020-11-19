import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class AdminBackend {
  public static baseUrl: 'http://localhost:6565/';

  constructor(private http: HttpClient) {
    console.log('test');
  }

  getEmployee() {
    return this.http.get('http://localhost:6565/employee', httpOptions).pipe(
      map((response: Response) => {
        console.log(response);

        return response;
      })
    );
  }

  getEmployeeData(id: number) {
    return this.http
      .get(`http://localhost:6565/employee_data/${id.toString()}`, httpOptions)
      .pipe(
        map((response: Response) => {
          console.log(response);
          return response;
        })
      );
  }

  getEmployeeDataAll() {
    return this.http
      .get('http://localhost:6565/employee_data', httpOptions)
      .pipe(
        map((response: Response) => response),
        tap((employees) => employees)
      );
  }

  addEmployeeData(data) {
    return this.http
      .post('http://localhost:6565/employee_data', data, httpOptions)
      .pipe(map((response: Response) => response));
  }

  addEmployee(data) {
    return this.http
      .patch('http://localhost:6565/employee', data, httpOptions)
      .pipe(map((response: Response) => response));
  }

  updateEmployeeData(data, id) {
    return this.http
      .patch(`http://localhost:6565/employee_data/${id}`, data, httpOptions)
      .pipe(map((response: Response) => response));
  }

  deleteEmployeeData(id) {
    return this.http
      .delete(`http://localhost:6565/employee_data/${id}`, httpOptions)
      .pipe(map((response: Response) => response));
  }

  deleteEmployee(username) {
    var temp = {};
    temp[username] = { id: 'deleted', password: 'deleted' };
    return this.http
      .patch('http://localhost:6565/employee', temp, httpOptions)
      .pipe(map((response: Response) => response));
  }

  getTicketsDetails() {
    return this.http
      .get(`http://localhost:6565/tickets_details`, httpOptions)
      .pipe(map((response: Response) => response));
  }

  changeTicketsStatus(data) {
    return this.http
      .patch(`http://localhost:6565/tickets_details`, data, httpOptions)
      .pipe(
        map((response: Response) => {
          response;
        })
      );
  }
}
