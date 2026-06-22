const menuToggle = document.querySelector('.menu-toggle');
const sidePanel = document.querySelector('.side-panel');
const sideBackdrop = document.querySelector('.side-backdrop');
const sideClose = document.querySelector('.side-close');
const boutonLike = document.getElementById('mon-bouton-like');
let nbLikes = 0;

function openMenu() {
    sidePanel.classList.add('open');
    sideBackdrop.classList.add('visible');
    sidePanel.setAttribute('aria-hidden', 'false');
}

function closeMenu() {
    sidePanel.classList.remove('open');
    sideBackdrop.classList.remove('visible');
    sidePanel.setAttribute('aria-hidden', 'true');
}

menuToggle.addEventListener('click', openMenu);
sideClose.addEventListener('click', closeMenu);
sideBackdrop.addEventListener('click', closeMenu);

if (boutonLike) {
    boutonLike.addEventListener('click', () => {
        nbLikes += 1;
        boutonLike.textContent = `❤️ J'aime (${nbLikes})`;
    });
}
