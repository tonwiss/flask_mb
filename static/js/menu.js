document.addEventListener("DOMContentLoaded", () => {
    const playFriendBtn = document.getElementById("play-friend");
    const modal = document.getElementById("modal");
    const closeModalBtn = document.getElementById("close-modal");
    const createGameBtn = document.getElementById("create-game");
    const gameCodeInput = document.getElementById("game-code");

    // показать модалку
    playFriendBtn.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    // закрыть модалку
    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // создать игру
    createGameBtn.addEventListener("click", () => {
        const code = gameCodeInput.value.trim().toUpperCase();
        if (code.length === 5) {
            // передаём код в game.html через query-параметр
            window.location.href = "/game?code=" + code;
        } else {
            alert("Код должен состоять из 5 символов (латинские буквы и цифры).");
        }
    });
});