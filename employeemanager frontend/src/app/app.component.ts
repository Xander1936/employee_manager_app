import { Component, OnInit } from '@angular/core';
import { Employee } from "./employee";
import { EmployeeService } from "./employee.service";
import { HttpErrorResponse } from "@angular/common/http";
// import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public employees: Employee[];
  // public editEmployee: Employee;
  // public deleteEmployee: Employee;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        console.log(this.employees);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(employee: Employee, mode: string): void {
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
  }

  
}
