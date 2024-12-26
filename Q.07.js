// books.js

// Constructor function to define a Book object
function Book(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
  }
  
  // Add a method to the prototype of Book that returns a book summary
  Book.prototype.getSummary = function() {
    return `${this.title} by ${this.author}, published in ${this.year}`;
  };
  
  // Create an array of Book instances (collection of books)
  const books = [
    new Book("To Kill a Mockingbird", "Harper Lee", 1960),
    new Book("1984", "George Orwell", 1949),
    new Book("The Great Gatsby", "F. Scott Fitzgerald", 1925),
    new Book("Moby Dick", "Herman Melville", 1851),
    new Book("Pride and Prejudice", "Jane Austen", 1813)
  ];
  
  // Export the array of books so it can be imported in other files
  module.exports = books;

// app.js

// Import the books array from books.js
const books = require('./books');

// Use Array.prototype.map to generate an array of book summaries
const bookSummaries = books.map(book => book.getSummary());

// Log the array of book summaries to the console
console.log(bookSummaries);
