import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEmployeeComponent } from './pages/add-employee/add-employee.component';
import { EditEmployeeComponent } from './pages/edit-employee/edit-employee.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register';
import { SearchEmployeeComponent } from './pages/search-employee/search-employee.component';
import { StatusComponent } from './pages/status/status.component';
import { ViewEmployeesComponent } from './pages/view-employees/view-employees.component';
import { AuthGuard } from './_helpers';
// import { AuthGuard } from './_helpers';

const routes: Routes = [
  { path: '', component: HomeComponent , canActivate:[AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'edit-employee/:id', component: EditEmployeeComponent},
  { path: 'add-employee', component: AddEmployeeComponent},
  { path: 'view-employees', component: ViewEmployeesComponent},
  { path: 'search-employees', component: SearchEmployeeComponent},
  { path: 'status', component: StatusComponent},
  { path: 'profile', component: ProfileComponent},


  // otherwise redirect to home
  { path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const appRoutingModule = RouterModule.forRoot(routes);