const shuttle = document.querySelector('#NBshuttle')



window.addEventListener('scroll', function(e){

  let pos = (Math.round(document.documentElement.scrollTop / window.innerHeight - 0.2)*2+1) - 2 ; //-2 skip la premiere section et -0.2 offset le switch de catégorie
    shuttle.style.top = "calc(100vh/8 * "+ pos+" - 3mm)";
})
