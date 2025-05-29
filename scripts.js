/* Adjusting Header Height for Article Height */
function updateHeaderHeight() {
    const header = document.querySelector("header");
    if (header) {
        document.documentElement.style.setProperty("--header-height", `${header.offsetHeight}px`);
    }
}

window.addEventListener("load", updateHeaderHeight);
window.addEventListener("resize", updateHeaderHeight);

let lastScrollY = window.scrollY;
const header = document.getElementById('site-header');

function getHeaderHeight() {
    const value = getComputedStyle(document.documentElement).getPropertyValue('--header-height');
    return parseInt(value) || 80; // fallback to 80px if not set
}

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    const headerHeight = getHeaderHeight();

    if (currentScroll < headerHeight) {
        // Near the top: keep header visible
        header.style.top = "0";
    } else if (currentScroll > lastScrollY) {
        // Scrolling down
        header.style.top = `-${headerHeight}px`;
    } else {
        // Scrolling up
        header.style.top = "0";
    }

    lastScrollY = currentScroll;
});

/* Tech Skills Item Scroll */
const wrapper = document.getElementById('carousel-wrapper');
const track = document.getElementById('icon-track');

let isDown = false;
let startX;
let scrollLeft;

wrapper.addEventListener('mousedown', (e) => {
    isDown = true;
    autoScrollActive = false; // 👈 stop auto scroll
    wrapper.classList.add('dragging');
    startX = e.pageX - wrapper.offsetLeft;
    scrollLeft = wrapper.scrollLeft;
});

wrapper.addEventListener('mouseleave', () => {
    isDown = false;
    wrapper.classList.remove('dragging');
});

wrapper.addEventListener('mouseup', () => {
    isDown = false;
    wrapper.classList.remove('dragging');

    setTimeout(() => {
        autoScrollActive = true;
        startAutoScroll(); // restart loop if needed
    }, 3000); // restart after 3 seconds
});


wrapper.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - wrapper.offsetLeft;
    const walk = (x - startX) * 1; // Adjust the multiplier for faster/slower scrolling
    wrapper.scrollLeft = scrollLeft - walk;
});

// Touch support
wrapper.addEventListener('touchstart', (e) => {
    isDown = true;
    autoScrollActive = false; // 👈 stop auto scroll
    startX = e.touches[0].pageX - wrapper.offsetLeft;
    scrollLeft = wrapper.scrollLeft;
});

wrapper.addEventListener('touchend', () => {
    isDown = false;
});

wrapper.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - wrapper.offsetLeft;
    const walk = (x - startX) * 1;
    wrapper.scrollLeft = scrollLeft - walk;
});


/* Auto Scroll */
let autoScrollActive = true;

function startAutoScroll() {
    const wrapper = document.getElementById('carousel-wrapper');
    const speed = 0.5; // scroll speed (pixels per frame)

    function scrollLoop() {
        if (!autoScrollActive) return;
        wrapper.scrollLeft += speed;

        // Loop back to start (optional)
        if (wrapper.scrollLeft >= wrapper.scrollWidth - wrapper.clientWidth) {
            wrapper.scrollLeft = 0;
        }

        requestAnimationFrame(scrollLoop);
    }

    scrollLoop();
}

startAutoScroll();

/* API's */
// Cat API Call //
const apiUrlCat = 'https://api.thecatapi.com/v1/images/search';

function getCatImage() {
    const catImg = document.getElementById('catImage');

    // Hide the image while loading
    catImg.style.display = "none";
    catImg.alt = "Loading...";

    fetch(apiUrlCat)
        .then(response => response.json())
        .then(data => {
            const catImageUrl = data[0].url;
            catImg.src = catImageUrl;
            catImg.alt = "A cute cat 🐱";

            // Wait for image to load before showing it
            catImg.onload = () => {
                catImg.style.display = "block";
            };
        })
        .catch(error => {
            console.error('Error fetching the cat image:', error);
            catImg.alt = "Failed to load cat image.";
            catImg.style.display = "block"; // Still show the placeholder
        });
}

document.getElementById("catButton").addEventListener("click", getCatImage);

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



