console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

// function fetchDogs() {
//     return fetch(imgUrl)
//     .then(resp => resp(json()))
//     .then(json => renderDogs(json))
// }

// function renderDogs(json) {
//     const dogImg = document.getElementById("dog-image-container")
//     json.forEach(dog => {
//         const ul = document.createElement("ul")
//         const li = document.createElement("li")
//         li.innerHTML = `<li>${dog.breed}</li`
//         ul.appendChild(li)
//     }
//     )
// }

let breeds = [];

document.addEventListener("DOMContentLoaded", function() {
    loadDogs()
    loadBreeds()
})

function loadDogs() {
    fetch (imgUrl)
    .then(res => res.json())
    .then(results => {
        results.message.forEach(image => addImg(image))
      });
}

function addImg(dogPicUrl) {
    let container = document.getElementById("dog-image-container")
    let newImg = document.createElement("img")
    newImg.src = dogPicUrl
    container.appendChild(newImg)
}

function loadBreeds() {
    fetch(breedUrl)
    .then(res => res.json())
    .then(results => {
        breeds = Object.keys(results.message);
        updateBreedList(breeds);
        addBreedSelectListener();
    })
}

function updateBreedList() {
    let ul = document.getElementById('dog-breeds')
    removeChildren(ul);
    breeds.forEach(breed => addBreed(breed));
}

function removeChildren(element) {
    let child = element.lastElementChild;
    while (child) {
      element.removeChild(child);
      child = element.lastElementChild;
    }
}

function selectBreedsStartingWith(letter) {
    updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
  }
  
function addBreedSelectListener() {
    let dropDown = document.getElementById('breed-dropdown');
    dropDown.addEventListener('change', function (event) {
      selectBreedsStartingWith(event.target.value);
    });
}

function addBreed(breed) {
    let ul = document.getElementById("dog-breeds")
    let li = document.createElement("li")
    li.innerText = breed
    li.style.cursor = 'pointer'
    ul.appendChild(li)
    li.addEventListener("click", updateColor)
}
  
function updateColor(e) {
    e.target.style.color = 'palevioletred';
}