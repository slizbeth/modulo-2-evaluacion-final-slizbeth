'use strict';

console.log('>> Ready :)');

const inputSerie = document.querySelector('#user-serie');
const buttonSearch = document.querySelector('#search-button');
const elementUl = document.querySelector('#shows-list');
const elementUlFav = document.querySelector('#shows-list--favs');
const form = document.querySelector('#js-form');
const title = document.querySelector('#title-fav');
const btnRemoveAll = document.querySelector('#remove-button');
let favListShows = [];

//****CONEXIÓN CON LA API****//
const connectToAPI = () => {
    const inputSerieValue = inputSerie.value;
    fetch(`http://api.tvmaze.com/search/shows?q=${inputSerieValue}`)
        .then((response) => response.json())
        .then(dataResponse => {
            dataResponse.length !== 0 ? showData(dataResponse) : emptyData();
        })
        .catch(error => console.log('error', error));
}

//****MOSTRAR DATOS****//
const showData = (dataResponse) => {
    elementUl.innerHTML = '';
    document.querySelector('#title-fav').innerHTML = '~Mis series favoritas~';
    for (let i = 0; i < dataResponse.length; i++) {

        const liElement = document.createElement('li');
        const imgElement = document.createElement('img');
        const pElement = document.createElement('p');
        const pContent = document.createTextNode(dataResponse[i].show.name);
        liElement.classList.add('li-element');
        let imagen = dataResponse[i].show.image;
        if (imagen === null) {
            imgElement.src = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV.';
        } else {
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
    event.currentTarget.classList.toggle('selected');
    setLocalStorage();
    
}

//****SET FAVORITOS A LOCAL STORAGE****//
const setLocalStorage = () => {
    //recogo en varibles los elementos seleccionados
    let nameShowFav = event.currentTarget.innerText;
    let imgShowFav = event.target.src;

    //creo un objeto con las series seleccionadas
    const showObject = {
        "name": nameShowFav,
        "img": imgShowFav
    }
    
    favListShows.push(showObject);

    localStorage.setItem('favListShows', JSON.stringify(favListShows));

    paintNewFavShow(showObject);
    btnRemoveAll.classList.remove('hidden');
   
}

//****PINTO ELEMENTOS EN HTML AL GUARDAR EN LOCAL STORAGE****//
const paintNewFavShow = (showObject) => {
    const liElement = document.createElement('li');
    const imgElement = document.createElement('img');
    const pElement = document.createElement('p');
    const iElement = document.createElement('i'); 
    const pContent = document.createTextNode(showObject.name);
    imgElement.src = showObject.img;
    imgElement.classList.add("fav-img");
    pElement.classList.add("fav-name")
    iElement.classList.add('fas');
    iElement.classList.add('fa-times-circle');
    iElement.classList.add('fav-icon');
    liElement.classList.add('li-element');
    iElement.addEventListener('click', removeLocalStorage);
    pElement.appendChild(pContent);
    liElement.appendChild(pElement);
    liElement.appendChild(imgElement);
    liElement.appendChild(iElement);
    elementUlFav.appendChild(liElement);
}

//****GET FAVORITOS DE LOCAL STORAGE****//
const getLocalStorage = () => {
    const mylocalStorage = localStorage.getItem("favListShows");
    if (mylocalStorage !== null) {
        favListShows = JSON.parse(mylocalStorage);
        paintFavShows(favListShows);
        btnRemoveAll.classList.remove('hidden');
    }else{
        btnRemoveAll.classList.add('hidden');
    }
}

//****PINTO ELEMENTOS EN HTML QUE SE ENCUENTRAN EN LOCAL STORAGE****//
const paintFavShows = (favShows) => {
    for (let favShow of favShows) {
        paintNewFavShow(favShow)
    }
}

//****BORRAR TODO DEL LOCAL STORAGE Y DE HTML****//
const removeAllLocalStorage = () => {
    localStorage.removeItem('favListShows');
    elementUlFav.innerHTML = '';

}

//****BORRAR EL FAVORITO SELECCIONADO DE LOCAL STORAGE Y DE HTML****//
const removeLocalStorage = () => {
    //console.log('Yo debería borrar la serie seleccionada del local');
    const name = document.querySelector(".fav-name").innerHTML;
    
    //elimina del html los fav al dar a la cruz
    const elementRemove = event.currentTarget;
    const parentelementR = event.currentTarget.parentElement;
    parentelementR.remove(elementRemove);
}

//tecla intro//
function sumbitForm(event) {
    event.preventDefault();
    connectToAPI();
}

//Si no hay datos muestra mensaje
const emptyData = () =>{
    document.querySelector('#title-fav').innerHTML = '😱 No hemos encontrado nada 😱';
}

buttonSearch.addEventListener('click', connectToAPI);
window.addEventListener('load', getLocalStorage);
form.addEventListener('submit', sumbitForm);
btnRemoveAll.addEventListener('click', removeAllLocalStorage);
//# sourceMappingURL=main.js.map
