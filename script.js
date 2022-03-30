let myLibrary = [];
let readScore = 0;
let notReadScore = 0;


// DS

class Book {
    constructor(title, author, isRead) {
        this.title = title;
        this.author = author;
        this.isRead = isRead;
    }

    toggleRead() {
        this.isRead = !this.isRead;
    }
}


// UI

const body = document.querySelector("body");
const library = document.querySelector(".library");
const form = document.querySelector(".form");
const displayTotalScore = document.querySelector("#total-score");
const displayReadScore = document.querySelector("#read-score");
const displayNotReadScore = document.querySelector("#not-read-score");
const addBookButton = document.querySelector("#add-book");
const submitBookButton = document.querySelector("#submit-form");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const checkboxInput = document.querySelector("#read-checkbox");
const container = document.querySelector(".card-container");


// display

function removeDisplay() {
    const cardContainer = document.querySelector(".card-container");
    while (cardContainer.firstChild) {
        cardContainer.removeChild(cardContainer.lastChild);
    }
}

function display() {
    const cardContainer = document.querySelector(".card-container");

    for (let book of myLibrary) {
        const card = document.createElement("div");
        card.classList.add("card");

        const title = document.createElement("p");
        title.textContent = book.title;
        card.appendChild(title);

        const author = document.createElement("p");
        author.textContent = book.author;
        card.appendChild(author);

        if (book.isRead) {
            card.classList.add("have-read");
        } else {
            card.classList.add("have-not-read");
        }

        const toggleReadButton = document.createElement("button");
        if (book.isRead) {
            toggleReadButton.textContent = "Unread";
        } else {
            toggleReadButton.textContent = "Read";
        }
        toggleReadButton.classList.add("toggle-button");
        card.appendChild(toggleReadButton);

        const removeCardButton = document.createElement("button");
        removeCardButton.textContent = "Remove";
        removeCardButton.classList.add("remove-button");
        card.appendChild(removeCardButton);

        cardContainer.appendChild(card);
    }
}

function closeFormDisplay() {
    library.classList.remove("opaque");
    form.style.visibility = "hidden";
}

function displayScore() {
    

    displayTotalScore.textContent = (readScore + notReadScore);
    displayReadScore.textContent = readScore;
    displayNotReadScore.textContent = notReadScore;
}


// adding book using modal form

function addBookToLibrary(title, author, isRead) {
    myLibrary.push(new Book(title, author, isRead));
    if (isRead) {
        readScore++;
    } else {
        notReadScore++;
    }
    displayScore();
}

function addBook() {
    addBookButton.addEventListener("click", () => {
        openForm();
    })
    submitBookButton.addEventListener("click", () => {
        closeForm();
    })
}

function openForm() {
    form.style.visibility = "visible";
    library.classList.add("opaque");
}

function closeForm() {
    addBookToLibrary(titleInput.value, authorInput.value, checkboxInput.checked);

    titleInput.value = "";
    authorInput.value = "";
    checkboxInput.checked = false;

    removeDisplay();
    display();
    closeFormDisplay();
}

function forceCloseForm() {
    body.addEventListener("click", (event) => {
        if (form != event.target && 
            !form.contains(event.target) &&
            !addBookButton.contains(event.target)) {
               closeFormDisplay();
        }
    })
}


// toggle and remove buttons

function toggleRemove() {
    container.addEventListener("click", (event) => {
        const button = event.target.closest("button");
        const card = event.target.closest(".card");

        if (button == null) {
            return;
        }
        
        if (button.classList.contains("remove-button")) {
            removeButton(card);
        } else if (button.classList.contains("toggle-button")) {
            toggleButton(card, button);
        }
    })
}

function toggleButton(card, button) {
    if (card.classList.contains("have-read")) {
        card.classList.remove("have-read");
        card.classList.add("have-not-read");
        button.textContent = "Read";
        readScore--;
        notReadScore++;
    } else {
        card.classList.remove("have-not-read");
        card.classList.add("have-read");
        button.textContent = "Unread";
        readScore++;
        notReadScore--;
    }

    const cardTitle = card.firstChild.textContent;
    for (let i = 0; i < myLibrary.length; i++) {
        let book = myLibrary[i];
        if (book.title == cardTitle) {
            book.toggleRead();
            break;
        }
    }
    displayScore();
}

function removeButton(card) {
    const cardTitle = card.firstChild.textContent;
    for (let i = 0; i < myLibrary.length; i++) {
        let book = myLibrary[i];
        if (book.title == cardTitle) {
            if (book.isRead) {
                readScore--;
            } else {
                notReadScore--;
            }
            myLibrary.splice(i, 1);
        }
    }
    removeDisplay();
    display();
    displayScore();
}

function main() {
    display();
    addBook();
    toggleRemove();
    forceCloseForm();
}

main();