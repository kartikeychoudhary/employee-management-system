import { Component, OnInit } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.css'],
})
export class SidebarAdminComponent implements OnInit {
  active: string = '';
  logInState:boolean=false;
  admin:boolean=false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {}

  ngOnInit(): void {
    var temp = window.location.href.split('/');
    this.active = temp[temp.length - 1];

    if(localStorage.getItem("currentUser")){
      if(localStorage.getItem("role")==="admin"){
        this.admin = true;
      }
      this.logInState = true;
    }
  }

  logout() {
    this.authenticationService.logout();
    localStorage.setItem("lastLogin", new Date().toLocaleString());
    this.router.navigate(['/']);
  }
}
