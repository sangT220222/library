var my_library = []; //intialising array

function Book(name,author,pages,status) {
  //constructor
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

const add_book = document.createElement("button"); //creating html tags
add_book.textContent = "Add Book";

//printing books out in the libary
function displayBooks(){
  while(document.getElementById("books_container")){ //this loop checks if books_container exists in the html or not
    var to_remove = document.getElementById("books_container"); 
    to_remove.parentNode.removeChild(to_remove);//removes the element stored inside to_remove from its parent_node, this case it removes the books_container from its parent node - body
  }

  const container = document.createElement("div"); //creating a new div 
  container.setAttribute("id","books_container"); 
  document.body.appendChild(container);
  //below is a loop that will go through the items in my_library array, and then append the items onto the html page based on instructions set
  my_library.forEach(function(book){
    const card = document.createElement("div");
    card.innerHTML = `
    <h3>${book.name}</h3> 
    <h4>${book.author}</h4>
    <h6>${book.pages}</h6>
    <p>${book.status}</p>
    `; //setting the HTML layout up within the specified tag
    container.appendChild(card); //appending the newly created tag and content, inside card_container
  })
}

const book_form = document.createElement("dialog");
book_form.innerHTML =   ` 
  <form method = "dialog">
    <label for="book_name">Book name:</label>
    <input type="text" id="book_name" name="book_name">
    <label for="author">Author:</label>
    <input type="text" id="author" name="author">
    <label for="pages">Pages:</label>
    <input type="text" id="pages" name="pages">
    <label for="status">Status:</label>
    <input type="text" id="status" name="status">
    <button type = "submit">Submit</button>
  </form>
` //pure replica of what you would type in a html file

document.body.appendChild(add_book);  
document.body.appendChild(book_form);
// book_form.style.display = "none"; //hiding the book form initially

add_book.addEventListener("click", function(){
  // book_form.style.display = "block"; //visibility is changed when add_book btn is clicked
  book_form.showModal();
})

book_form.addEventListener("submit", function(event){
  event.preventDefault(); // this will prevent the input to send the data to a server 

  const book_name = document.getElementById("book_name");
  const author = document.getElementById("author");
  const pages = document.getElementById("pages");
  const status = document.getElementById("status");

  //obtaining value that are in the input tag - specified above, and creating a new Book object
  var new_book = new Book(book_name.value,author.value,pages.value,status.value);
  
  my_library.push(new_book); //appending created book into the end of my_library array
  book_form.close();
  displayBooks(); //adding book(s) inside my_library to the html page
})




