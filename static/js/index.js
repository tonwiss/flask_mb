document.addEventListener("DOMContentLoaded", () => {
    console.log("Index page loaded!");

    // Лёгкая анимация "волн" для заголовка
    const title = document.querySelector(".title");
    let angle = 0;
    setInterval(() => {
        angle += 0.05;
        title.style.transform = "translateY(" + (Math.sin(angle) * 5) + "px)";
    }, 50);
});