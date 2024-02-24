import apple from '../../assets/apple-logo.svg'
class BricksClass {
    canvas;
    canvasContext;

    //Game configuration variables 
    gameConfig;
    ball;
    brickInfo = {};
    bricks = [];
    brickRowCount = 9;
    brickColumnCount = 5;
    lives = 3
    score = 0
    elementsToFall = []
    interactions = {}
    particleInfo = {}
    particlesToDraw = []

    // Bonifications colors bricks
    standardColor = '#0095dd';  // Color estándar para bloques
    nullBonusColor = '#CCCCCC';  // Color para bonificación nula
    mediatorBonusColor = '#FFA500';  // Color para bonificación mediadora
    powerupBonusColor = '#00FF00';  // Color para bonificación de poder
    paddleColor = '#0011F30'
    
    // Functions 
    setGameEndResult = null
    setLives = null
    setScore = null
    setElementCatched = null
    setInteractions = null
    showBonification = null
    gameEndModal = null
    saveGameResults = null
    getTimePlayed = null

    constructor(canvas, canvasContext, gameConfig, setLives, setElementCatched, setScore, setInteractions, setGameEndResult, showBonification, gameEndModal, saveGameResults, getTimePlayed) {
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
        this.getTimePlayed = getTimePlayed

        this.paddle = {
            x: this.canvas.width / 2 - 65,
            y: this.canvas.height - 20,
            w: 130,
            h: 20,
            borderRadius: 10, // Radio de las esquinas para hacerlo redondeado
            speed: 4,
            dx: 0,
            visible: true  
        }
       this.ball = {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
            size: 10,
            speed: 1.5,
            dx: 2,
            dy: -2,
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

        this.particleInfo = {
            w: 1,
            h: 1,    
            timeToLive: 1,
            radius: 2,
            alpha: 1,
            velocity: {
                x: 1, // Velocidad en el eje x
                y: 1  // Velocidad en el eje y
            }
        }


        this.createBricks()

        // Keyboard event handlers
        this.keyDown = this.keyDown.bind(this);
        this.keyUp = this.keyUp.bind(this); 
        document.addEventListener('keydown', this.keyDown);
        document.addEventListener('keyup', this.keyUp);
    }

    // Create bricks
    createBricks () {
        if(this.brickInfo.visible!==undefined){
            let newArray=[]
            for (let i = 0; i < this.brickRowCount; i++) {
              newArray[i] = [];
              for (let j = 0; j < this.brickColumnCount; j++) {
                const x = i * (this.brickInfo.w + this.brickInfo.padding) + this.brickInfo.offsetX;
                const y = j * (this.brickInfo.h + this.brickInfo.padding) + this.brickInfo.offsetY;


                // % random
                let element = null;
                const randomElement = Math.random() * 100;
                if(randomElement < 20) element = {visible: true}
                else if (randomElement < 40) element = this.gameConfig.tables[0];
                else if (randomElement < 60) element =  this.gameConfig.tables[1];
                else element = this.gameConfig.tables[2];

                // Selección del color según la bonificación del ladrillo
                let brickColor;
                switch (element?.bonification) {
                    case 'nula':
                        brickColor = this.nullBonusColor;
                        break;
                    case 'mediadora':
                        brickColor = this.mediatorBonusColor;
                        break;
                    case 'premio':
                        brickColor = this.powerupBonusColor;
                        break;
                    default:
                        brickColor = this.standardColor;
                        break;
                }
                newArray[i][j] = { x, y, element, brickColor, ...this.brickInfo };
              }
            }
            this.bricks = newArray
          }
    }

    createParticlesBrokenEffect(brick, count) {
        const centerX = brick.x + brick.w / 2;
        const centerY = brick.y + brick.h / 2;

        for (let i = 0; i < count; i++) {
            this.particlesToDraw.push({
                ...this.particleInfo,
                x: centerX,
                y: centerY,
                color: brick.brickColor,
            });
        }
    }

    // Create element to fall
     createElementToFall(positionX, positionY, brickElement, brickWidth, brickHeight, brickColor) {
       this.elementsToFall.push({
            x: positionX,
            y: positionY,
            vy: 2,
            element: brickElement,
            w: brickWidth, 
            h: brickHeight,
            brickColor 
        })
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

    // Clear canvas 
    clearCanvas () {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.canvasContext.fillStyle = '#000000'
        this.canvasContext.beginPath()
        this.canvasContext.fill()
        this.canvasContext.closePath();
    }

   // Draw ball on canvas
    drawBall() {
        this.canvasContext.beginPath();

        // Gradiente radial para darle un aspecto tridimensional
        let gradient = this.canvasContext.createRadialGradient(this.ball.x, this.ball.y, 0, this.ball.x, this.ball.y, this.ball.size);
        gradient.addColorStop(0, '#0095dd'); // Color principal
        gradient.addColorStop(1, '#004466'); // Color para sombra

        this.canvasContext.arc(this.ball.x, this.ball.y, this.ball.size, 0, Math.PI * 2);
        this.canvasContext.fillStyle = gradient;
        
        // Aplicar sombra y brillo
        this.canvasContext.shadowColor = 'rgba(0, 0, 0, 0.3)';
        this.canvasContext.shadowBlur = 5;
        this.canvasContext.shadowOffsetX = 2;
        this.canvasContext.shadowOffsetY = 2;

        this.canvasContext.fill();
        this.canvasContext.closePath();

        // Restaurar valores de sombra
        this.canvasContext.shadowBlur = 0;
        this.canvasContext.shadowOffsetX = 0;
        this.canvasContext.shadowOffsetY = 0;
    }

    drawPaddle() {
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(this.paddle.x + this.paddle.borderRadius, this.paddle.y);
        this.canvasContext.lineTo(this.paddle.x + this.paddle.w - this.paddle.borderRadius, this.paddle.y);
        this.canvasContext.quadraticCurveTo(this.paddle.x + this.paddle.w, this.paddle.y, this.paddle.x + this.paddle.w, this.paddle.y + this.paddle.borderRadius);
        this.canvasContext.lineTo(this.paddle.x + this.paddle.w, this.paddle.y + this.paddle.h - this.paddle.borderRadius);
        this.canvasContext.quadraticCurveTo(this.paddle.x + this.paddle.w, this.paddle.y + this.paddle.h, this.paddle.x + this.paddle.w - this.paddle.borderRadius, this.paddle.y + this.paddle.h);
        this.canvasContext.lineTo(this.paddle.x + this.paddle.borderRadius, this.paddle.y + this.paddle.h);
        this.canvasContext.quadraticCurveTo(this.paddle.x, this.paddle.y + this.paddle.h, this.paddle.x, this.paddle.y + this.paddle.h - this.paddle.borderRadius);
        this.canvasContext.lineTo(this.paddle.x, this.paddle.y + this.paddle.borderRadius);
        this.canvasContext.quadraticCurveTo(this.paddle.x, this.paddle.y, this.paddle.x + this.paddle.borderRadius, this.paddle.y);
        
        // Aplicar sombras y brillo
        let gradient = this.canvasContext.createLinearGradient(this.paddle.x, this.paddle.y, this.paddle.x, this.paddle.y + this.paddle.h);
        gradient.addColorStop(0, '#005588'); // Color principal
        gradient.addColorStop(1, '#0077aa'); // Color para resaltar o dar brillo
        
        this.canvasContext.fillStyle = gradient;
        // Agregar relieve
        this.canvasContext.shadowColor = 'rgba(255, 255, 255, 0.5)';
        this.canvasContext.shadowBlur = 3;
        this.canvasContext.shadowOffsetX = 1;
        this.canvasContext.shadowOffsetY = 1;
        
        this.canvasContext.fill();
        this.canvasContext.closePath();
        
        // Restaurar valores de sombra
        this.canvasContext.shadowBlur = 0;
        this.canvasContext.shadowOffsetX = 0;
        this.canvasContext.shadowOffsetY = 0;
    }

    // Draw bricks on canvas with improved styles and bonuses
    drawBricks() {
        this.bricks?.forEach(column => {
            column.forEach(brick => {

            // Gradiente radial para simular sombreado
            const gradient = this.canvasContext.createRadialGradient(
                brick.x + brick.w / 2, brick.y + brick.h / 2, 1,
                brick.x + brick.w / 2, brick.y + brick.h / 2, brick.w / 2
            );

            gradient.addColorStop(0, brick.brickColor);  // Color interior del ladrillo
            gradient.addColorStop(0.8, 'rgba(0, 0, 0, 0.3)');  // Color de sombreado
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');  // Transparente hacia el exterior

            // Borde con resplandor (efecto de neón)
            this.canvasContext.beginPath();
            this.canvasContext.lineWidth = 3; // Ancho del resplandor
            this.canvasContext.strokeStyle = brick.visible ? 'rgba(255, 255, 255, 0.8)' : 'transparent'; // Color del resplandor
            this.canvasContext.rect(
                brick.x - 2, // Ajuste para el resplandor
                brick.y - 2, // Ajuste para el resplandor
                brick.w + 3,   // Ajuste para el resplandor
                brick.h + 3    // Ajuste para el resplandor
            );
            this.canvasContext.stroke();
            this.canvasContext.closePath();

            // Mejora 1: Borde del ladrillo
            this.canvasContext.beginPath();
            this.canvasContext.rect(brick.x, brick.y, brick.w, brick.h);
            this.canvasContext.fillStyle = brick.visible ? gradient : 'transparent';
            this.canvasContext.strokeStyle = brick.visible ? '#000' : 'transparent'; // Color del borde
            this.canvasContext.lineWidth = 2; // Ancho del borde
            this.canvasContext.fill();
            this.canvasContext.stroke(); // Dibuja el borde
            this.canvasContext.closePath();

            // Mejora 2: Sombra del ladrillo
            this.canvasContext.beginPath();
            this.canvasContext.rect(brick.x, brick.y, brick.w, brick.h);
            this.canvasContext.fillStyle = brick.visible ? brick.brickColor : 'transparent';
            this.canvasContext.shadowColor = '#888'; // Color de la sombra
            this.canvasContext.shadowBlur = 5; // Intensidad de la sombra
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

        // Guardar el estado actual del contexto
        this.canvasContext.save();

        // Configurar las sombras para simular el efecto de burbuja
        this.canvasContext.shadowColor = 'rgba(0, 0, 0, 0.3)';
        this.canvasContext.shadowBlur = 15;
        this.canvasContext.shadowOffsetX = 8;
        this.canvasContext.shadowOffsetY = 8;

        // Dibujar burbuja alrededor de la imagen
        this.canvasContext.beginPath();
        this.canvasContext.arc(
            elementToFall.x + 35, // Centro x de la burbuja
            elementToFall.y + 35, // Centro y de la burbuja
            40, // Radio de la burbuja
            0,
            Math.PI * 2
        );

        // Aplicar estilos a la burbuja
        let bubbleGradient = this.canvasContext.createRadialGradient(elementToFall.x + 35, elementToFall.y + 35, 20, elementToFall.x + 35, elementToFall.y + 35, 40);
        bubbleGradient.addColorStop(0, elementToFall.brickColor);
        bubbleGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        this.canvasContext.fillStyle = bubbleGradient;
        this.canvasContext.fill();
        this.canvasContext.closePath();

        // Reducir el tamaño de la imagen
        let imageSize = 50; // Tamaño deseado de la imagen dentro de la burbuja

        // Dibujar la imagen en el centro de la burbuja
        this.canvasContext.drawImage(elementImage, elementToFall.x + 35 - imageSize / 2, elementToFall.y + 35 - imageSize / 2, imageSize, imageSize);

        // Restaurar el estado del contexto
        this.canvasContext.restore();
    });
    }

    // Draw particles effect
    drawBrokenBrickParticles() {
        this.particlesToDraw.forEach((particle) => {
            this.canvasContext.beginPath();
            const gradient = this.canvasContext.createRadialGradient(
                particle.x,
                particle.y,
                0,
                particle.x,
                particle.y,
                particle.timeToLive
            );

            gradient.addColorStop(0, `${particle.color}`);
            gradient.addColorStop(1, `${particle.color}`);

            this.canvasContext.fillStyle = gradient;
            this.canvasContext.arc(particle.x, particle.y, particle.timeToLive, 0, Math.PI * 2);
            this.canvasContext.fill();
            this.canvasContext.closePath();
        });
    }

    // DRAW CANVAS 
    draw () {
        this.clearCanvas()
        this.drawElementsToFall();
        this.drawBall();
        this.drawPaddle();
        this.drawBricks();
        this.drawBrokenBrickParticles()
    }

    // ADD BRICKS 10 seconds
    updateBricks(){
        let timePlayed = this.getTimePlayed() + 1

        if(timePlayed % 2 === 0){
            let newArray=[]
            newArray[0] = [];
            for (let j = 0; j < this.brickColumnCount; j++) {
                const x = j * (this.brickInfo.w + this.brickInfo.padding) + this.brickInfo.offsetX;
                const y = 0 * (this.brickInfo.h + this.brickInfo.padding) + this.brickInfo.offsetY;

                // % random
                let element = null;
                const randomElement = Math.random() * 100;
                if (randomElement < 33) element = this.gameConfig.tables[0];
                else if (randomElement < 66) element =  this.gameConfig.tables[1];
                else element = this.gameConfig.tables[2];
                newArray[0][j] = { x, y, element, ...this.brickInfo };
            }
            this.bricks.unshift(newArray)
            // console.log(this.bricks)
        }
    }

    // UPDATE PARTICLES EFFECTS
    updateBrokenBrickEffect(deltaTime) {
        this.particlesToDraw.forEach((particle, index) => {
            const range = 2; // Rango deseado
            const randomSignX = Math.random() < 0.5 ? 2.9 : -2.9;
            const randomSignY = Math.random() < 0.5 ? 1 : -1;
            const randomX = Math.random() * (2 * range) - range; 
            const randomY = Math.random() * (2 * range) - range;

            particle.x += particle.velocity.x * randomSignX * randomX;
            particle.y += particle.velocity.y * randomSignY * randomY;
            // particle.alpha -= 0.2; // Disminuir opacidad con el tiempo
            particle.timeToLive -= 0.009; // Decrementar el tiempo de vida

            // Eliminar partículas que hayan alcanzado el final de su vida
            if (particle.timeToLive <= 0) {
                this.particlesToDraw.splice(index, 1);
            }
        });
    }

    // UUPDATE FALLING ELEMENT
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
                  // Marca premio gran recomensa

                } else if (elementFalling.element.bonification === "mediadora") {
                    this.paddle.w = this.paddle.w + 0.25
                    this.showBonification("Agrandas paddle")
                } else if (elementFalling.element.bonification === "nula") {
                    // Falta resolver
                    
                }
                return false
            }
            if (elementFalling.y > this.canvas.height) {
                return false;
            }
            return true;
        })
    }

    // UPDATE PADDLE MOVEMENT
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

    // UPDATE BALL MOVEMENT
    moveBall() {
        this.ball.x += this.ball.dx;
        this.ball.y += this.ball.dy;
        
        this.checkBottomCollision()
        this.checkBorderCanvasCollision()
        this.checkPaddleCollision()
        this.checkBrickCollision()
    }

     updateStatus(scaleRatio, deltaTime) {
        this.gameConfig.width *= scaleRatio.xRatio;
        this.gameConfig.height *= scaleRatio.yRatio;
        this.movePaddle();  
        this.moveBall()
        this.fallingElement()
        this.updateBrokenBrickEffect(deltaTime)
    }

    // CHECK BRICK COLLISION
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
                            this.createElementToFall(brick.x, brick.y, brick.element, brick.w, brick.h, brick.brickColor)
                            brick.visible = false;
                        }
                        setTimeout(() => {
                            this.createParticlesBrokenEffect(brick, 100)
                        }, 50);
                        this.score = this.score + 1;
                        this.setScore(this.score)
                    }
                }
            });
        });
    }

    // CHECK PADDLE COLLISION
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

    // CHECK CANVAS BORDER COLLISION
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

    // CHECK BOTTOM COLLISION
    checkBottomCollision () {
        if (this.ball.y + this.ball.size > this.canvas.height) {
            if(this.lives > 0){
                this.lives = this.lives - 1
                this.setLives(this.lives)
                this.resetBallAndPaddle();
                this.showAllBricks();
            }else{
                this.setGameEndResult()
                this.gameOver();
            }
        }
    }

    // RESET GAME
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

    // GAME OVER
    gameOver () { 
        this.gameEndModal('FIN DEL JUEGO', `Obtuviste una puntuacion de ${this.score}`, () => this.saveGameResults())
    }
}

export default BricksClass;
