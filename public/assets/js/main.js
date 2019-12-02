'use strict';

console.log('>> Ready :)');

const inputSerie = document.querySelector('#user-serie');
const buttonSearch = document.querySelector('#search-button');
const elementUl = document.querySelector('#shows-list');
const elementUlFav = document.querySelector('shows-list--favs');
let favShows = [];

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
    elementUl.innerHTML = '';
    for (let i=0; i<dataResponse.length; i++) {

        const liElement = document.createElement('li');
        const imgElement = document.createElement('img');
        const pElement = document.createElement('p');
        const pContent = document.createTextNode(dataResponse[i].show.name);
        liElement.classList.add('color');
        let imagen = dataResponse[i].show.image;
        if(imagen === null){
            imgElement.src = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV.';
        }else{
            imgElement.src = dataResponse[i].show.image.medium;
        }
        pElement.appendChild(pContent);
        liElement.appendChild(imgElement);
        liElement.addEventListener('click', addFav);
        liElement.appendChild(pElement);
        elementUl.appendChild(liElement);
    }
}

//****AÑADIR A FAVORITOS****//
const addFav = (event) => {
    event.currentTarget.style = 'background-color:blue; color:#fff';
}

buttonSearch.addEventListener('click', connectToAPI);
//# sourceMappingURL=main.js.map
