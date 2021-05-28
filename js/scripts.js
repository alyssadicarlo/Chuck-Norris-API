'use strict';

document.addEventListener('DOMContentLoaded', function () {

    const generateQuote = document.querySelector('#getQuote');
    const chuckQuote = document.querySelector('#chuckQuote');
    const defaultCategory = "dev";
    let currentCategory = defaultCategory;
    
    function updateQuote(data) {
        const theQuote = data.value;
        chuckQuote.innerText = theQuote;
    }
    
    function updateCategories(categoryData) {
        const categoryListForm = document.querySelector('#categoryList');
        const selectElement = document.createElement('select');

        const filteredList = categoryData.filter(function (category) {
            if (category !== 'explicit' && category !== 'political' && category !== 'sport') {
                return category;
            }
        });

        console.log(filteredList);
    
        filteredList.forEach(function (category) {
            const categoryOptionElement = document.createElement('option');
            categoryOptionElement.value = category;
            categoryOptionElement.text = category;
            if (category === currentCategory) {
                categoryOptionElement.setAttribute('selected', true);
            }
            selectElement.appendChild(categoryOptionElement);
        });
    
        categoryListForm.append(selectElement);
    
        selectElement.addEventListener('change', function (event) {
            const newCategoryName = event.target.value;
            currentCategory = newCategoryName;
            fetchTheQuote(currentCategory);
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
        fetchTheQuote(currentCategory);
    });
    
    fetchTheQuote(currentCategory);
    fetchTheCategories();

})
