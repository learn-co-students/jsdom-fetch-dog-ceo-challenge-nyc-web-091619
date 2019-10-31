console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"

function fetchBooks() {
    const newLocal = imgUrl;
    return fetch(newLocal)
    .then(resp => resp.json())
    // .then(json => data = json);
    .then(json => renderBooks(json));
  }

  document.addEventListener('DOMContentLoaded', function() {
    fetchBooks()
  })