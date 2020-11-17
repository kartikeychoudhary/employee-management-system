# EmployeeManagementSystem

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.0.

# Steps to Follow 
    1. Run `npm install`
    2. run `json-server ./json.db --port 6565`
    3. Run `ng serve`

- To create a user admin add key 'role':'admin' in employee object in json.db
- By default username : "aida_27" with default password : "12345678" is a admin user.

# User Modal
I have used EmployeeData and Employee class modals to populate the data into the web application, Where Employee contains the password and employee id and EmployeeData contains dummy data for their skills.

 - If you Modify json.db make sure you change the Modals in the src.
 - Also id is used to maintain session using currentUser  which is store in the localStorage.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


