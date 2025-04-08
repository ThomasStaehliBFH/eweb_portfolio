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
    const walk = (x - startX) * 2;
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





