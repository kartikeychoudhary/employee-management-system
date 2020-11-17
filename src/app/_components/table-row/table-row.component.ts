import { Component, Input, OnInit } from '@angular/core';
import { EmployeeData } from 'src/app/_models';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css']
})
export class TableRowComponent implements OnInit {

  @Input() employee: EmployeeData;  

  constructor() { }

  ngOnInit(): void {
  }

}
