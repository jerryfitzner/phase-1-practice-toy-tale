let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener("submit", (event) => {
      event.preventDefault();
      addNewToy();
      alert("New Toy Added!");
    }) 
  } else {
      toyFormContainer.style.display = "none";
    }
  })
});

let toyDiv = document.getElementById("toy-collection");
const toyName = document.querySelector('input');
const toyUrl = document.querySelectorAll('input')[1];



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
  btn.addEventListener("click", () => {
    let likes = e.likes += 1;
    console.log(e.id);
    fetch(`http://localhost:3000/toys/${e.id}`,{
      method: 'PATCH',
      headers:
      {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "likes": likes
      })
    })
    .then(resp => resp.json())
    .then(likes => {
      p.innerText = `${ e.name } has ${ likes.likes } likes!`;
    })
  });

  div.append(h2, img, p, btn);

  toyDiv.appendChild(div);
}


const addNewToy = () => {

  let toy = {
    "name":  toyName.value,
    "image": toyUrl.value,
    "likes": 0
  };

  fetch ('http://localhost:3000/toys', {
    method: "POST",
    headers:
    {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toy)
  })
    .then(resp => resp.json())
    .then(newToy => createToyCard(newToy));
}



document.addEventListener("DOMContentLoaded", (event) => {
  getRequestAllToys();
});

