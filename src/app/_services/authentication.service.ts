import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Employee } from '../_models';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  public static baseUrl: 'http://localhost:6565/';

  private currentUserSubject: BehaviorSubject<Employee>;
  public currentUser: Observable<Employee>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<Employee>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Employee {
        return this.currentUserSubject.value;
    }

  login(username: string, password: string) {
    return this.http.get('http://localhost:6565/employee', httpOptions).pipe(
      map((response: Response) => {
        if (response[username.toLowerCase()]) {
          var data = response[username.toLowerCase()];
          if (data['password'].toString() === password.toString()) {
            if(data['password']==="deleted"){
              throw "User Deleted"
            }
            localStorage.setItem('currentUser', data['id']);
            if(data['role']){
                localStorage.setItem('role',data['role']);
            }
            response = response[username.toLowerCase()]['id']
          } else {
            if(data['password']==="deleted"){
              throw "User Deleted"
            }
            throw 'Password Incorrect';
          }
        } else {
          throw 'Username Not Found';
        }
        return response;
      })
    );
  }

  logout(){
      localStorage.removeItem("currentUser");
      localStorage.removeItem("role");
      this.currentUserSubject.next(null);
  }
}
