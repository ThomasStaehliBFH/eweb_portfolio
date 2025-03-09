// API Call //
apiUrlCat = 'https://api.thecatapi.com/v1/images/search'

function getCatImage() {
    fetch(apiUrlCat)
        .then(response => response.json())
        .then(data => {
            let catImageUrl = data[0].url;
            document.getElementById('catImage').src = catImageUrl;
        })
        .catch(error => console.error('Error fetching the cat image:', error));
}