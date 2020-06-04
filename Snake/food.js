import { onSnake, expandSnake, checkFoodNotValid } from "./snake.js";

const getRandomFoodPosition = () => {
    let newPostion = null;
    while (newPostion === null || checkFoodNotValid(newPostion)) {
        newPostion = {
            x: Math.ceil(Math.random() * 21),
            y: Math.ceil(Math.random() * 21),
        };
    }
    return newPostion;
};

let food = getRandomFoodPosition();

export const update = () => {
    if (onSnake(food)) {
        expandSnake();
        food = getRandomFoodPosition();
    }
};

export const draw = (gameBord) => {
    const foodElement = document.createElement("div");
    foodElement.style.gridColumnStart = food.x;
    foodElement.style.gridRowStart = food.y;
    foodElement.classList.add("food");
    gameBord.appendChild(foodElement);
};
