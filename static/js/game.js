document.addEventListener("DOMContentLoaded", () => {
    const myBoard = document.getElementById("my-board");
    const enemyBoard = document.getElementById("enemy-board");
    const shipSelectBtn = document.getElementById("ship-select");
    const shipList = document.getElementById("ship-list");

    const codeDisplay = document.getElementById("game-code-display");
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) codeDisplay.textContent = "Код группы: " + code;

    // создаём оба поля
    createBoard(myBoard);
    createBoard(enemyBoard);

    function createBoard(board) {
        for (let i = 0; i < 100; i++) {
            const cell = document.createElement("div");
            cell.dataset.index = i;
            board.appendChild(cell);
        }
    }

    // список кораблей
    let ships = {
        4: 1,
        3: 2,
        2: 3,
        1: 4
    };
    let selectedShip = null;

    // показать/скрыть список кораблей
    shipSelectBtn.addEventListener("click", () => {
        shipList.style.display = shipList.style.display === "block" ? "none" : "block";
    });

    // выбор корабля
    shipList.querySelectorAll("li").forEach(li => {
        li.addEventListener("click", () => {
            const size = parseInt(li.dataset.size);
            if (ships[size] > 0) {
                selectedShip = size;
                alert(`Выбран ${size}-палубный корабль. Кликните на поле для постановки.`);
            } else {
                alert("Корабли этого типа закончились!");
            }
            shipList.style.display = "none";
        });
    });

    document.addEventListener("DOMContentLoaded", () => {
    let timeLeft = 120; // 2 минуты
    const timerEl = document.getElementById("timer");

    const timer = setInterval(() => {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timerEl.textContent = `Время: ${minutes}:` + seconds < 10 ? "0" + seconds : seconds;
        
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timer);
            alert("Время истекло! Начинается бой!");
            // здесь можно вызвать функцию начала игры
        }
    }, 1000);
    });

    // установка корабля
    myBoard.addEventListener("click", (e) => {
        if (!selectedShip) return;
        const cellIndex = parseInt(e.target.dataset.index);
        const row = Math.floor(cellIndex / 10);
        const col = cellIndex % 10;

        // проверка можно ли поставить (в одну линию горизонтально)
        if (col + selectedShip > 10) {
            alert("Корабль не помещается!");
            return;
        }

        // проверка занятости клеток
        for (let i = 0; i < selectedShip; i++) {
            const idx = row * 10 + (col + i);
            const cell = myBoard.querySelector(`div[data-index="${idx}"]`);
            if (cell.classList.contains("ship")) {
                alert("Здесь уже стоит корабль!");
                return;
            }
        }

        // ставим корабль
        for (let i = 0; i < selectedShip; i++) {
            const idx = row * 10 + (col + i);
            const cell = myBoard.querySelector(`div[data-index="${idx}"]`);
            cell.classList.add("ship");
            cell.style.background = "gray";
        }

        // уменьшаем количество
        ships[selectedShip]--;
        document.getElementById(`count-${selectedShip}`).textContent = ships[selectedShip];
        selectedShip = null;
    });
});