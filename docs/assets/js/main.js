"use strict";console.log(">> Ready :)");const inputSerie=document.querySelector("#user-serie"),buttonSearch=document.querySelector("#search-button"),elementUl=document.querySelector("#shows-list"),elementUlFav=document.querySelector("#shows-list--favs"),form=document.querySelector("#js-form"),title=document.querySelector("#title-fav"),btnRemoveAll=document.querySelector("#remove-button");let favListShows=[];const connectToAPI=()=>{const e=inputSerie.value;fetch(`http://api.tvmaze.com/search/shows?q=${e}`).then(e=>e.json()).then(e=>{0!==e.length?showData(e):emptyData()}).catch(e=>console.log("error",e))},showData=e=>{elementUl.innerHTML="",document.querySelector("#title-fav").innerHTML="~Mis series favoritas~";for(let t=0;t<e.length;t++){const a=document.createElement("li"),o=document.createElement("img"),n=document.createElement("p"),l=document.createTextNode(e[t].show.name);a.classList.add("li-element");let s=e[t].show.image;o.src=null===s?"https://via.placeholder.com/210x295/ffffff/666666/?text=TV.":e[t].show.image.medium,n.appendChild(l),a.appendChild(n),a.appendChild(o),a.addEventListener("click",addFav),elementUl.appendChild(a)}},addFav=e=>{e.currentTarget.classList.toggle("selected"),setLocalStorage()},setLocalStorage=()=>{const e={name:event.currentTarget.innerText,img:event.target.src};favListShows.push(e),localStorage.setItem("favListShows",JSON.stringify(favListShows)),paintNewFavShow(e),btnRemoveAll.classList.remove("hidden")},paintNewFavShow=e=>{const t=document.createElement("li"),a=document.createElement("img"),o=document.createElement("p"),n=document.createElement("i"),l=document.createTextNode(e.name);a.src=e.img,a.classList.add("fav-img"),o.classList.add("fav-name"),n.classList.add("fas"),n.classList.add("fa-times-circle"),n.classList.add("fav-icon"),t.classList.add("li-element"),n.addEventListener("click",removeLocalStorage),o.appendChild(l),t.appendChild(o),t.appendChild(a),t.appendChild(n),elementUlFav.appendChild(t)},getLocalStorage=()=>{const e=localStorage.getItem("favListShows");null!==e?(favListShows=JSON.parse(e),paintFavShows(favListShows),btnRemoveAll.classList.remove("hidden")):btnRemoveAll.classList.add("hidden")},paintFavShows=e=>{for(let t of e)paintNewFavShow(t)},removeAllLocalStorage=()=>{localStorage.removeItem("favListShows"),elementUlFav.innerHTML=""},removeLocalStorage=()=>{document.querySelector(".fav-name").innerHTML;const e=event.currentTarget;event.currentTarget.parentElement.remove(e)};function sumbitForm(e){e.preventDefault(),connectToAPI()}const emptyData=()=>{document.querySelector("#title-fav").innerHTML="😱 No hemos encontrado nada 😱"};buttonSearch.addEventListener("click",connectToAPI),window.addEventListener("load",getLocalStorage),form.addEventListener("submit",sumbitForm),btnRemoveAll.addEventListener("click",removeAllLocalStorage);