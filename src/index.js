console.log('%c HI', 'color: firebrick');

const imgUrl = 'https://dog.ceo/api/breeds/image/random/4';
const breedUrl = 'https://dog.ceo/api/breeds/list/all';

const breedDropDown = document.querySelector('#breed-dropdown');

let permanentDogBreedList = [];

const addImages = json => {
  const imgContainer = document.querySelector('#dog-image-container');
  const imgArr = json.message;
  imgArr.forEach(dogImg => {
    const image = document.createElement('img');
    image.alt = 'pup';
    image.src = dogImg;
    imgContainer.appendChild(image);
  });
};
// outside the addBreedList function so that it I can add event listener
const breedContainer = document.querySelector('#dog-breeds');
const addBreedList = json => {
  // debugger;
  const breedArr = Object.keys(json.message);
  permanentDogBreedList = [...breedArr];
  breedArr.forEach(breed => {
    // debugger;
    const li = document.createElement('li');
    li.innerText = breed;
    breedContainer.appendChild(li);
  });
};

const breedFilter = letter => {
  // allTheDogs is no longer statis after one filter, make a second set of ALL THE DOGS
  const allTheDogLis = document.querySelectorAll('li');
  // const allTheDogs = [...allTheDogLis].map(li => li.textContent);
  // get all the dogs
  // remove all the dogs?
  // create a new list of dogs with only the first letter that we want
  const filteredBoys = permanentDogBreedList.filter(
    dogName => dogName[0] === letter,
  );

  allTheDogLis.forEach(node => node.remove());

  filteredBoys.forEach(breed => {
    // debugger;
    const li = document.createElement('li');
    li.innerText = breed;
    breedContainer.appendChild(li);
  });
};

const changeColor = node => (node.style = 'color: firebrick;');

fetch(imgUrl)
  .then(resp => resp.json())
  .then(json => addImages(json));

fetch(breedUrl)
  .then(resp => resp.json())
  .then(json => addBreedList(json));

breedContainer.addEventListener('click', e => {
  if (e.target.tagName === 'LI') {
    changeColor(e.target);
  }
});

breedDropDown.addEventListener('change', e => {
  // create filter function that takes in the value of e.target and filters out the
  breedFilter(e.target.value);
});
