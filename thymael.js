document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("js-enabled");

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let nbLikes = 0;
    const boutonLike = document.getElementById("mon-bouton-like");
    if (boutonLike) {
        boutonLike.addEventListener("click", () => {
            nbLikes += 1;
            boutonLike.textContent = `❤ J'aime (${nbLikes})`;
            boutonLike.setAttribute("aria-label", `J'aime ${nbLikes}`);
        });
    }

    const cards = document.querySelectorAll(".card");
    if (cards.length) {
        if (!prefersReducedMotion && "IntersectionObserver" in window) {
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });

            cards.forEach(card => observer.observe(card));

            setTimeout(() => {
                if (!document.querySelector(".card.visible")) {
                    cards.forEach(card => card.classList.add("visible"));
                }
            }, 300);
        } else {
            cards.forEach(card => card.classList.add("visible"));
        }

        cards.forEach(card => {
            card.addEventListener("pointerenter", () => {
                card.style.transition = "transform 0.2s ease, box-shadow 0.2s ease";
                card.style.transform = "translateY(-4px) scale(1.01)";
                card.style.boxShadow = "0 24px 50px rgba(15, 23, 42, 0.14)";
            });
            card.addEventListener("pointerleave", () => {
                card.style.transform = "";
                card.style.boxShadow = "";
            });
        });
    }

    document.querySelectorAll(".card img").forEach(image => {
        image.addEventListener("click", () => {
            image.classList.toggle("zoomed");
        });
    });

    const footerYear = document.getElementById("footer-year");
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) {
        const copyButton = document.createElement("button");
        copyButton.type = "button";
        copyButton.className = "btn";
        copyButton.textContent = "📋 Copier mon email";
        copyButton.setAttribute("aria-label", "Copier mon email");
        emailLink.insertAdjacentElement("afterend", copyButton);

        copyButton.addEventListener("click", async () => {
            const emailAddress = emailLink.getAttribute("href").replace("mailto:", "");
            if (navigator.clipboard && navigator.clipboard.writeText) {
                try {
                    await navigator.clipboard.writeText(emailAddress);
                    copyButton.textContent = "✅ Email copié !";
                    setTimeout(() => {
                        copyButton.textContent = "📋 Copier mon email";
                    }, 1800);
                } catch {
                    copyButton.textContent = "⚠️ Impossible de copier";
                }
            } else {
                window.prompt("Copiez mon email", emailAddress);
            }
        });
    }

    createScrollProgress();
    createBackToTop();

    function createScrollProgress() {
        const progress = document.createElement("div");
        progress.id = "scroll-progress";
        Object.assign(progress.style, {
            position: "fixed",
            top: "0",
            left: "0",
            width: "0%",
            height: "3px",
            background: "rgba(37, 99, 235, 0.95)",
            transition: "width 0.15s ease",
            zIndex: "9999",
        });
        document.body.appendChild(progress);

        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const ratio = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
            progress.style.width = `${Math.round(ratio * 100)}%`;
        };

        updateProgress();
        window.addEventListener("scroll", () => requestAnimationFrame(updateProgress));
    }

    function createBackToTop() {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "↑ Haut";
        button.setAttribute("aria-label", "Retour en haut de la page");
        Object.assign(button.style, {
            position: "fixed",
            right: "1rem",
            bottom: "1.2rem",
            padding: "0.85rem 1.1rem",
            borderRadius: "999px",
            border: "none",
            background: "rgba(37, 99, 235, 0.95)",
            color: "white",
            cursor: "pointer",
            boxShadow: "0 16px 30px rgba(15, 23, 42, 0.18)",
            opacity: "0",
            pointerEvents: "none",
            transition: "opacity 0.25s ease, transform 0.25s ease",
            transform: "translateY(8px)",
            zIndex: "9999",
        });
        document.body.appendChild(button);

        const toggleVisibility = () => {
            const isVisible = window.scrollY > 280;
            button.style.opacity = isVisible ? "1" : "0";
            button.style.pointerEvents = isVisible ? "auto" : "none";
            button.style.transform = isVisible ? "translateY(0)" : "translateY(8px)";
        };

        button.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        toggleVisibility();
        window.addEventListener("scroll", () => requestAnimationFrame(toggleVisibility));
    }
});