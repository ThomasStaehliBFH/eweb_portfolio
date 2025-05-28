/* Adjusting Header Height for Article Height */
function updateHeaderHeight() {
    const header = document.querySelector("header");
    if (header) {
        document.documentElement.style.setProperty("--header-height", `${header.offsetHeight}px`);
    }
}

window.addEventListener("load", updateHeaderHeight);
window.addEventListener("resize", updateHeaderHeight);
