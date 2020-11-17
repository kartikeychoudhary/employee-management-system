import { Component, OnInit } from '@angular/core';
import { AdminBackend } from 'src/app/_services/admin-backend.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
})
export class StatusComponent implements OnInit {
  employee_count: number = 0;
  total_salary: number = 0;
  designation_count: Object = {
    'Associate Software Engineer': 0,
    'Software Engineer': 0,
    'Senior Software Engineer': 0,
    'Team Lead': 0,
    'Technical Lead': 0,
    'Senior Technical Lead': 0,
    'Technical Manager': 0,
    'Project Manager': 0,
  };
  designation_array = [];

  constructor(private adminBackend: AdminBackend) {}

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true
          }
      }]
  }
  };
  public barChartLabels = [
    'Associate Software Engineer',
    'Software Engineer',
    'Senior Software Engineer',
    'Team Lead',
    'Technical Lead',
    'Senior Technical Lead',
    'Technical Manager',
    'Project Manager',
  ];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [], label:"Employees Count"},
  ];

  getSalary(){
    return this.total_salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  ngOnInit(): void {
    this.adminBackend.getEmployeeDataAll().subscribe((response: any) => {
      this.employee_count = response.length;
      response.forEach((employee: any) => {
        this.total_salary += parseInt(employee['salary']);
        this.designation_count[employee['designation']] += 1;
      });
      this.designation_array = Object.keys(this.designation_count);
      var temp = [];
      this.designation_array.forEach(key => {
        temp.push(this.designation_count[key])
      });
      this.barChartData = [
        {data: temp, label:"Employees Count"}
      ];
    });
  }
}
