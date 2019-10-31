// console.log('%c HI', 'color: firebrick')
window.addEventListener('DOMContentLoaded', function(event){

    // Fetch and add the images!
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"

    let imageDiv = document.getElementById("dog-image-container")
    console.log("now div = ", imageDiv)

    fetch(imgUrl)
        .then(function(response){ return response.json()})
        .then(function(json){
        
            json["message"].forEach(function(imageUrl){
                let imageTag = document.createElement("img")
            
                imageTag.src = imageUrl
              
                imageDiv.appendChild(imageTag)
            });
        });


    // Fetch and add dog breeds
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'

    let breedContainer = document.getElementById("dog-breeds")

    function fetchBreeds(filter = null){
        console.log("filter = ", filter)
        return fetch(breedUrl)
            .then(function(response){ return response.json()})
            .then(function(json){
                let breedObj = json.message
               
                let breeds = Object.keys(breedObj)
            
                breeds.forEach(function(breed){
                    if(filter == null || breed[0] === filter){
                        console.log("adding ", breed)
                        let li = document.createElement("li");
                        li.innerText = breed
                        breedContainer.appendChild(li)
                    }
                });
            });
    }

    fetchBreeds()

    //Create function to remove all breed list
    function removeBreeds(){
        let children = [...breedContainer.childNodes]
        children.forEach(function(node){
            console.log("looking at: ", node.innerText)
            breedContainer.removeChild(node)
        })
    }

    // Create the handler and event to change text color
    function breedClickHandler(event){
        if(event.target.tagName == "LI" ){
            event.target.style.color = "turquoise";
            
           
        }
    }

    //add the event listener for breed clickes
    breedContainer.addEventListener("click", breedClickHandler)


    //Create the listener for selecting breed to filter
    let breedSelector = document.getElementById("breed-dropdown")

    //upon selecting letter to filter, delete entire list and add back with filter
    function breedFilterHandler(event){
        let filter = event.target.selectedOptions[0].value
        removeBreeds()
        fetchBreeds(filter)
        
    }

    breedSelector.addEventListener("change", breedFilterHandler)

});
