//import { Component } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from './student';


@Component({
  selector: 'app-root',
  templateUrl: './student.html',
 // templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
//export class AppComponent {
//  title = 'angular-tour-of-heroes';
//}

export class AppComponent implements OnInit {

  //if submit button is pressed
  submitted = false;
 
 // if edit button is pressed
  edited = false;
 
  //default value
  student = new Student(42, 'Tom', 'Patel');
  
  studentList: Array<Student> = []
 
  constructor(private http: HttpClient){
 
   }
 
  onSubmit() { 
  //this.submitted = true; 
  
  if (this.edited == true) return;
 
  // const stu = {
  //   first_name: this.student.firstName,
  //   last_name: this.student.lastName,
  // }    
 
 //Calling REST Service
  this.http.post('http://localhost:9000/students/', this.student)
     .subscribe(
       (res) => {
           console.log(res);
           this.getAllStudents();
              }
     );
   }
 
  onPutSubmit() {
 
  this.edited = true; 
  
  // const stu = {
  //   first_name: this.student.firstName,
  //   last_name: this.student.lastName,
  // }   
  
  // Create a student record in the database
  this.http.put('http://localhost:9000/students/'+ this.student.id, this.student)
     .subscribe(() => {
         this.getAllStudents();  //calling 
     });
   }
 
 // execute this method, on page initialization 
  ngOnInit() {
       this.getAllStudents();  //calling 
   }
   
   
  // Read all students records from the database
  getAllStudents(){
  this.http.get('http://localhost:9000/students')
     .subscribe((students: Array<Student>) => {
        this.studentList = students;   //assign 
     });
   }
   
   
  // Update a student record in the database
  onEditClick(event: any, data: any) {
   console.log(data);
   // assign value to model
   this.student.id = data.id;
   this.student.firstName = data.firstName;
   this.student.lastName = data.lastName;    
   }
   
   
  // Delete a student record in the database
 onDeleteClick(event: any, data: Student) {
  this.http.delete('http://localhost:9000/students/'+data.id)
     .subscribe(() => {
  this.getAllStudents();
     });
   }
 
 }
 