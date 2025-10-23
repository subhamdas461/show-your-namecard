document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("cards-container");

    fetch("contributors.json")
        .then((res) => res.json())
        .then((contributors) => {
            contributors.forEach((contributor) => {
                const card = document.createElement("div");
                card.classList.add("card");

                // Extract GitHub username from URL
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
          </div>
        `;

                container.appendChild(card);
            });
        })
        .catch((err) => {
            container.innerHTML = `<p style="color: red;">Failed to load contributors 😞</p>`;
            console.error(err);
        });
});
