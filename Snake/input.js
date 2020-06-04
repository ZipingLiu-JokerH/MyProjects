let inputDirection = { x: 0, y: 0 };

window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            if (inputDirection.y !== 0) break;
            inputDirection = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            if (inputDirection.y !== 0) break;
            inputDirection = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            if (inputDirection.x !== 0) break;
            inputDirection = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            if (inputDirection.x !== 0) break;
            inputDirection = { x: 1, y: 0 };
            break;
        default:
            break;
    }
});

export const getDirection = () => {
    return inputDirection;
};
