const gameCanvas = document.querySelector('canvas');
let ctx = gameCanvas.getContext('2d');
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);


let snake = [
    { x: 150, y: 150 },
    { x: 140, y: 150 },
    { x: 130, y: 150 },
    { x: 120, y: 150 },
    { x: 110, y: 150 }
];
snake.forEach(snakePart => {
    ctx.fillStyle = 'lightgreen';
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
})


let randomNumber = (max, min) => Math.round((Math.random() * (max - min) + min) / 10) * 10;
let foodX, foodY;

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
ctx.fillStyle = 'red';
ctx.fillRect(foodX, foodY, 10, 10);
ctx.strokeRect(foodX, foodY, 10, 10);