// Base class User
class User {
    constructor(name, email) {
      this.name = name;
      this.email = email;
    }
  
    // Method to get user details
    getDetails() {
      console.log(`Name: ${this.name}, Email: ${this.email}`);
    }
  }
  
  // Student class inheriting from User
  class Student extends User {
    constructor(name, email, studentId) {
      super(name, email); // Call the constructor of the User class
      this.studentId = studentId;
    }
  
    // Method to enroll the student
    enroll() {
      console.log(`Student ${this.name} has enrolled.`);
    }
  }
  
  // Instructor class inheriting from User
  class Instructor extends User {
    constructor(name, email, instructorId) {
      super(name, email); // Call the constructor of the User class
      this.instructorId = instructorId;
    }
  
    // Method to assign grades
    assignGrade() {
      console.log(`Instructor ${this.name} assigned a grade.`);
    }
  }
  
  // Demonstration
  
  // Creating an instance of Student
  const student1 = new Student("Alice Johnson", "alice@example.com", "S123");
  student1.getDetails();  // Call method from User class
  student1.enroll();      // Call method from Student class
  
  // Creating an instance of Instructor
  const instructor1 = new Instructor("Dr. John Smith", "john@example.com", "I456");
  instructor1.getDetails();  // Call method from User class
  instructor1.assignGrade(); // Call method from Instructor class
  