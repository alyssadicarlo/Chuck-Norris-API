'use strict';

// const request = new XMLHttpRequest();
// request.onreadystatechange = function () {
//     console.log(this);
//     if (this.readyState === 4) {
//         console.log("XHR Response: ", this.response);
//     }
// }
// request.open('GET', 'https://api.chucknorris.io/jokes/random?category=dev');
// request.send();

const generateQuote = document.querySelector('#getQuote');
const chuckQuote = document.querySelector('#chuckQuote');

function updateQuote(data) {
    const theQuote = data.value;
    chuckQuote.innerText = theQuote;
}

function updateCategories(categoryData) {
    const categoryListForm = document.querySelector('#categoryList');
    const selectElement = document.createElement('select');

    categoryData.forEach(function (category) {
        const categoryOptionElement = document.createElement('option');
        categoryOptionElement.value = category;
        categoryOptionElement.text = category;
        selectElement.appendChild(categoryOptionElement);
    });

    categoryListForm.append(selectElement);

    selectElement.addEventListener('change', function (event) {
        const categoryName = event.target.value;
        fetchTheQuote(categoryName);
    })
}

function fetchTheQuote(category) {
    fetch(
        `https://api.chucknorris.io/jokes/random?category=${category}`
    ).then(function (response) {
        return response.json();
    }).then(function (data) {
        updateQuote(data);
    });
}

function fetchTheCategories() {
    fetch(
        'https://api.chucknorris.io/jokes/categories'
    ).then(function (response) {
        return response.json();
    }).then(function (data) {
        updateCategories(data);
    });
}

generateQuote.addEventListener('click', function () {
    fetchTheQuote();
});

fetchTheQuote("dev");
fetchTheCategories();