// Move Demo Cards
const allCards = document.querySelectorAll(".home-demo .card");
const demoTooltip = document.querySelector(".home-demo-tooltip");
let cardsInterval;
allCards.forEach((card) => {
    card.addEventListener("click", () => {
        if (card.classList.contains("pos-1")) return;

        let currentPos = card.classList.contains("pos-2") ? "pos-2" : "pos-3";

        const pos1 = document.querySelector(".pos-1");
        pos1.classList.remove("pos-1");
        card.classList.remove(currentPos);
        pos1.classList.add(currentPos);
        card.classList.add("pos-1");
    });

    // Mouse Event Listeners
    card.addEventListener("mousedown", () => {
        clearInterval(cardsInterval);
        demoTooltip.classList.remove("active_");
        demoTooltip.classList.add("active");
    });
    card.addEventListener("mouseup", setCardsInterval);
    card.addEventListener("mouseover", (e) => {
        demoTooltip.classList.add("active_");
    });
    card.addEventListener("mouseout", (e) => {
        demoTooltip.classList.remove("active_");
    });
});
let nextCard = "2";

// Home Demo Tooltip Positioning
function positionTooltip(e) {
    demoTooltip.style.top = e.pageY + "px";
    demoTooltip.style.left = e.pageX + "px";
}
window.addEventListener("mousemove", positionTooltip);

// Set Cards Interval
function setCardsInterval() {
    demoTooltip.classList.remove("active");
    clearInterval(cardsInterval);
    cardsInterval = setInterval(() => {
        document.querySelector(`.pos-${nextCard}`).click();
        nextCard = nextCard == "2" ? "3" : "2";
    }, 3000);
}
setCardsInterval();

// Dynamic Card Filling
const date = new Date();
document.querySelector(".today-day").innerText = date.getDate();
document.querySelector(".today-month").innerText = date.getMonth() + 1;
document.querySelector(".today-year").innerText = date
    .getFullYear()
    .toString()
    .substring(2);
document.querySelector(".today-hour").innerText = (() => {
    const hour = date.getHours();
    if (hour == 0) return 12;
    if (hour >= 13) return hour - 12;
    return hour;
})();
document.querySelector(".today-minute").innerText = (() => {
    const minute = date.getMinutes();
    return minute.toString().padStart(2, "0");
})();
document.querySelector(".today-time").innerText = (() => {
    const hour = date.getHours();
    if (hour >= 12) return "PM";
    else return "AM";
})();

const randomString = (() => {
    const chars = "QWERTYUIOPLKJHGFDSAZXCVBNM1234567890";
    let result = "";
    for (let i = 0; i < 12; i++) {
        const rand = Math.floor(Math.random() * chars.length);
        result += chars[rand];
    }
    return result;
})();
document.querySelector(".random-string").innerText = randomString;

// Dynamic Features Numbering
const allFeatures = document.querySelectorAll(".home-phrases div");
allFeatures.forEach((feature) => {
    allSubFeatures = feature.querySelectorAll("ul li");
    for (let i = 0; i < allSubFeatures.length; i++) {
        allSubFeatures[i].insertAdjacentHTML(
            "afterbegin",
            `<span>${i + 1}</span>`
        );
    }
});
