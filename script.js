var my_library = []; //intialising array

function Book(name,author,pages,status) {
  //constructor
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

Book.prototype.toggle_status = function (){
// Add a button on each book’s display to change its read status.
// To facilitate this you will want to create the function that toggles a book’s read status on your Book prototype instance.
  if (this.status.toUpperCase() === "READ"){
    this.status = "not read";
  } 
  else{
    this.status = "read";
  }
}

function remove_book(index){
  //checks if index is in valid range
  if(index >= 0 && index < my_library.length){
    my_library.splice(index,1); //index is where you the position of item you want to remove, 1 is number of items to remove
  }
}

const add_book = document.createElement("button"); //creating html tags
add_book.textContent = "Add Book";

//display books out in the libary on the HTML
function displayBooks(){
  while(document.getElementById("books_container")){ //this loop checks if books_container exists in the html or not
    var to_remove = document.getElementById("books_container"); 
    to_remove.parentNode.removeChild(to_remove);//removes the element stored inside to_remove from its parent_node, this case it removes the books_container from its parent node - body
  }

  const container = document.createElement("div"); //creating a new div 
  container.setAttribute("id","books_container"); 
  document.body.appendChild(container);
  //below is a loop that will go through the items in my_library array, and then append the items onto the html page based on instructions set
  my_library.forEach(function(book,index){
    const card = document.createElement("div");
    card.innerHTML = `
    <h3>${book.name}</h3> 
    <h4>${book.author}</h4>
    <h6>${book.pages}</h6>
    <p>${book.status}</p>
    `; //setting the HTML layout up within the specified tag
    const remove_btn = document.createElement("button");
    remove_btn.textContent = "Remove book";
    container.appendChild(card); //appending the newly created tag and content, inside card_container

    remove_btn.addEventListener("click", function(){
      remove_book(index);
      displayBooks(); //recursion used here so that whenevr remove_btn is clicked, the item is removed and the HTML will be updated with the updated library contents
    })

    const book_status = document.createElement("button");
    book_status.textContent = "Change book status";
    container.appendChild(book_status);

    book_status.addEventListener("click", function(){
      book.toggle_status();
      // console.log(my_library) //test line to check if status been changed accordingly
    })

    card.appendChild(remove_btn);
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
  console.log(my_library);
  displayBooks(); //adding book(s) inside my_library to the html page
})

