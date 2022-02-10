const gameCanvas = document.querySelector('canvas');
let ctx = gameCanvas.getContext('2d');
let foodX, foodY;
let direction = 'ArrowRight';
let snake = [
    { x: 150, y: 150 },
    { x: 140, y: 150 },
    { x: 130, y: 150 },
    { x: 120, y: 150 },
    { x: 110, y: 150 }
];
let randomNumber = (max, min) => Math.round((Math.random() * (max - min) + min) / 10) * 10;

function main() {
    let interval = setInterval(() => {
        clearCanvas();
        drawSnake();
        drawFood();
        moveSnake(direction);
    }, 500)
}
let createFood = () => {
    foodX = randomNumber(gameCanvas.width, 0);
    foodY = randomNumber(gameCanvas.height, 0);
    foodX === gameCanvas.width ? foodX -= 10 : foodX = foodX;
    foodY === gameCanvas.width ? foodY -= 10 : foodY = foodY;
    snake.forEach(snakePart => {
        if (foodX === snakePart.x && foodY === snakePart.y) {
            createFood();
        }
    })
}
createFood();
let drawFood = () => {
    ctx.fillStyle = 'red';
    ctx.fillRect(foodX, foodY, 10, 10);
    ctx.strokeRect(foodX, foodY, 10, 10);
}

let clearCanvas = () => {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}
let drawSnake = () => {
    snake.forEach(snakePart => {
        ctx.fillStyle = 'lightgreen';
        ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
        ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    })
}
let moveSnake = (direction) => {
    let head;
    switch (direction) {
        case 'ArrowUp':
            head = { x: snake[0].x + 0, y: snake[0].y - 10 }
            break;
        case 'ArrowRight':
            head = { x: snake[0].x + 10, y: snake[0].y + 0 }
            break;
        case 'ArrowLeft':
            head = { x: snake[0].x - 10, y: snake[0].y + 0 }
            break;
        case 'ArrowDown':
            head = { x: snake[0].x + 0, y: snake[0].y + 10 }
            break;
        default:
            break;
    }

    head.x >= gameCanvas.width ? head.x -= gameCanvas.width :
        head.x < 0 ? head.x = gameCanvas.width - Math.abs(head.x) :
        head.y >= gameCanvas.height ? head.y -= gameCanvas.height :
        head.y < 0 ? head.y = gameCanvas.height - Math.abs(head.y) :
        true;


    snake.unshift(head);
    snake.pop();
    console.log(head.x + '---' + head.y)
    console.log(gameCanvas.width + '---' + gameCanvas.height)
}
main();
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        if (direction === 'ArrowUp' || direction === 'ArrowDown') {
            direction = e.key;
        }
    } else {
        direction = e.key;
    }
})