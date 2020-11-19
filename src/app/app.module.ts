import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend

import { appRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home';
import { LoginComponent } from './pages/login';
import { RegisterComponent } from './pages/register';
import { AlertComponent } from './_components/alert';
import { SidebarAdminComponent } from './_components/sidebar-admin';
import { ViewEmployeesComponent } from './pages/view-employees/view-employees.component';
import { StatusComponent } from './pages/status/status.component';
import { EditEmployeeComponent } from './pages/edit-employee/edit-employee.component';
import { AddEmployeeComponent } from './pages/add-employee/add-employee.component';
import { TableRowComponent } from './_components/table-row/table-row.component';
import { SearchEmployeeComponent } from './pages/search-employee/search-employee.component';
import { ProfileComponent } from './pages/profile/profile.component';

import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {Ng2OrderModule} from 'ng2-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { ChartsModule } from 'ng2-charts';
import { TicketRaiseComponent } from './pages/ticket-raise/ticket-raise.component';
import { AdminTicketsComponent } from './pages/admin-tickets/admin-tickets.component';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        Ng2SearchPipeModule,
        Ng2OrderModule,
        NgxPaginationModule,
        ChartsModule,
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        SidebarAdminComponent,
        AlertComponent,
        ViewEmployeesComponent,
        StatusComponent,
        EditEmployeeComponent,
        AddEmployeeComponent,
        TableRowComponent,
        SearchEmployeeComponent,
        ProfileComponent,
        TicketRaiseComponent,
        AdminTicketsComponent,
        
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };