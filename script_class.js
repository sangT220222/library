class Book{
    constructor(name,author,pages,status){
        //we have made name,author,pages and status variables private and only accessible to Book class
        this._name = name;
        this._author = author;
        this._pages = pages;
        this._status = status;
    };

    get name(){
        return this._name;
    }

    set name(new_name){
        this._name = new_name;
    }
    get author(){
        return this._author;
    }

    set author(new_author){
        this._author = new_author;
    }
    get pages(){
        return this._pages;
    }

    set pages(new_pages){
        this._pages = new_pages;
    }
    get status(){
        return this._status;
    }

    set status(new_status){
        this._status = new_status;
    }

    toggle_status(){
        if (this.status.toUpperCase() === "READ"){
            this.status = "not read";
        } 
        else{
            this.status = "read";
        }
    }
}

var my_library = []; //intialising array

function remove_book(index){
    //checks if index is in valid range
    if(index >= 0 && index < my_library.length){
      my_library.splice(index,1); //index is where you the position of item you want to remove, 1 is number of items to remove
    }
  }

const add_book = document.createElement("button"); //creating html tags
add_book.textContent = "Add Book";


function displayBooks()
{
    const container = document.getElementById("books_container");

    if(container){
        container.remove(); //if container exists
    }
    const new_container = document.createElement("div"); //creating a new div 
    new_container.setAttribute("id","books_container"); 
    document.body.appendChild(new_container);
  
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
        new_container.appendChild(card); //appending the newly created tag and content, inside card_container
    
        remove_btn.addEventListener("click", function(){
          remove_book(index);
          displayBooks(); //recursion used here so that whenevr remove_btn is clicked, the item is removed and the HTML will be updated with the updated library contents
        });

        const book_status = document.createElement("button");
        book_status.textContent = "Change book status";
        new_container.appendChild(book_status);

        book_status.addEventListener("click", function () {
        book.toggle_status();
        displayBooks();
        });
        card.appendChild(remove_btn);
    });
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
  });