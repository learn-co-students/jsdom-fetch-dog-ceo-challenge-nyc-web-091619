console.log('%c HI', 'color: firebrick')

window.addEventListener("DOMContentLoaded", (event) => {

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'



let fetchImg = function() {fetch (imgUrl)
    .then(function(resp){return resp.json()}) // (resp => resp.json())
    .then(function(data){
        // console.log(data.message)
        data.message.forEach(appendImages)
        
    })
}
fetchImg()

function appendImages(url){
    let dogImageCont = document.getElementById("dog-image-container")
    // console.log(dogImageCont)
    let child = document.createElement("img")
    // console.log(child)
    child.src = url
    // console.log(child)
    dogImageCont.appendChild(child)
}

let fetchBreed = function() {
    fetch(breedUrl)
    .then(function(resp){return resp.json()
    }) //end of first then
    .then(function(data){
        // data.messages.forEach(console.log)
        let breedkeys = Object.keys(data.message)
        let values = Object.values(data.message)
        // console.log(breedkeys, values, typeof(data.message))
        breedkeys.forEach(appendBreeds)
    })
} //end of fetchBreed
fetchBreed()

function appendBreeds(breed){
    let breedCont = document.getElementById("dog-breeds")
    let breedChild = document.createElement("li")
    breedChild.innerText = breed
    breedChild.dataset.name = "breed-name"
    // console.log(breed)
    breedCont.appendChild(breedChild)
}

    document.getElementById("dog-breeds").addEventListener("click", function(event){
        if (event.target.dataset.name === "breed-name"){
            event.target.style = "color: red"
        }
    })  
    
    // ask Turcan
    let filter1 = document.getElementById("breed-dropdown")
    // string.startsWith("initial")
    function findLetters(letter, array){
    array.forEach(function(string){
        string.startsWith("letter")
    })
    }

    function filterBreeds(menu){
        switch (menu.value) {
            
            case "a":
                findLetters(menu.value, array)
                break;
            case "b":
                
                break;
            case "c":
                
                break;
            case "d":
                
                break;    
        default:
            break;
        }
    }
    
    
    filterBreeds(filter1)
    
});