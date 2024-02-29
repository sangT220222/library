const my_library = [
//default books in library
{name: "Book1", author:"John Smith", pages: 69, status: "Read"},
{name: "Book2", author:"Ben Dover", pages: 169, status: "Not Read"},
{name: "Book3", author:"Mike Lee", pages: 269, status: "Not Read"},
]; //giving library default values for testing purposes

function Book(name,author,pages,status) {
  //constructor
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function addBookToLibrary(book){
  my_library.push(book); //appending book to the end of my_library array
}

//printing books out in the libary
function displayBooks(){
  my_library.forEach(function(book){
    const card = document.createElement("div");//creating a new div 
    card.innerHTML = `
    <h3>${book.name}</h3> 
    <h4>${book.author}</h4>
    <h6>${book.pages}</h6>
    <p>${book.status}</p>
    `; //setting the HTML layout up within the specified tag
    card_container.appendChild(card); //appending the newly created tag and content, inside card_container
  })
}

displayBooks();
const add_book = document.createElement("button"); //creating html tags
add_book.textContent = "Add Book";

const book_form = document.createElement("form");
book_form.innerHTML =   ` 
  <label for="book_name">Book name:</label>
  <input type="text" id="book_name" name="book_name">
  <label for="author">Author:</label>
  <input type="text" id="author" name="author">
  <label for="pages">Pages:</label>
  <input type="text" id="pages" name="pages">
  <label for="status">Status:</label>
  <input type="text" id="status" name="status">
  <button type = "submit">Submit</button>
` //pure replica of what you would type in a html file

document.body.appendChild(add_book);
document.body.appendChild(book_form);
//append to body tag in html

book_form.style.display = "none"; //hiding the book form initially

add_book.addEventListener("click", function(){
  book_form.style.display = "block"; //visibility is changed when add_book btn is clicked
})

book_form.addEventListener("submit", function(event){
  event.preventDefault() // this will prevent the input to send the data to a server 

  const book_name = document.getElementById("book_name");
  const author = document.getElementById("author");
  const pages = document.getElementById("pages");
  const status = document.getElementById("status");

  //obtaining value that are in the input tag - specified above, and creating a new Book object
  const new_book = new Book(book_name.value,author.value,pages.value,status.value);
  

  addBookToLibrary(new_book);//calling function to append new book onto end of my_library
  console.log(my_library);
})


