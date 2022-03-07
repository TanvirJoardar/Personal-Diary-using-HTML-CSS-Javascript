let form = document.querySelector("#form");
let title = document.querySelector("#title");
let text = document.querySelector("#text");
let category = document.querySelector("#category");
let submit = document.querySelector("#submit");
let cardContainer = document.querySelector("#card_container");
let clearButton = document.querySelector("#clear_all");
let search = document.querySelector("#search");

form.addEventListener("submit", addNote);
cardContainer.addEventListener("click", removeNote);
clearButton.addEventListener("click", removeAllNote);
search.addEventListener("keyup", filternote);
document.addEventListener("DOMContentLoaded", getNote);

let moods = {
  smile: "smile",
  flushed: "flushed",
  frown: "frown",
  angry: "angry",
  surprise: "surprise",
  wink: "smile-wink",
  hearts: "grin-hearts",
  tired: "tired",
  cry: "sad-cry",
};

for (let mood in moods) {
  let option = document.createElement("option");
  option.setAttribute("value", moods[mood]);
  option.appendChild(document.createTextNode(mood));
  category.appendChild(option);
}

// function addNote

function addNote(e) {
  if (title.value === " " || text.value === "" || category.value === "") {
    alert("Fill Input field");
  } else {
    let cardcontainer = document.querySelector("#card_container");
    let card = document.createElement("div");
    let time = new Date();
    time =
      time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear();

    card.classList = "col-sm-4";
    card.innerHTML = `<div class="card mb-3">
                          <i id="emoji" class= "m-auto mt-2 fa-solid fa-face-${category.value} fa-6x"></i> 
                          <a href="#" style=" text-align: center; position:absolute; left:90%; width:10%; text-decoration:none; background-color:tomato; padding:5px; color:white">X</a>
                          <div class="card-body">
                              <h5 class="card-title">${title.value}</h5>
                              <p class="card-text">${text.value}</p>
                              <p class="card-text"><small class="text-muted">Created on ${time}</small>
                          </div>
                      </div>`;

    cardcontainer.appendChild(card);

    storeNoteInLocalStorage(category.value, title.value, text.value, time);
    category.value = title.value = text.value = "";
  }

  e.preventDefault();
}

function removeNote(e) {
  if (e.target.hasAttribute("href")) {
    let rem_ele = e.target.parentElement.parentElement;
    rem_ele.remove();

    removeFromLs(rem_ele.querySelector("h5").textContent);
  }
}

function removeAllNote(e) {
  cardContainer.innerHTML = "";
  localStorage.clear();
}

function filternote(e) {
  let searchItem = e.target.value;
  document.querySelectorAll(".col-sm-4").forEach((card) => {
    let title = card.querySelector("h5").textContent;
    if (title.toLowerCase().indexOf(searchItem) != -1) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// Local storage functions

function storeNoteInLocalStorage(category, title, text, time) {
  let note;
  if (localStorage.getItem("note") === null) {
    note = [];
  } else {
    note = JSON.parse(localStorage.getItem("note"));
  }

  note.push([category, title, text, time]);
  localStorage.setItem("note", JSON.stringify(note));
}

function getNote() {
  let note;
  if (localStorage.getItem("note") === null) {
    note = [];
  } else {
    note = JSON.parse(localStorage.getItem("note"));
  }
  note.forEach((indNote) => {
    let cardcontainer = document.querySelector("#card_container");
    let card = document.createElement("div");
    card.classList = "col-sm-4";
    card.innerHTML = `<div class="card mb-3">
                          <i id="emoji" class= "m-auto mt-2 fa-solid fa-face-${indNote[0]} fa-6x"></i> 
                          <a href="#" style=" text-align: center; position:absolute; left:90%; width:10%; text-decoration:none; background-color:tomato; padding:5px; color:white">X</a>
                          <div class="card-body">
                              <h5 class="card-title">${indNote[1]}</h5>
                              <p class="card-text">${indNote[2]}</p>
                              <p class="card-text"><small class="text-muted">Created on ${indNote[3]}</small>
                          </div>
                      </div>`;

    cardcontainer.appendChild(card);
  });
}

function removeFromLs(remove_title) {
  let note;
  if (localStorage.getItem("note") === null) {
    note = [];
  } else {
    note = JSON.parse(localStorage.getItem("note"));
  }

  note.forEach((card, index) => {
    if (card[1] === remove_title) {
      note.splice(index, 1);
    }
  });

  localStorage.setItem("note", JSON.stringify(note));
}
