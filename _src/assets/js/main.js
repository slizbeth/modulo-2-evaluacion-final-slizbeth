'use strict';

console.log('>> Ready :)');

const inputSerie = document.querySelector('#user-serie');
const buttonSearch = document.querySelector('#search-button');
const elementUl = document.querySelector('#shows-list');

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
    for (let i=0; i<dataResponse.length; i++) {

        const liElement = document.createElement('li');
        const liElementText = document.createElement('li');
        const imgElement = document.createElement('img');
        const spanElement = document.createElement('span');
        const spanContent = document.createTextNode(dataResponse[i].show.name);
        let imagen = dataResponse[i].show.image;
        if(imagen === null){
            imgElement.src = 'https://via.placeholder.com/210x295';
        }else{
            imgElement.src = dataResponse[i].show.image.medium;
        }
        spanElement.appendChild(spanContent);
        liElement.appendChild(imgElement);
        liElementText.appendChild(spanElement);
        elementUl.appendChild(liElementText);
        elementUl.appendChild(liElement);
    }
}

buttonSearch.addEventListener('click', connectToAPI);