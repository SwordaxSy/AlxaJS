// Docs Section Togglers
const togglers = document.querySelectorAll(".lesson-title");
togglers.forEach((toggler) => {
    toggler.addEventListener("click", () => {
        toggler.nextElementSibling.classList.toggle("active");
        toggler.children[1].classList.toggle("active");
    });
});

// Open Image in New Tab
const images = document.querySelectorAll(".docs-image");
images.forEach((image) => {
    image.addEventListener("click", () => {
        const url = image.src;
        window.open(url, "_blank").focus();
    });
});
