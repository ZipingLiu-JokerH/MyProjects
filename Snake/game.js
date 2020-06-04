import {
    update as updateSnake,
    draw as drawSnake,
    SNAKE_SPEED,
    deadSnake,
    getScore,
} from "./snake.js";

import { update as updateFood, draw as drawFood } from "./food.js";

const gameBord = document.querySelector(".gameBord");

let lastRenderTime = 0;
let gameOver = false;

const main = (currentTime) => {
    if (gameOver) {
        const score = getScore();
        return alert(`You Score is ${score}`);
    }
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

    lastRenderTime = currentTime;
    console.log("render");

    update();
    draw();
};

window.requestAnimationFrame(main);

const checkDeath = () => {
    gameOver = deadSnake();
};

const update = () => {
    updateSnake();
    updateFood();
    checkDeath();
};

const draw = () => {
    gameBord.innerHTML = "";
    drawSnake(gameBord);
    drawFood(gameBord);
};
