import { getDirection } from "./input.js";

// how many moves per second
export const SNAKE_SPEED = 10;
export const snakeBody = [{ x: 11, y: 11 }];
let newSegment = 0;

export const update = () => {
    const direction = getDirection();
    const oldHead = snakeBody[0];
    const popedSegment = snakeBody.pop();
    const newHead = { ...oldHead };
    newHead.x += direction.x;
    newHead.y += direction.y;
    snakeBody.unshift(newHead);

    if (newSegment != 0) {
        snakeBody.push(popedSegment);
        newSegment = 0;
    }
};

export const draw = (gameBord) => {
    snakeBody.forEach((segment) => {
        const snakeElement = document.createElement("div");
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.classList.add("snake");
        gameBord.appendChild(snakeElement);
    });
};

export const expandSnake = () => {
    newSegment = 1;
};

export const onSnake = (position) => {
    return snakeBody[0].x === position.x && snakeBody[0].y === position.y;
};

// return true if new food postion not valid
export const checkFoodNotValid = (foodPosition) => {
    return snakeBody.some((segment) => {
        return segment.x === foodPosition.x && segment.y === foodPosition.y;
    });
};

// return true if head crash on body
const checkCrash = (head) => {
    return snakeBody.slice(1).some((segment) => {
        return segment.x === head.x && segment.y === head.y;
    });
};

// check if the snake has dead
export const deadSnake = () => {
    return (
        snakeBody[0].x < 1 ||
        snakeBody[0].x > 21 ||
        snakeBody[0].y < 1 ||
        snakeBody[0].y > 21 ||
        checkCrash(snakeBody[0])
    );
};

// return snake length
export const getScore = () => {
    return snakeBody.length;
};
