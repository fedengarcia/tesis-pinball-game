
class BricksClass {
    canvas;
    canvasContext;
    gameConfig;
    paddle;
    ball;
    brickInfo;
    bricks;
    lives = 2
    score = 0
    elementsToFall = []
    gameEnd = false;
    interactions



    constructor(canvas, canvasContext, gameConfig) {
        this.canvas = canvas;
        this.canvasContext = canvasContext;
        this.gameConfig = gameConfig

        this.paddle = {
            x: this.canvas.width / 2 - 40,
            y: this.canvas.height - 20,
            w: 130,
            h: 20,
            speed: 8,
            dx: 0,
            visible: true  
        }

        this.ball = {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
            size: 10,
            speed: 4,
            dx: 4,
            dy: -4,
            visible: true     
        }

        this.brickInfo = {
            w: 80,
            h: 20,
            padding: 12,
            offsetX: 40,
            offsetY: 80,
            visible: true
        }

    }

    clearCanvas () {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
        this.ctx.fillStyle = '#000000'
        this.ctx.beginPath()
        this.ctx.fill()
    }

    // Draw ball on canvas
    drawBall () {
        this.canvasContext.beginPath();
        this.canvasContext.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
        this.canvasContext.fillStyle = ball.visible ? '#0095dd' : 'transparent';
        this.canvasContext.fill();
        this.canvasContext.closePath();
    }

     // Draw paddle on canvas
    drawPaddle  () {
        this.canvasContext.beginPath();
        this.canvasContext.rect(this.paddle.x, this.paddle.y, this.paddleWidth, this.paddleHeight);
        this.canvasContext.fillStyle = paddle.visible ? '#0095dd' : 'transparent';
        this.canvasContext.fill();
        this.canvasContext.closePath();
    }

    // Draw bricks on canvas
    drawBricks () {
        bricks.forEach(column => {
            column.forEach(brick => {
                this.canvasContext.beginPath();
                this.canvasContext.rect(brick.x, brick.y, brick.w, brick.h);
                this.canvasContext.fillStyle = brick.visible ? '#0095dd' : 'transparent';
                this.canvasContext.fill();
                this.canvasContext.closePath();
            });
        });
    }

    // Draw falling elements
    drawElementsToFall () {
        this.elementsToFall.forEach(elementToFall => {
            let elementImage = new Image();
            elementImage.src = elementToFall.element.src
            this.canvasContext.drawImage(elementImage, elementToFall.x, elementToFall.y, 70, 70);
        });
    }

    updateStatus(mouse, scaleRatio) {
        if (this.gameEnd === true) return;

        this.gameConfig.width *= scaleRatio.xRatio;
        this.gameConfig.height *= scaleRatio.yRatio;

        this.mouse = mouse;

        this.mouse.x *= scaleRatio.xRatio;
        this.mouse.y *= scaleRatio.yRatio;



        this.movePaddle();
        this.moveBall()
        this.fallingElement()
    }

    draw () {
        clearCanvas()
        // canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        
        this.drawElementsToFall();
        this.drawBall();
        this.drawPaddle();
        this.drawBricks();
      }

    fallingElement () {
        this.elementsToFall = this.elementsToFall.filter(elementFalling => {
            elementFalling.y += elementFalling.vy;
            if (
                elementFalling.x < this.paddle.x + this.paddle.w &&
                elementFalling.x + elementFalling.w > this.paddle.x &&
                elementFalling.y < this.paddle.y + this.paddle.h &&
                elementFalling.y + elementFalling.h > this.paddle.y
              ) {
                // save interaction with element
                this.interactions = {
                  [elementFalling.element.name]: this.interactions[elementFalling.element.name] + 1
                }
                if (elementFalling.element.bonification === "premio") {
                  this.score = this.score + 2
                } else if (elementFalling.element.bonification === "mediadora") {
                    this.lives = this.lives + 1
                } else if (elementFalling.element.bonification === "nula") {
                    this.paddle.w = this.paddle.w + 20
                }
            }
        })
      
    }

    movePaddle() {
        this.paddle.x += this.paddle.dx;
    
        // Wall detection
        if (this.paddle.x + this.paddle.w > this.canvas.width) {
            this.paddle.x = this.canvas.width - this.paddle.w;
        }
    
        if (this.paddle.x < 0) {
            this.paddle.x = 0;
        }    
    }

    moveBall() {
        this.ball.x += this.ball.dx;
        this.ball.y += this.ball.dy;
        
        this.checkBottomCollision()
        this.checkBorderCanvasCollision()
        this.checkPaddleCollision()
        this.checkBrickCollision()
    }

    checkBrickCollision () {
        // Brick collision
        this.bricks.forEach((column, columnIndex) => {
            column.forEach((brick, brickIndex) => {
                if (brick.visible) {
                    if (
                    this.ball.x - this.ball.size > brick.x && 
                    this.ball.x + this.ball.size < brick.x + brick.w &&
                    this.ball.y + this.ball.size > brick.y &&
                    this.ball.y - this.ball.size < brick.y + brick.h
                    ) {
                        this.ball.dy *= -1;
                        if (brick.element && brick.visible) {
                            this.elementsToFall.push({
                                x: brick.x,
                                y: brick.y,
                                vy: 2,
                                element: brick.element,
                                w: brick.w, 
                                h: brick.h 
                            })
                            brick.visible = false;
                        }
                        increaseScore();
                    }
                }
            });
        });
    }

    checkPaddleCollision () {
      // Paddle collision
      if (
        this.ball.x - this.ball.size > this.paddle.x &&
        this.ball.x + this.ball.size < this.paddle.x + this.paddle.w &&
        this.ball.y + this.ball.size > this.paddle.y
      ) {
        this.ball.dy = - this.ball.speed;
      }
    }

    checkBorderCanvasCollision () {
        // Wall collision (right/left)
         if (this.ball.x + this.ball.size > this.canvas.width || this.ball.x - this.ball.size < 0) {
            this.ball.dx *= -1; // ball.dx = ball.dx * -1
        }
  
        // Wall collision (top/bottom)
        if (this.ball.y + this.ball.size > this.canvas.height || this.ball.y - this.ball.size < 0) {
            this.ball.dy *= -1;
        }
    }

    checkBottomCollision () {
        if (this.ball.y + this.ball.size > this.canvas.height) {
            if(this.lives > 0){
                this.lives = this.lives - 1
                resetBallAndPaddle();
                showAllBricks();
            }else{
                handleGameOver();
            }
        }
    }

    resetBallAndPaddle () {
        // Restablece la posición del paddle y la pelota al centro o a una posición inicial
        // Ejemplo:
        this.paddle.x = this.canvas.width / 2 - this.paddleWidth / 2; // Asegúrate de que paddleWidth esté actualizado
        this.paddle.y = this.canvas.height - 20; // O donde sea que inicialmente coloques el paddle
        this.ball.x = this.canvas.width / 2;
        this.ball.y = this.canvas.height / 2;
        this.ball.dx = 2; // O los valores iniciales que tengas para dx y dy
        this.ball.dy = -2;
    }

    gameOver () { 
        this.gameEnd = true
    }
}

export default BricksClass;
