const CarouselContainer = document.querySelector('#InstaCarousel')
const cardWidth = 368; /*attention margin/gap   can pull du css?*/


function InstaCarouselClick(scroll) { /*scroll definis le sens*/
    let width = window.innerWidth;

    let cardsScrollPerClick = Math.floor(width/cardWidth) /*cartes affichées du a la taille de l'écran*/
    if(cardsScrollPerClick == 0) {cardsScrollPerClick = 1} /*handles  less than one card shown*/
    let scrollEnPx = (cardsScrollPerClick * cardWidth * scroll)

    
    
    CarouselContainer.scrollLeft += scrollEnPx - (CarouselContainer.scrollLeft % cardWidth);
} /*                                              modulo la cardwidth pour le centrage yolo                                         */