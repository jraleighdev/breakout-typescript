import { Paddle } from './classes/paddle';
import { Ball } from './classes/ball';
import { Brick } from './classes/brick';

const rulesBtn: HTMLButtonElement = document.getElementById('rules-btn') as HTMLButtonElement;
const closeBtn: HTMLButtonElement = document.getElementById('close-btn') as HTMLButtonElement;;
const rules: HTMLElement = document.getElementById('rules') as HTMLElement;
const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;

let score = 0;

const brickRowCount = 9;
const brickColumnCount = 5;

const ball: Ball = new Ball(canvas.width / 2,
                            canvas.height / 2,
                            10,
                            4,
                            4,
                            -4,
                            ctx);


const paddle: Paddle = new Paddle(canvas.width / 2 - 40,
                                  canvas.height - 20,
                                  80, 
                                  10,
                                  8,
                                  0,
                                  ctx);

const bricks: Brick[] = [];

for (let i = 0; i < brickRowCount; i++) {
    for (let j = 0; j < brickColumnCount; j++) {
        const b = new Brick();
        const x = i * (b.w + b.padding) + b.offsetX;
        const y = j * (b.h + b.padding) + b.offsetY;
        b.x = x;
        b.y = y;
        bricks.push(b);
    }
}

// draw bricks
function drawBricks() {
    bricks.forEach(b => {
        ctx.beginPath();
        ctx.rect(b.x, b.y, b.w, b.h);
        ctx.fillStyle = b.visible ? '#0095dd' : 'transparent';
        ctx.fill();
        ctx.closePath();
    })
}


function drawScore() {
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

// move paddle
function movePaddle() {
    paddle.x += paddle.dx;

    // wall detection
    if (paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w;
    }

    if (paddle.x < 0) {
        paddle.x = 0;
    }
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // wall collision right left
    if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx *= -1;
    }

    // wall collision top bottom
    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.dy *= -1;
    }

    // paddle collision
    if (ball.x - ball.size > paddle.x && 
        ball.x + ball.size < paddle.x + paddle.w && 
        ball.y + ball.size > paddle.y) {
            ball.dy = -ball.speed;
    }

    // brick collision
    bricks.forEach(b => {
        if (b.visible) {
            if (ball.x - ball.size > b.x && // left brick side
                ball.x + ball.size < b.x + b.w && // right brick side
                ball.y + ball.size > b.y && // top brick side
                ball.y - ball.size < b.y + b.h // bottom brick side
                )  {
                    ball.dy *= -1;
                    b.visible = false;
                    increaseScore();
                }
        }
    });

    if (ball.y + ball.size > canvas.height) {
        showAllBricks();
        score = 0;
    }
}

function increaseScore() {
    score++;

    if (score % (brickRowCount * brickRowCount) === 0) {
        showAllBricks();
    }
}

function showAllBricks() {
    bricks.forEach(b => {
        b.visible = true;
    })
}

// draw everthing
function draw() {
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    paddle.drawPaddle();
    ball.drawBall();
    drawScore();
    drawBricks();
}

// update canvas drawing and animation
function update() {
    movePaddle();
    moveBall();

    draw();

    requestAnimationFrame(update);
}

update();

// key board events
function keyDown(e: KeyboardEvent) {
    if (e.key === 'Right' || e.key === "ArrowRight") {
        paddle.dx = paddle.speed;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        paddle.dx = -paddle.speed
    }
}

function keyUp(e: KeyboardEvent) {
    if (e.key === 'Right' || e.key === "ArrowRight" || e.key === "Left" || e.key === "ArrowLeft") {
        paddle.dx = 0;
    } 
}

// keyboard events handler
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// event listeners
rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));