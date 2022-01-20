let addToy = false;

document.addEventListener("DOMContentLoaded", (event) => {
  event.preventDefault();
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", (event) => {
    // hide & seek with the form
    event.preventDefault();
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

const toyDiv = () => document.getElementById("toy-collection");
const toyName = () => document.querySelector('input');
const toyUrl = () => document.querySelectorAll('input')[1];
const submitBtn = () => document.querySelectorAll('input')[2];



const getRequestAllToys = () => {
  fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(toys2 => { toys2.forEach(toys3 => {createToyCard(toys3)} ) });
}

const createToyCard = (e) => {
  let div = document.createElement('div');
  let h2 = document.createElement('h2');
  let img = document.createElement('img');
  let p = document.createElement('p');
  let btn = document.createElement('button');

  div.setAttribute("class", "card");

  h2.innerText = e.name;
  img.setAttribute("src", `${ e.image }`);
  img.setAttribute("class", "toy-avatar");

  p.innerText = `${ e.name } has ${ e.likes } likes!`;
  
  btn.setAttribute("class", "like-btn");
  btn.setAttribute("id", `${ e.id }`);
  btn.innerText = "LIKE";

  div.append(h2, img, p, btn);

  toyDiv().appendChild(div);
}

const addNewToy = (event) => {
  // event.preventDefault();

  // let toy = {
  //   name:  toyName().value,
  //   image: toyUrl().value,
  //   likes: 0
  // };

  console.log(toy);

  // fetch ('http://localhost:3000/toys', {
  //   method: "POST",
  //   headers:
  //   {
  //     "Content-Type": "application/json",
  //     "Accept": "application/json"
  //   },
  //   body: JSON.stringify(toy)
  // })
  //   .then(resp => resp.json)
  //   .then(newToy => console.log(newToy))
  //   // .then(newToy => createToyCard(newToy))
}

const submitNewToy = (event) => {
  event.preventDefault();
  submitBtn().addEventListener("submit", addNewToy);
}



document.addEventListener("DOMContentLoaded", (event) => {
  event.preventDefault();
  getRequestAllToys();
  submitNewToy();
});

