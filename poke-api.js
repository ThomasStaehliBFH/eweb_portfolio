/* Pokemon API */
function getRandomPokemon(slot) {
    const maxPokemonId = 251;
    const randomId = Math.floor(Math.random() * maxPokemonId) + 1;
    const url = `https://pokeapi.co/api/v2/pokemon/${randomId}`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("Failed to fetch Pokémon");
            return response.json();
        })
        .then(data => {
            const name = data.name;
            const image = data.sprites.other["official-artwork"].front_default;

            const resultDiv = document.querySelector(`.pokemon-result[data-slot="${slot}"]`);
            resultDiv.style.display = "flex";
            resultDiv.innerHTML = ''; // Clear previous content

            const heading = document.createElement("h4");
            heading.textContent = `A wild ${name} appeared!`;
            heading.classList.add("delayed-text"); // CSS handles hidden state

            const img = document.createElement("img");
            img.src = image;
            img.alt = name;
            img.className = "pokemon-image";
            img.title = "Click to flee";
            img.style.cursor = "pointer";

            img.addEventListener("click", () => resetScene(slot));

            resultDiv.appendChild(heading); // Insert heading first
            resultDiv.appendChild(img);     // Then image

            // Show heading after 600ms
            setTimeout(() => {
                heading.classList.add("visible");
            }, 600);
        })
        .catch(error => {
            const resultDiv = document.querySelector(`.pokemon-result[data-slot="${slot}"]`);
            resultDiv.innerHTML = `<p>${error.message}</p>`;
        });
}


function resetScene(slot) {
    const resultDiv = document.querySelector(`.pokemon-result[data-slot="${slot}"]`);
    const pokemonImage = resultDiv.querySelector("img");

    if (pokemonImage) {
        // Add run animation class
        pokemonImage.classList.add("run");

        // Wait for animation to complete, then reset
        pokemonImage.addEventListener("animationend", () => {
            document.querySelector(`.pokemon-bush[data-slot="${slot}"]`).style.display = "block";
            resultDiv.style.display = "none";
            resultDiv.innerHTML = "";
        }, { once: true });
    }
}





/* Random Shake Animation for Bushes */
function startRandomShakeForBush(bush) {
    function shakeOnce() {
        if (bush.style.display === "none") return; // Skip if bush is hidden

        bush.classList.add("shake");
        setTimeout(() => bush.classList.remove("shake"), 600); // Match shake duration

        // Set next shake with random delay (3 to 7 seconds)
        const nextDelay = Math.floor(Math.random() * 4000) + 3000; // 3000–7000 ms
        setTimeout(shakeOnce, nextDelay);
    }

    shakeOnce(); // Start the loop
}
document.addEventListener("DOMContentLoaded", () => {
    const bushes = document.querySelectorAll(".pokemon-bush");
    bushes.forEach(bush => {
        const slot = bush.getAttribute("data-slot");
        bush.addEventListener("click", () => {
            bush.style.display = "none";
            getRandomPokemon(slot);
        });
        startRandomShakeForBush(bush);
    });
});

