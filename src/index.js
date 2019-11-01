console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

document.addEventListener("DOMContentLoaded", function () {
    fetchDogs();
    fetchBreeds();
    
})

function fetchBreeds() {
     fetch(breedUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function(data) {
            return dogBreeds(data)
        }) 
}

function dogBreeds(dogsB) {
    console.log(dogsB)
    let breeds = []
    breeds = Object.keys(dogsB.message)
    let dropdown = document.getElementById("breed-dropdown")
    option = document.createElement("option")
    option.value = "all"
    option.innerText = "all"
    dropdown.appendChild(option)
    option.selected = true
    let ul = document.getElementById("dog-breeds")

    breeds.map(function (breed) {
        return ul.insertAdjacentHTML('beforeend', `<li>${breed}</li>`)
    })

    
    dropdown.addEventListener('change', function(e) {
        if (ul.hasChildNodes) {
            while (ul.hasChildNodes()) {
                ul.removeChild(ul.firstChild)
                console.log(`removed ${ul.firstChild}`)
            }
        }
        breeds.filter(function (breed) {
            if (breed.startsWith(e.target.value[0]) && (e.target.value !== 'all')) {
                console.log("found a match")
                ul.insertAdjacentHTML('beforeend', `<li>${breed}</li>`)
            }
        })
        if (e.target.value === 'all') {
            breeds.map(function (breed) {
            return ul.insertAdjacentHTML('beforeend', `<li>${breed}</li>`)
            })
        }
    })
}

function fetchDogs() {
    return fetch(imgUrl)
        .then(function(response) {
            debugger
            return response.json();
        })
        .then(function(json) {
            return dogImages(json)
        })
}

function dogImages(json) {
    let imagesContainer = document.getElementById("dog-image-container")
    json.message.map(function(message) {
        let img = document.createElement('img')
        img.className= "dogs"
        img.src = message
        return imagesContainer.appendChild(img)
    })
}


document.addEventListener('click', function(e) {
    if (e.target.localName === "li") {
        console.dir(e.target)
        e.target.setAttribute("style","color: red")
    }
})