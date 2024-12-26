// book.js

// Book constructor to initialize the book properties
function Book(title, author, isAvailable = true) {
  this.title = title;
  this.author = author;
  this.isAvailable = isAvailable;
}

module.exports = Book;

// member.js

// Member constructor to initialize member's name and borrowed books
function Member(name) {
    this.name = name;
    this.borrowedBooks = []; // Stores the titles of borrowed books
  }
  
  // Add borrowBook method to the prototype of Member
  Member.prototype.borrowBook = function(book) {
    // Check if the book is available
    if (!book.isAvailable) {
      console.log(`${book.title} is already borrowed.`);
      return;
    }
  
    // Check if the member has already borrowed 3 books
    if (this.borrowedBooks.length >= 3) {
      console.log(`${this.name} cannot borrow more than 3 books.`);
      return;
    }
  
    // Mark the book as unavailable and add it to the member's borrowed books
    book.isAvailable = false;
    this.borrowedBooks.push(book.title);
    console.log(`${this.name} successfully borrowed "${book.title}".`);
  };
  
  module.exports = Member;

// premiumMember.js

const Member = require('./member');

// PremiumMember constructor inherits from Member
function PremiumMember(name) {
  Member.call(this, name); // Call the Member constructor to initialize properties
  this.specialCollectionAccess = true; // Premium members have access to special collections
}

// Set up inheritance from Member
PremiumMember.prototype = Object.create(Member.prototype);
PremiumMember.prototype.constructor = PremiumMember;

// Override the borrowBook method to allow premium members to borrow more books
PremiumMember.prototype.borrowBook = function(book) {
  if (this.borrowedBooks.length >= 5) {
    console.log(`${this.name} cannot borrow more than 5 books.`);
    return;
  }

  // Use the Member's borrowBook method for non-special books
  if (!book.isAvailable) {
    console.log(`${book.title} is already borrowed.`);
    return;
  }

  // Borrow the book and mark it as unavailable
  book.isAvailable = false;
  this.borrowedBooks.push(book.title);
  console.log(`${this.name} successfully borrowed "${book.title}".`);

  // Special Collection books can also be borrowed without limits
  if (this.specialCollectionAccess) {
    console.log(`${this.name} has access to special collections!`);
  }
};

module.exports = PremiumMember;

// app.js

const Book = require('./book');
const Member = require('./member');
const PremiumMember = require('./premiumMember');

// Create book objects
const book1 = new Book("JavaScript: The Good Parts", "Douglas Crockford");
const book2 = new Book("Clean Code", "Robert C. Martin");
const book3 = new Book("Design Patterns", "Erich Gamma");
const book4 = new Book("The Pragmatic Programmer", "Andrew Hunt");
const book5 = new Book("The Mythical Man-Month", "Frederick P. Brooks");

// Create a regular member and a premium member
const regularMember = new Member("John Doe");
const premiumMember = new PremiumMember("Jane Smith");

// Regular member borrows books
regularMember.borrowBook(book1); // Success
regularMember.borrowBook(book2); // Success
regularMember.borrowBook(book3); // Success
regularMember.borrowBook(book4); // Cannot borrow more than 3 books

// Premium member borrows books
premiumMember.borrowBook(book1); // Success
premiumMember.borrowBook(book2); // Success
premiumMember.borrowBook(book3); // Success
premiumMember.borrowBook(book4); // Success
premiumMember.borrowBook(book5); // Success (can borrow 5 books)

// Create a bound function for borrowing books
const borrowBookForRegular = regularMember.borrowBook.bind(regularMember);
borrowBookForRegular(book4); // Regular member borrows book4 using bound function

