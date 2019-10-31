console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
// helper methods
function updateColor(e) {
    e.target.style.color = "firebrick"
}

function creatingLi(breed){
    let li = document.createElement('li')
    li.innerText = `${breed}`
    li.addEventListener('click', updateColor)
    return li
}

function removingChildren(ul){
    while( ul.firstChild ){
        ul.removeChild( ul.firstChild )
    }
}

// important methods
function fetchDogs() {
    fetch(imgUrl)
    .then(resp => resp.json())
    .then(json => renderDogs(json))
}

function renderDogs(json) {
    const dogs_div = document.getElementById('dog-image-container')
    let imagesArray = json.message
    imagesArray.forEach(image => {
      const img = document.createElement('img')
      img.src = `${image}`
      dogs_div.appendChild(img)
    })
  }

function fetchBreeds() {
    fetch(breedUrl)
    .then(resp => resp.json())
    .then(json => renderBreeds(json))
}

function renderBreeds(json) {
    const breeds_ul = document.getElementById('dog-breeds')
    const dropdown = document.getElementById("breed-dropdown")
    let breedsArray = Object.keys(json.message)
    breedsArray.forEach(breed => {
      const li = creatingLi(breed)
      breeds_ul.appendChild(li)
    })
    dropdown.addEventListener('change', function (e) {
        removingChildren(breeds_ul)
        breedsArray.forEach(breed => {
            if(breed[0] === e.target.value){
                const li = creatingLi(breed)
                breeds_ul.appendChild(li)
            }
        })
    })
  }

document.addEventListener('DOMContentLoaded', function() {
    fetchDogs()
    fetchBreeds()
})