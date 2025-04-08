// Cat API Call //
const apiUrlCat = 'https://api.thecatapi.com/v1/images/search';

function getCatImage() {
    const catImg = document.getElementById('catImage');
    catImg.alt = "Loading...";

    fetch(apiUrlCat)
        .then(response => response.json())
        .then(data => {
            const catImageUrl = data[0].url;
            catImg.src = catImageUrl;
            catImg.alt = "A cute cat 🐱";
        })
        .catch(error => {
            console.error('Error fetching the cat image:', error);
            catImg.alt = "Failed to load cat image.";
        });
}
