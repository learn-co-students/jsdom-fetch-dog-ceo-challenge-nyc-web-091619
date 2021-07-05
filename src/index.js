let breeds = []

document.addEventListener('DOMContentLoaded', function() {
    console.log('%c HI', 'color: firebrick');
    fetchImages()
    fetchBreeds()
});
    
function fetchImages(){
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    fetch(imgUrl)
        .then(function(resp) {return resp.json()})
        .then(results => (
            results.message.forEach(image => addImage(image))
        )) 
}
    
function addImage(pictureUrl) {
    let imageContainer = document.querySelector('#dog-image-container')
    let newImageEl = document.createElement('img')
    newImageEl.src = pictureUrl
    imageContainer.appendChild(newImageEl)
}

function fetchBreeds() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetch(breedUrl)
        .then(resp => resp.json())
        .then(results => {
            
            breeds = Object.keys(results.message)
            updateBreedslist(breeds);
            addBreedSelectListener();

        }); 
}

function updateBreedslist(breeds) {
    let ul = document.querySelector('#dog-breeds')
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


function breedStartsWith(letter) {
    updateBreedslist(breeds.filter(breed => breed.startsWith(letter)))
}

function addBreedSelectListener() {
    let breedDropdown = document.querySelector('#breed-dropdown');
    breedDropdown.addEventListener('change', function (event) {
        breedStartsWith(event.target.value);
    });
}

function addBreed(breed) {
    let ul = document.querySelector('#dog-breeds');
    let li = document.createElement('li');
    li.innerText = breed
    li.style.cursor = 'pointer'
    ul.appendChild(li)
    li.addEventListener('click', changeColor)
}

function changeColor(e) {
    e.target.style.color = 'green';
  }