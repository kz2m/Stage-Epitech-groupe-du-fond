// Compteur de clics personnalisé

let likes = Number(localStorage.getItem("likes")) || 0;

const boutonLike = document.getElementById("mon-bouton-like");
const boutonReset = document.getElementById("reset-likes");

boutonLike.textContent = `❤ (${likes})`;

boutonLike.addEventListener("click", () => {
    likes++;
    localStorage.setItem("likes", likes);
    boutonLike.textContent = `❤ (${likes})`;
});

boutonReset.addEventListener("click", () => {
    likes = 0;
    localStorage.setItem("likes", likes);
    boutonLike.textContent = `❤ (${likes})`;
});
