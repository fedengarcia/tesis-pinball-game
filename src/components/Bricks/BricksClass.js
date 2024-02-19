import apple from '../../assets/apple-logo.svg'
class BricksClass {
    canvas;
    canvasContext;
    gameConfig;
    ball;
    brickInfo;
    bricks;
    brickRowCount = 9;
    brickColumnCount = 5;
    lives = 2
    score = 0
    elementsToFall = []
    interactions = {}

    setGameEndResult = null
    setLives = null
    setScore = null
    setElementCatched = null
    setInteractions = null
    showBonification = null
    gameEndModal = null
    saveGameResults = null

    constructor(canvas, canvasContext, gameConfig, setLives, setElementCatched, setScore, setInteractions, setGameEndResult, showBonification, gameEndModal, saveGameResults) {
        this.canvas = canvas;
        this.canvasContext = canvasContext;
        this.gameConfig = gameConfig;
        this.setGameEndResult = setGameEndResult;
        this.setLives = setLives;
        this.setScore = setScore;
        this.setElementCatched = setElementCatched;
        this.setInteractions = setInteractions
        this.interactions = {
            [gameConfig.elementsNames[0]]: 0,
            [gameConfig.elementsNames[1]]: 0,
            [gameConfig.elementsNames[2]]: 0
        }
        this.showBonification = showBonification
        this.gameEndModal = gameEndModal
        this.saveGameResults = saveGameResults

        this.paddle = {
            x: this.canvas.width / 2 - 40,
            y: this.canvas.height - 20,
            w: 130,
            h: 20,
            speed: 4,
            dx: 0,
            visible: true  
        }
        this.ball = {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
            size: 10,
            speed: 2,
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

        this.createBricks()

        // Keyboard event handlers
        this.keyDown = this.keyDown.bind(this);  // Agregar esta línea
        this.keyUp = this.keyUp.bind(this);  // Agregar esta línea
        document.addEventListener('keydown', this.keyDown);
        document.addEventListener('keyup', this.keyUp);
    }

    createBricks () {

        if(this.brickInfo.visible!==undefined){
            let newArray=[]
            for (let i = 0; i < this.brickRowCount; i++) {
              newArray[i] = [];
              for (let j = 0; j < this.brickColumnCount; j++) {
                const x = i * (this.brickInfo.w + this.brickInfo.padding) + this.brickInfo.offsetX;
                const y = j * (this.brickInfo.h + this.brickInfo.padding) + this.brickInfo.offsetY;

                let element = null;
                const randomElement = Math.random() * 100;
                if (randomElement < 33) element = this.gameConfig.tables[0];
                else if (randomElement < 66) element =  this.gameConfig.tables[1];
                else element = this.gameConfig.tables[2];
                newArray[i][j] = { x, y, element, ...this.brickInfo };
              }
            }
            this.bricks = newArray
          }
    }

    // Keydown event
    keyDown (e) {
        if (e.key === 'Right' || e.key === 'ArrowRight') {
            this.paddle.dx = this.paddle.speed;
        } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
            this.paddle.dx = - this.paddle.speed;
        }
    }

    // Keyup event
    keyUp (e) {
        if (
        e.key === 'Right' ||
        e.key === 'ArrowRight' ||
        e.key === 'Left' ||
        e.key === 'ArrowLeft'
        ) {
            this.paddle.dx = 0;
        }
    }

    clearCanvas () {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.canvasContext.fillStyle = '#000000'
        this.canvasContext.beginPath()
        this.canvasContext.fill()
        this.canvasContext.closePath();
    }

    // Draw ball on canvas
    drawBall () {
        this.canvasContext.beginPath();
        this.canvasContext.arc(this.ball.x, this.ball.y, this.ball.size, 0, Math.PI * 2);
        this.canvasContext.fillStyle = this.ball.visible ? '#0095dd' : 'transparent';
        this.canvasContext.fill();
        this.canvasContext.closePath();
    }

     // Draw paddle on canvas
    drawPaddle  () {
        this.canvasContext.beginPath();
        this.canvasContext.rect(this.paddle.x, this.paddle.y, this.paddle.w, this.paddle.h);
        this.canvasContext.fillStyle = this.paddle.visible ? '#0095dd' : 'transparent';
        this.canvasContext.fill();
        this.canvasContext.closePath();
    }

    // Draw bricks on canvas
    drawBricks () {
        this.bricks?.forEach(column => {
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
        this.elementsToFall.forEach((elementToFall) => {
            let elementImage = new Image();
            elementImage.src = elementToFall.element.src;
            this.canvasContext.drawImage(elementImage, elementToFall.x, elementToFall.y, 70, 70);
        });
    }

    updateStatus(scaleRatio) {
        this.gameConfig.width *= scaleRatio.xRatio;
        this.gameConfig.height *= scaleRatio.yRatio;

        this.movePaddle();
        this.moveBall()
        this.fallingElement()
    }

    draw () {
        this.clearCanvas()
        this.drawElementsToFall();
        this.drawBall();
        this.drawPaddle();
        this.drawBricks();
    }

    fallingElement () {
        this.elementsToFall.filter(elementFalling => {
            elementFalling.y += elementFalling.vy;
            if (
                elementFalling.x < this.paddle.x + this.paddle.w &&
                elementFalling.x + elementFalling.w > this.paddle.x &&
                elementFalling.y < this.paddle.y + this.paddle.h &&
                elementFalling.y + elementFalling.h > this.paddle.y
              ) {
                // save interaction with element
                this.interactions[elementFalling.element.name] = this.interactions[elementFalling.element.name] + 1
                this.setInteractions(this.interactions)
                if (elementFalling.element.bonification === "premio") {
                  this.score = this.score + 2
                  this.setScore(this.score)
                  this.showBonification("+2 puntos extra !")
                } else if (elementFalling.element.bonification === "mediadora") {
                    this.lives = this.lives + 1
                    this.setLives(this.lives)
                    this.showBonification("+1 vida extra !")
                } else if (elementFalling.element.bonification === "nula") {
                    this.paddle.w = this.paddle.w + 0.25
                    this.showBonification("Agrandas paddle")

                }
                return false
            }
            if (elementFalling.y > this.canvas.height) {
                return false;
            }
            return true;
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
        this.bricks?.forEach((column, columnIndex) => {
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
                        this.score = this.score + 1;
                        this.setScore(this.score)
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
                this.setLives(this.lives)
                this.resetBallAndPaddle();
                this.showAllBricks();
            }else{
                this.gameOver();
            }
        }
    }

    resetBallAndPaddle () {
        // Restablece la posición del paddle y la pelota al centro o a una posición inicial
        // Ejemplo:
        this.paddle.x = this.canvas.width / 2 - this.paddle.w / 2; // Asegúrate de que paddleWidth esté actualizado
        this.paddle.y = this.canvas.height - 20; // O donde sea que inicialmente coloques el paddle
        this.ball.x = this.canvas.width / 2;
        this.ball.y = this.canvas.height / 2;
        this.ball.dx = 2; // O los valores iniciales que tengas para dx y dy
        this.ball.dy = -2;
    }

      // Make all bricks appear
    showAllBricks () {
        this.bricks?.forEach(column => {
            column.forEach(brick => (brick.visible = true));
        });
    } 

    gameOver () { 
        this.setGameEndResult(this.gameConfig.tables)
        this.gameEndModal('FIN DEL JUEGO', `Obtuviste una puntuacion de ${this.score}`, () => this.saveGameResults())
    }
}

export default BricksClass;
