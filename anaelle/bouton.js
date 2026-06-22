/* Compteur de clics personnalisé*/
let nbLikes = Number(localStorage.getItem("nblikes")) || 0;
const boutonLike = document.getElementById("mon-bouton-like");

boutonLike.textContent = `❤(${nbLikes})`;

boutonLike.addEventListener("click", ()  => {
    nbLikes++;
    localStorage.setItem("nblikes", nbLikes);
    boutonLike.textContent = `❤(${nbLikes})`;
});
