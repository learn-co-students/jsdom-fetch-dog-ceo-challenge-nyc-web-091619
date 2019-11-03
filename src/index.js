
// add an EventListener which waits for the initial HTML 
// document to complete load and be parsed.  It does not
// wait for stylesheets, images, and subframes to finish
// loading.
// (ref: https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event)
// When that action is completed, it triggers the anonymous
// function within, that makes a call to the fetchDogs() 
// function and "invokes" () the function.

document.addEventListener('DOMContentLoaded', function() {
  fetchDogs();
  fetchBreeds(); 
});



  // addEventListener('click', event => {
  //   console.log("click", self, event, event.detail);
  // })

// create a constant variable named imgURL which holds the
// URL (ref: https://www.lifewire.com/what-is-a-url-2626035)
// for the API (ref: youtube.com/watch?v=s7wmiS2mSXY) that
// contains images we are trying to fetch

// create a function which returns a promise from fetch(imgURL)
// (ref: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
// it returns a Response object (ref: https://developer.mozilla.org/en-US/docs/Web/API/Response)
// which we then use the .json() method of the Response object to read it to 
// completion and return a promise that resolves with the result of parsing
// the body text as JSON. 
// With that json data, we send it to an anonymous function, within which we 
// use the json data and extract the "message" array, which contains the 
// individual URLs for the dog images.  You can view this data by using Chrome
// javascript console, clicking "sources" tab and setting a breakpoint on line
// 39, by clicking the line number and reloading the page.  We then iterate through the 
// array with "forEach" method and with each iteration we take the image and 
// send it to the "addImageToDom" function for processing.

function fetchDogs() {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  fetch(imgUrl)
    .then(response => response.json())
    .then(json => {
      json.message.forEach(image => addImageToDOM(image))
  });
}

// in the addImageToDom function we receive an argument of a URL string and
// in line 51 we grab our <div> container with the ID of "dog-image-container"
// in line 52 we create a new <img> tag for our URL
// in line 53 we assign the .src attribute of our new <img> tag to the URL
// in line 54 we append (attach) the <img> tag to our <div> container, at which
// point it should show up on the web page.

function addImageToDOM(dogPictureURL) {
  let dogImgDivContainer = document.querySelector('#dog-image-container');
  let newImageElement = document.createElement("img");
  newImageElement.src = dogPictureURL;
  dogImgDivContainer.appendChild(newImageElement);
}

const letterSet = new Set();

function fetchBreeds() {
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'
  let dogBreedContainer = document.getElementById("dog-breeds");

  fetch(breedUrl)
  .then(resp => resp.json())
  .then(json => {
    for (var breed in json.message) {
      let newBreedListItem = document.createElement("li");
      newBreedListItem.innerText = breed;
      newBreedListItem.addEventListener('click', event => {
        if (event.target.style.color !== "orange" ) {
          event.target.style.color = "orange"
        }
        else {
          event.target.style.color = "black";
        }
      })
      let breedDropdown = document.getElementById("breed-dropdown")
      let allBreeds = document.getElementById("dog-breeds").children
      // drop all child nodes, removing a,b,c,d option items
      breedDropdown.innerHTML = ""

      for (let i = 0; i < allBreeds.length; i++) {
        letterSet.add(document.getElementById("dog-breeds").children[i].innerText[0])
      } 
      dogBreedContainer.appendChild(newBreedListItem);
      
    }

    function addLetter(letter) {
      let opt = document.createElement('option');

      opt.appendChild(document.createTextNode(letter));
      opt.value = letter;
      document.getElementById("breed-dropdown").appendChild(opt);
    }

    letterSet.forEach(addLetter);

    document.getElementById("breed-dropdown").addEventListener("change", function() {
      let searchLetter = event.target.value;
      for (i=0; i< document.getElementById("dog-breeds").children.length; i++) {
        if (document.getElementById("dog-breeds").children[i].innerHTML[0] === searchLetter) {
          showBreed(document.getElementById("dog-breeds").children[i]);
        }
        else {
          hideBreed(document.getElementById("dog-breeds").children[i]);
        }
      }
    });

    function hideBreed(link) {
      link.style.display = "none";
    }

    function showBreed(link) {
      link.removeAttribute("style");
    }

  })
  
  
  
  
}

