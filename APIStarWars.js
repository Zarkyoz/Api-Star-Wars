var header = document.querySelector('header');
var articleTitre = document.createElement('article')
var articleRecherche = document.createElement('article')
header.classList = "barreTitre"
articleRecherche.classList = "sabre"
header.appendChild(articleTitre)
header.appendChild(articleRecherche)

//--------------------------------------------------------------------------------------------
// partie Titre
var titre = new Image()
titre.src="image/logo.png"
articleTitre.id ="articleTitre"
titre.id ="titre"
articleTitre.appendChild(titre)
// -------------------------------------------------------------------------------------------
// partie poignee ouverture de sabre
var sectionBtn = document.createElement('section');
var poignee = new Image ();
poignee.src = "image/sabrelaser.png";
poignee.id = "poignee"
sectionBtn.classList = "sabrepoignee"
// inseration du poignee
articleRecherche.appendChild(sectionBtn)
sectionBtn.appendChild(poignee)
// partie poignee validation
var poigneeV = new Image();
poigneeV.src = "image/sabrelaserv.png"
poigneeV.id = "poignee"

// -----------------------------------------------------------------------------------------
// partie recherche input
var sectionRecherche = document.createElement('section');
var recherche = document.createElement('input');
recherche.id = "laser"
recherche.placeholder = "Titre Film"
sectionRecherche.classList = "sabreLaser"
// inseration du input
articleRecherche.appendChild(sectionRecherche);
sectionRecherche.appendChild(recherche);
// -----------------------------------------------------------------------------------------
// partie son audio
var audioSortie = new Audio ('son/SabreLaser.mp3');
sectionRecherche.appendChild(audioSortie)
var audioRetour = new Audio ('son/SabreLaserRetour.mp3');
sectionRecherche.appendChild(audioRetour)
//-------------------------------------------------------------------------------------------

poignee.addEventListener('click', laserSort)
function laserSort(){
    var pos = 0;
    var id = setInterval(fra, 1)

    function fra(){
      
        audioSortie.play();
        recherche.style.opacity = 0.8;
        recherche.style.width = pos + "%";
        
      
        pos++;
        if (pos ===100){
            clearInterval(id)
            sectionBtn.replaceChild(poigneeV, poignee)
        }
        console.log(pos)
    }
}

// -----------------------------------------------------------------------------------------
// creation de la recherche
var httpRequest = new XMLHttpRequest()
var main = document.querySelector('main')
var etoileNoir = new Image()
etoileNoir.src = "image/etoilenoire.png"
etoileNoir.id = "etoileNoire"
main.appendChild(etoileNoir)

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
var filmArt = document.createElement('article')
main.appendChild(filmArt)
filmArt.id = "filmArt"
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!








// rentrée du laser et recherche des films
poigneeV.addEventListener('click', searchClick)
function searchClick(){
    var pos = 100;
    var id = setInterval(fra, 10)  
    function fra(){
      
        audioRetour.play();
        recherche.style.opacity = 0.8;
        recherche.style.width = pos + "%";
        --pos;

        if (pos ===0){
            clearInterval(id)
            recherche.style.opacity = 0;
            sectionBtn.replaceChild(poignee, poigneeV )

        }
        console.log(pos)
        // partie affichage
//entre la !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

filmArt.textContent = ""
var titreFilm = recherche.value
httpRequest.onreadystatechange = function () {
  if (httpRequest.readyState === 4) {
    var tempJSON = JSON.parse(httpRequest.response)
    var temp = tempJSON.results

    for (var f = 0; f < temp.length; f++) {
      var film = document.createElement('div')
      filmArt.appendChild(film)
      film.classList="filmBox"
      var filmTitre = document.createElement('div')
      film.appendChild(filmTitre)
      filmTitre.classList="filmTitre"
      var filmT = document.createElement('h1')
      filmTitre.appendChild(filmT)
      filmT.classList="filmTit"
      var filmE = document.createElement('h3')
      filmTitre.appendChild(filmE)
      filmE.classList="filmEpi"
      var filmDescription = document.createElement('div')
      film.appendChild(filmDescription)
      filmDescription.classList = "filmDescription"
      var filmD = document.createElement('p')
      filmDescription.appendChild(filmD)
      filmD.classList="filmDescr"
      filmT.textContent = temp[f].title
      filmE.textContent = "EPISODE " + temp[f].episode_id
      filmD.textContent = temp[f].opening_crawl

    }
    console.log(titreFilm)
    console.log(temp)
    recherche.value = ""
  }
}
httpRequest.open('GET','https://swapi.co/api/films/?search=' + titreFilm , true)
httpRequest.send()
};
// et la !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!         
    
}

recherche.addEventListener('keydown', function(search){

    switch (search.key){
        case "Enter":
            searchClick()       
break;
default:
    }
})
