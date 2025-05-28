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
