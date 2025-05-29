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

