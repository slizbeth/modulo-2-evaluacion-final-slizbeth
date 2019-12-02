'use strict';

console.log('>> Ready :)');

const urlBase = 'http://api.tvmaze.com/search/shows?q=';
const inputSerie = document.querySelector('#user-serie');
const buttonSearch = document.querySelector('#search-button');

//****CONEXIÓN CON LA API****//
const connectToAPI = () => {
    const inputSerieValue = inputSerie.value;
    fetch(`http://api.tvmaze.com/search/shows?q=${inputSerieValue}`)
    .then((response) => response.json())
    .then(dataResponse =>  showData(dataResponse))
    .catch(err => console.log('error', err));
}

//****MOSTRAR DATOS****//
const showData = (dataResponse) => {
    console.log(dataResponse);
}


buttonSearch.addEventListener('click', connectToAPI);