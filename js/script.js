document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("cards-container");
    const themeBtn = document.getElementById("theme-btn");
    const themeIcon = themeBtn.querySelector(".theme-icon");

    // Load theme from localStorage
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);

    themeBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";

        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        themeIcon.textContent = theme === "dark" ? "☀" : "☽";
    }

    // Load contributors
    fetch("contributors.json")
        .then((res) => res.json())
        .then((contributors) => {
            contributors.forEach((contributor) => {
                const card = document.createElement("div");
                card.classList.add("card");

                const githubURL = contributor.github;
                const username = githubURL
                    .split("github.com/")[1]
                    .replace("/", "");
                const avatarURL = `https://github.com/${username}.png`;

                card.innerHTML = `
          <div class="card-content">
            <img src="${avatarURL}" alt="${contributor.name}" class="avatar">
            <h2 class="name">${contributor.name}</h2>
            <p class="role">${contributor.role}</p>
            <p class="bio">${contributor.bio}</p>
            <a href="${contributor.github}" target="_blank" class="github-link">View GitHub</a>
            ${
                contributor.website && contributor.website.trim() !== ""
                    ? `<a href="${contributor.website}" target="_blank" class="website-link">View Website</a>`
                    : ""
            }
          </div>
        `;

                container.appendChild(card);
            });
        })
        .catch((err) => {
            container.innerHTML = `<p style="color: red;">Failed to load contributors</p>`;
            console.error(err);
        });

    // Cyberpunk glow cursor
    const cursor = document.createElement("div");
    const cursorTrail = document.createElement("div");

    cursor.classList.add("cursor-dot");
    cursorTrail.classList.add("cursor-dot-outline");
    document.body.appendChild(cursor);
    document.body.appendChild(cursorTrail);

    let mouseX = 0,
        mouseY = 0,
        trailX = 0,
        trailY = 0;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    function animateTrail() {
        trailX += (mouseX - trailX) * 0.15;
        trailY += (mouseY - trailY) * 0.15;
        cursorTrail.style.transform = `translate3d(${trailX}px, ${trailY}px, 0)`;
        requestAnimationFrame(animateTrail);
    }
    animateTrail();
});
