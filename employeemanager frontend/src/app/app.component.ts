import { Component, OnInit } from '@angular/core';
import { Employee } from "./employee";
import { EmployeeService } from "./employee.service";
import { HttpErrorResponse } from "@angular/common/http";
import { NgForm } from '@angular/forms'

@Component({
  // The @Component decorator is used to define the metadata for the AppComponent, including the selector, template URL, and style URLs. The selector 'app-root' is the custom HTML tag that represents this component in the application. The templateUrl points to the HTML file that contains the structure of the component's view, and styleUrls points to the CSS file that contains the styles for this component.
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
// The AppComponent class is the main component of the application that manages the employee data and interactions with the EmployeeService. It implements the OnInit interface to perform initialization tasks when the component is loaded.
export class AppComponent implements OnInit{
  // The AppComponent class has three public properties: employees, editEmployee, and deleteEmployee. The employees property is an array that holds the list of employees fetched from the server. The editEmployee property is used to store the employee data that is currently being edited in the edit modal. The deleteEmployee property (commented out) can be used to store the employee data that is currently being deleted in the delete modal.
  public employees: Employee[];
  public editEmployee: Employee;
  public deleteEmployee: Employee;

  constructor(private employeeService: EmployeeService) { }

  // The ngOnInit method is a lifecycle hook in Angular that is called after the component has been initialized. In this case, it calls the getEmployees method to fetch the list of employees from the server when the component is loaded.
  ngOnInit() {
    // When the component is initialized, fetch the list of employees from the server
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
  // The onAddEmployee method is responsible for handling the addition of a new employee. It takes a NgForm as an argument, which contains the form data for the new employee. The method simulates a click on a hidden button to close the modal after adding an employee, then it calls the addEmployee method of the EmployeeService with the form values. If the request is successful, it logs the response, refreshes the list of employees, and resets the form. If there is an error, it alerts the user with the error message.
  public onAddEmployee(addForm: NgForm): void {
    // Simulate a click on the hidden button to close the modal after adding an employee
    document.getElementById('add-employee-form').click();
    // The form values are automatically mapped to the Employee object based on the name attributes of the form fields
    this.employeeService.addEmployee(addForm.value).subscribe(
      // The response from the server is expected to be the added Employee object, which can be used to update the UI or for debugging purposes
      (response: Employee) => {
        // Log the response
        console.log(response);
        // After adding an employee, refresh the list of employees
        this.getEmployees();
        // Clear the form
        addForm.reset();
      },
      // Handle errors by alerting the user with the error message
      (error: HttpErrorResponse) => {
        // Alert the user with the error message if the request fails
        alert(error.message); 
      }
    );
  }

  // The onUpdateEmployee method is responsible for handling the update of an existing employee. It takes an Employee object as an argument, which contains the updated data for the employee. Similar to the onAddEmployee method, it simulates a click on a hidden button to close the modal after updating an employee, then it calls the updateEmployee method of the EmployeeService with the updated employee data. If the request is successful, it logs the response and refreshes the list of employees. If there is an error, it alerts the user with the error message.
  public onUpdateEmployee(employee: Employee): void {
    // Simulate a click on the hidden button to close the modal after updating an employee
    document.getElementById('update-employee-form').click();
    // The employee object is expected to contain the updated data for the employee, which is passed to the updateEmployee method of the EmployeeService
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        // After updating an employee, refresh the list of employees to reflect the changes
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message); 
      }
    );
  }

  // The onOpenModal method is responsible for opening the appropriate modal based on the mode (add, edit, delete) and the selected employee.
  public onOpenModal(employee: Employee, mode: string): void {
    // This method dynamically creates a hidden button element and simulates a click on it to open the corresponding modal. The button's data-target attribute is set based on the mode, which determines which modal will be opened (addEmployeeModal, updateEmployeeModal, deleteEmployeeModal). If the mode is 'edit', it also sets the editEmployee property to the selected employee, which can be used to populate the form fields in the edit modal.
    const container = document.getElementById('main-container');
    // Create a hidden button element to trigger the modal
    const button = document.createElement('button');
    // Set the button type to 'button' to prevent form submission
    button.type = 'button';
    // Hide the button from view
    button.style.display = 'none';
    // Set the data-toggle attribute to 'modal' to enable Bootstrap modal functionality
    button.setAttribute('data-toggle', 'modal');
    // Set the data-target attribute based on the mode to determine which modal to open
    if (mode === 'add') {
      // For the 'add' mode, set the data-target to '#addEmployeeModal' to open the add employee modal
      button.setAttribute('data-target','#addEmployeeModal');
    }
    // If the mode is 'edit', set the editEmployee property to the selected employee and set the data-target to '#updateEmployeeModal' to open the edit employee modal
    if (mode === 'edit') {
      // Set the editEmployee property to the selected employee, which can be used to populate the form fields in the edit modal
      this.editEmployee = employee;
      // Set the data-target attribute to '#updateEmployeeModal' to open the edit employee modal
      button.setAttribute('data-target','#updateEmployeeModal');
    }
    // If the mode is 'delete', set the data-target to '#deleteEmployeeModal' to open the delete employee modal
    if (mode === 'delete') {
      // Set the data-target attribute to '#deleteEmployeeModal' to open the delete employee modal
      button.setAttribute('data-target','#deleteEmployeeModal');
    }
    // Append the hidden button to the container and simulate a click to open the modal
    container.appendChild(button);
    // Simulate a click on the hidden button to open the modal
    button.click();
  }

  
}
