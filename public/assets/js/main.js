'use strict';

console.log('>> Ready :)');

const inputSerie = document.querySelector('#user-serie');
const buttonSearch = document.querySelector('#search-button');
const elementUl = document.querySelector('#shows-list');
const elementUlFav = document.querySelector('#shows-list--favs');
let favListShows = [];

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
        liElement.appendChild(pElement);
        liElement.appendChild(imgElement);
        liElement.addEventListener('click', addFav);
        elementUl.appendChild(liElement);
    }
}

//****AÑADIR A FAVORITOS****//
const addFav = (event) => {
    event.currentTarget.style = 'background-color:blue; color:#fff';
    setLocalStorage(event);
}

//****SET FAVORITOS A LOCAL STORAGE****//
const setLocalStorage = (event) => {

    //recogo en varibles los elementos seleccionados
    let nameShowFav = event.currentTarget.innerText;
    let imgShowFav = event.target.src;

    //creo un objeto con las series seleccionadas
    const showObject = {
        "name" : nameShowFav,
        "img" : imgShowFav
      }
    
    //relleno el array con el objeto
    favListShows.push(showObject);

    //seteo mi localstorage pasandolo por stringify
    localStorage.setItem('favListShows',JSON.stringify(favListShows));

    paintNewFavShow(showObject);
}

//****PINTO ELEMENTOS EN HTML AL GUARDAR EN LOCAL STORAGE****//
const paintNewFavShow = (showObject) => {
    elementUlFav.innerHTML += `<p>${showObject.name}</p><img src=${showObject.img}>`
}

//****GET FAVORITOS DE LOCAL STORAGE****//
const getLocalStorage = () => {
    const mylocalStorage = localStorage.getItem("favListShows");
    if(mylocalStorage !== null) {
        favListShows = JSON.parse(mylocalStorage);
        paintFavShows(favListShows);
    } 
}

//****PINTO ELEMENTOS EN HTML QUE SE ENCUENTRAN EN LOCAL STORAGE****//
const paintFavShows = (favShows) => {
    for(let favShow of favShows) {
        paintNewFavShow(favShow)
    }
}

buttonSearch.addEventListener('click', connectToAPI);
window.addEventListener('load', getLocalStorage);
//# sourceMappingURL=main.js.map
