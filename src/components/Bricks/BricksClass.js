import appleSVG from '../../assets/apple-logo.svg'
import samsungSVG from '../../assets/samsung-logo.svg'
import xiaomiSVG from '../../assets/xiaomi-logo.svg'

class BricksClass {
    canvas;
    canvasContext;

    //Game configuration variables 
    gameConfig;
    ball;
    brickInfo = {};
    bricks = [];
    brickRowCount = 6;
    brickColumnCount = 8;
    lives = 3
    score = 0
    elementsToFall = []
    interactions = {}
    particleInfo = {}
    particlesToDraw = []
    bonificationPointInfo = {}
    bonificationsPointsToDraw = []
    levels = 3
    actualLevel = 0

    // Bonifications colors bricks
    standardColor = '#CCCCCC';  // Color estándar para bloques
    bonusColor = '#FFA500';  // Color para bonificación nula
    paddleColor = '#0011F30'
    
    // Functions 
    setGameOver = null
    setLives = null
    setScore = null
    showBonification = null
    gameEndModal = null
    saveGameResults = null
    getTimePlayed = null

    elementsImages = {}

    constructor(canvas, canvasContext, gameConfig, setLives, setScore, setGameOver, showBonification, gameEndModal, saveGameResults, getTimePlayed) {
        this.canvas = canvas;
        this.canvasContext = canvasContext;
        this.gameConfig = gameConfig;
        this.setGameOver = setGameOver;
        this.setLives = setLives;
        this.setScore = setScore;
        this.interactions = {
            [gameConfig.elementsNames[0]+"InPaddle"]: 0,
            [gameConfig.elementsNames[1]+"InPaddle"]: 0,
            [gameConfig.elementsNames[2]+"InPaddle"]: 0,
            [gameConfig.elementsNames[0]+"InBrick"]: 0,
            [gameConfig.elementsNames[1]+"InBrick"]: 0,
            [gameConfig.elementsNames[2]+"InBrick"]: 0,
        }
        this.showBonification = showBonification
        this.gameEndModal = gameEndModal
        this.saveGameResults = saveGameResults
        this.getTimePlayed = getTimePlayed
        this.lives = gameConfig.lives
        this.standardColor = gameConfig.brickStandardColor;  // Color estándar para bloques
        this.bonusColor = gameConfig.brickBonusColor;  // Color para bonificación nula

        // PADDLE
        this.paddle = {
            x: this.canvas.width / 2 - 65,
            y: this.canvas.height - 20,
            w: gameConfig.paddleInformation.width,
            h: gameConfig.paddleInformation.height,
            borderRadius: gameConfig.paddleInformation.borderRadius, // Radio de las esquinas para hacerlo redondeado
            speed: gameConfig.paddleInformation.speed,
            color: gameConfig.paddleInformation.color,
            bonificationDuration: gameConfig.paddleInformation.bonificationDuration,
            dx: 0,
            visible: true  
        }

        // BALL
        this.ball = {
            x: this.canvas.width / 2,
            y: this.paddle.y - 10, // Coloca la pelota justo encima del paddle
            size: gameConfig.ballInformation.size, // Tamano
            speed: gameConfig.ballInformation.speed, // velocidad
            dx: 0, // Inicialmente no hay movimiento en x
            dy: 0, // Inicialmente no hay movimiento en y
            visible: true, // Indica si la pelota está lista visible o no
            readyToLunch: true // Indica si la pelota está lista para ser lanzada
        };
        
        // BRICK INFO
        this.brickInfo = {
            w: 100,
            h: 20,
            padding: 6,
            offsetX: 35,
            offsetY: 80,
            visible: true,
            src: gameConfig.brickTexture
        }

        // PARTICLE INFO
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

        // BONIFICATION POINT
        this.bonificationPointInfo = {
            vy: gameConfig.bonificationPointInfo.vy,
            timeToLive: gameConfig.bonificationPointInfo.timeToLive,
            color: gameConfig.bonificationPointInfo.color,
            bonificationValue: gameConfig.bonificationPointInfo.bonificationValue,
            fontSize: gameConfig.bonificationPointInfo.fontSize,
        }


        this.elementsImages = {
            [gameConfig.elementsNames[0]]:new Image(),
            [gameConfig.elementsNames[1]]:new Image(),
            [gameConfig.elementsNames[2]]:new Image()
        }
        
        this.elementsImages[gameConfig.elementsNames[0]].src = samsungSVG
        this.elementsImages[gameConfig.elementsNames[1]].src = appleSVG
        this.elementsImages[gameConfig.elementsNames[2]].src = xiaomiSVG

        this.inGame = false
        this.arrowAngle = Math.PI / 4; // Angulo inicial de la flecha (45 grados)
        
        this.createBricks()
        // Keyboard event handlers
        this.keyDown = this.keyDown.bind(this);
        this.keyUp = this.keyUp.bind(this); 
        document.addEventListener('keydown', this.keyDown);
        document.addEventListener('keyup', this.keyUp);
        
        setInterval(() => {
            if(this.inGame){
                if(this.actualLevel < 3) 
                    this.addNewBrickLine();
                else{
                    this.addNewBrickLine();
                    this.addNewBrickLine();
                }
            }
        }, this.actualLevel === 0 ? gameConfig.addLinesBlockTimer : gameConfig.addLinesBlockTimer - 2000); 
    }


    // Create bricks
    createBricks() {
        if (this.brickInfo.visible !== undefined) {
            let newArray = [];

            for (let i = 0; i < this.brickRowCount; i++) {
                newArray[i] = [];
                for (let j = 0; j < this.brickColumnCount; j++) {
                    const x = j * (this.brickInfo.w + this.brickInfo.padding) + this.brickInfo.offsetX;
                    const y = i * (this.brickInfo.h + this.brickInfo.padding) + this.brickInfo.offsetY;
    
                    // % random
                    let element = null;
                    const randomElement = Math.random() * 100;
                    if (randomElement < this.gameConfig.randomBricks.standardBrick) element = { visible: true }
                    else if (randomElement < this.gameConfig.randomBricks.brand1) element = this.gameConfig.tables[0];
                    else if (randomElement < this.gameConfig.randomBricks.brand2) element = this.gameConfig.tables[1];
                    else element = this.gameConfig.tables[2];
    
                    // Selección del color según la bonificación del ladrillo
                    let brickColor;
                    if(element.bonification) brickColor = this.bonusColor
                    else brickColor = this.standardColor

                    newArray[i][j] = { x, y, element, brickColor, ...this.brickInfo };
                }
            }
            this.bricks = newArray;
        }
    }
    

    addNewBrickLine() {
        // Crear una nueva fila de ladrillos
        let newRow = [];

        for (let j = 0; j < this.brickColumnCount; j++) {
            const x = j * (this.brickInfo.w + this.brickInfo.padding) + this.brickInfo.offsetX;
            const y = this.brickInfo.offsetY; // La nueva fila siempre comienza en la misma posición 'y' inicial

            // Generar elemento de ladrillo aleatorio
            let element = null;
            const randomElement = Math.random() * 100;
            if (randomElement < this.gameConfig.randomBricks.standardBrick) element = { visible: true }
            else if (randomElement < this.gameConfig.randomBricks.brand1) element = this.gameConfig.tables[0];
            else if (randomElement < this.gameConfig.randomBricks.brand2) element = this.gameConfig.tables[1];
            else element = this.gameConfig.tables[2];


           // Selección del color según la bonificación del ladrillo
            let brickColor;
            if(element.bonification) brickColor = this.bonusColor
            else brickColor = this.standardColor

            newRow.push({ x, y, element, brickColor, ...this.brickInfo, visible: true });
        }

        this.bricks.forEach(row => {
            row.forEach(brick => {
                brick.y += this.brickInfo.h + this.brickInfo.padding;
            });
        });

        if(this.bricks.length < 16){
            this.bricks.unshift(newRow);
        }else{
            this.loseLife()
            this.bricks = []
            this.createBricks()
        }
    }
    

    createParticlesBrokenEffect(brick, count, isElementFall) {
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
            vy: this.gameConfig.fallingElementVelocity,
            element: brickElement,
            w: brickWidth, 
            h: brickHeight,
            brickColor,
            startTime: Date.now()  // Agregar tiempo de inicio
        })
    }

    // CREATE point bonification
    createBonificationPoints(positionX, positionY) {
        this.bonificationsPointsToDraw.push({
            ...this.bonificationPointInfo,
            x: positionX,
            y: positionY + 2,
        })
    }

    // Keydown event
    keyDown(e) {
        // Check if is in game 
        setInterval(() => {
            if(!this.inGame){
                this.paddle.x = this.canvas.width / 2 - 65
                this.paddle.y = this.canvas.height - 20
                this.paddle.dx = 0;
            }
        }, 100);

        if (e.key === 'Right' || e.key === 'ArrowRight') {
            if (this.ball.readyToLunch) {
                if(parseFloat(this.arrowAngle) >= 0.6) this.arrowAngle -= 0.1; // Ajusta el ángulo de la flecha
            } else {
                this.paddle.dx = this.paddle.speed;
            }
        }
        if (e.key === 'Left' || e.key === 'ArrowLeft') {
            if (this.ball.readyToLunch) {
                if(parseFloat(this.arrowAngle) <= 2.6) this.arrowAngle += 0.1; // Ajusta el ángulo de la flecha
            } else {
                this.paddle.dx = -this.paddle.speed;
            }
        }
        if (e.key === 'Space' || e.key === ' ') {
            // Lógica para disparar la pelota
            if (this.ball.readyToLunch) {
                this.ball.dx = 2 * Math.cos(this.arrowAngle); // Velocidad en x basada en el ángulo
                this.ball.dy = -2 * Math.sin(this.arrowAngle); // Velocidad en y basada en el ángulo
                this.ball.readyToLunch = false;
                this.inGame = true
            }
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
        const gradient = this.canvasContext.createRadialGradient(this.ball.x, this.ball.y, 0, this.ball.x, this.ball.y, this.ball.size);
        gradient.addColorStop(0, this.gameConfig.ballInformation.color); // Color principal
        gradient.addColorStop(1, '#2980b9'); // Color para sombra

        // Dibujar bola con gradiente
        this.canvasContext.beginPath();
        this.canvasContext.arc(this.ball.x, this.ball.y, this.ball.size, 0, Math.PI * 2);
        this.canvasContext.fillStyle = gradient;

        // Aplicar sombra y brillo
        this.canvasContext.shadowColor = 'rgba(52, 152, 219, 0.7)';
        this.canvasContext.shadowBlur = 10;
        this.canvasContext.shadowOffsetX = 2;
        this.canvasContext.shadowOffsetY = 2;

        // Agregar borde negro
        this.canvasContext.strokeStyle = '#000';
        this.canvasContext.lineWidth = 2;
        this.canvasContext.stroke();

        this.canvasContext.fill();
        this.canvasContext.closePath();

        // Restaurar valores de sombra y borde
        this.canvasContext.shadowBlur = 0;
        this.canvasContext.shadowOffsetX = 0;
        this.canvasContext.shadowOffsetY = 0;
        this.canvasContext.lineWidth = 0; // Restaurar el ancho de línea después de dibujar el borde
    }

    // DRAW PADDLE
    drawPaddle() {
        // Establecer colores del gradiente
        const gradient = this.canvasContext.createLinearGradient(this.paddle.x, this.paddle.y, this.paddle.x, this.paddle.y + this.paddle.h);
        gradient.addColorStop(0, this.paddle.color); // Color principal
        gradient.addColorStop(1, '#2980b9'); // Color para resaltar o dar brillo

        // Dibujar paddle con bordes redondeados y borde negro
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

        // Aplicar gradiente al paddle
        this.canvasContext.fillStyle = gradient;

        // Agregar sombras
        this.canvasContext.shadowColor = 'rgba(52, 152, 219, 0.7)';
        this.canvasContext.shadowBlur = 10;
        this.canvasContext.shadowOffsetX = 2;
        this.canvasContext.shadowOffsetY = 2;

        // Agregar borde negro
        this.canvasContext.strokeStyle = '#000';
        this.canvasContext.lineWidth = 2;
        this.canvasContext.stroke();

        this.canvasContext.fill();
        this.canvasContext.closePath();

        // Restaurar valores de sombra y borde
        this.canvasContext.shadowBlur = 0;
        this.canvasContext.shadowOffsetX = 0;
        this.canvasContext.shadowOffsetY = 0;
        this.canvasContext.lineWidth = 0; // Restaurar el ancho de línea después de dibujar el borde
    }

    // DRAW ARROW
    drawArrow() {
        if (!this.ball.readyToLunch) return;
    
        const arrowLength = 50; // Longitud de la flecha
        const endX = this.ball.x + arrowLength * Math.cos(this.arrowAngle);
        const endY = this.ball.y - arrowLength * Math.sin(this.arrowAngle);
    
        const arrowHeadLength = 20; // Longitud de los lados de la punta de la flecha
        const arrowHeadAngle = Math.PI / 8; // Ángulo en radianes para los lados de la punta
        
        // Calcular los puntos de la punta de la flecha
        const leftX = endX - arrowHeadLength * Math.cos(this.arrowAngle - arrowHeadAngle);
        const leftY = endY + arrowHeadLength * Math.sin(this.arrowAngle - arrowHeadAngle);
        const rightX = endX - arrowHeadLength * Math.cos(this.arrowAngle + arrowHeadAngle);
        const rightY = endY + arrowHeadLength * Math.sin(this.arrowAngle + arrowHeadAngle);
        
        // Dibujar la punta de la flecha
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(endX, endY);
        this.canvasContext.lineTo(leftX, leftY);
        this.canvasContext.lineTo(rightX, rightY);
        this.canvasContext.closePath();
        this.canvasContext.fillStyle = this.gameConfig.arrowColor;
        this.canvasContext.fill();
        

        this.canvasContext.beginPath();
        this.canvasContext.moveTo(this.ball.x, this.ball.y);
        this.canvasContext.lineTo(endX, endY);
        this.canvasContext.strokeStyle = this.gameConfig.arrowColor;
        this.canvasContext.lineWidth = 2;
        this.canvasContext.stroke();
    
    
        this.canvasContext.strokeStyle = this.gameConfig.arrowColor;
        this.canvasContext.lineWidth = 1;
    }

    // DRAW BRICKS 
    drawBricks() {
        this.canvasContext.beginPath();
        this.bricks?.forEach(column => {
            column.forEach(brick => {
                if (!brick.visible) {
                    return; // Si el ladrillo no es visible, no hacemos nada
                }

                const x = brick.x;
                const y = brick.y;
                const w = brick.w;
                const h = brick.h;

                // Gradiente radial para simular sombreado
                const gradient = this.canvasContext.createRadialGradient(
                    x + w / 2, y + h / 2, 1,
                    x + w / 2, y + h / 2, w / 2
                );

                gradient.addColorStop(0, brick.brickColor); // Color interior del ladrillo
                gradient.addColorStop(0.8, 'rgba(0, 0, 0, 0.3)'); // Color de sombreado
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)'); // Transparente hacia el exterior

                // Borde con resplandor (efecto de neón)
                this.drawStrokeWithGlow(x - 1, y - 1, w + 2, h + 2, 2.5, brick.visible ? 'black' : 'transparent');

                // Borde del ladrillo
                this.canvasContext.rect(x, y, w, h);
                this.canvasContext.fillStyle = gradient;

                // Agregar borde negro
                this.canvasContext.strokeStyle = brick.visible ? '#000' : 'transparent';
                this.canvasContext.lineWidth = 1;
                this.canvasContext.fill();
                this.canvasContext.stroke();

                // Sombra del ladrillo
                this.drawShadowedRect(x, y, w, h, brick.brickColor, 8); // Aumentar la intensidad de la sombra
            });
        });
        this.canvasContext.closePath();

    }

    // DRAW BRICK NEON BORDER
    drawStrokeWithGlow(x, y, w, h, lineWidth, strokeStyle) {
        this.canvasContext.save();
        this.canvasContext.beginPath();
        this.canvasContext.lineWidth = lineWidth;
        this.canvasContext.strokeStyle = strokeStyle;
        this.canvasContext.rect(x, y, w, h);
        this.canvasContext.stroke();
        this.canvasContext.restore();
    }

    // DRAW BRICK SHADOW
    drawShadowedRect(x, y, w, h, fillStyle, shadowBlur) {
        this.canvasContext.save();
        this.canvasContext.beginPath();
        this.canvasContext.rect(x, y, w, h);
        this.canvasContext.fillStyle = fillStyle;
        this.canvasContext.shadowColor = '#888';
        this.canvasContext.shadowBlur = shadowBlur;
        this.canvasContext.fill();
        this.canvasContext.restore();
    }

    // DRAW FALLING ELEMENTS
    drawElementsToFall () {
        this.canvasContext.beginPath();
        this.elementsToFall.forEach((elementToFall) => {

        // let elementImage = new Image();

        // elementImage.src = elementToFall.element.src;
        
            // Guardar el estado actual del contexto
            this.canvasContext.save();

            // Configurar las sombras para simular el efecto de burbuja
            this.canvasContext.shadowColor = 'rgba(0, 0, 0, 0.3)';
            this.canvasContext.shadowBlur = 15;
            this.canvasContext.shadowOffsetX = 8;
            this.canvasContext.shadowOffsetY = 8;

            // Dibujar burbuja alrededor de la imagen
            this.canvasContext.arc(
                elementToFall.x + 35, // Centro x de la burbuja
                elementToFall.y + 35, // Centro y de la burbuja
                30, // Radio de la burbuja
                0,
                Math.PI * 2
            );

            // Aplicar estilos a la burbuja
            let bubbleGradient = this.canvasContext.createRadialGradient(elementToFall.x + 35, elementToFall.y + 35, 20, elementToFall.x + 35, elementToFall.y + 35, 40);
            bubbleGradient.addColorStop(0, 'white');
            bubbleGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            this.canvasContext.fillStyle = bubbleGradient;
            this.canvasContext.fill();

            // Aplicar estilos al círculo
            this.canvasContext.strokeStyle = this.bonusColor; // Color del borde del círculo
            this.canvasContext.lineWidth = 2; // Grosor del borde del círculo

            this.canvasContext.stroke();

            // Reducir el tamaño de la imagen
            let imageSize = 50; // Tamaño deseado de la imagen dentro de la burbuja
            // Dibujar la imagen en el centro de la burbuja
            this.canvasContext.drawImage(this.elementsImages[elementToFall.element.name], elementToFall.x + 35 - imageSize / 2, elementToFall.y + 35 - imageSize / 2, imageSize, imageSize);
            // Restaurar el estado del contexto
            this.canvasContext.restore();
        
    });
    this.canvasContext.closePath();


    }

    // DRAW PARTICLES EFFECTS
    drawBrokenBrickParticles() {
        this.canvasContext.beginPath();
        this.particlesToDraw.forEach((particle) => {
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
        });
        this.canvasContext.closePath();
    }

    // DRAW BONIFICATION POINTS
    drawBonificationPoints(fontSize = this.bonificationPointInfo.fontSize, fontColor = this.bonificationPointInfo.color, fontFamily = 'Arial') {
        this.bonificationsPointsToDraw.forEach((bonification) => {
            // Dibujar el texto con sombra y brillo
            this.canvasContext.font = `${fontSize}px ${fontFamily}`;
            this.canvasContext.fillStyle = fontColor;
            this.canvasContext.textAlign = 'center';
            this.canvasContext.textBaseline = 'middle';

            // Dibujar sombra
            this.canvasContext.shadowColor = 'rgba(0, 0, 0, 0.5)';
            this.canvasContext.shadowBlur = 5;
            this.canvasContext.shadowOffsetX = 2;
            this.canvasContext.shadowOffsetY = 2;

            // Dibujar el texto principal
            this.canvasContext.fillText('+100', bonification.x, bonification.y);

            // Restablecer la sombra
            this.canvasContext.shadowColor = 'transparent';
            this.canvasContext.shadowBlur = 0;
            this.canvasContext.shadowOffsetX = 0;
            this.canvasContext.shadowOffsetY = 0;

            // Dibujar el texto con brillo
            this.canvasContext.fillStyle = fontColor;
            this.canvasContext.fillText('+100', bonification.x + 1, bonification.y - 1);

        });
    }

    // drawBackground(){
    //     this.canvasContext.globalAlpha = 0.7;
    //     this.canvasContext.drawImage(this.imageBackground, 0, 0, 900, 560)
    //     this.canvasContext.globalAlpha = 1;
    // }

    // DRAW CANVAS 
    draw() {
        this.clearCanvas();
        this.drawElementsToFall();
        this.drawBall();
        this.drawPaddle();
        this.drawBricks();
        this.drawBrokenBrickParticles();
        this.drawArrow(); // Dibujar la flecha
        this.drawBonificationPoints();
    }

    // UPdate bonification
    updateShowPointsNotification(){
        this.bonificationsPointsToDraw.forEach((pointUpwards, index) => {
            pointUpwards.y -= pointUpwards.vy;
            pointUpwards.timeToLive -= 0.009; // Decrementar el tiempo de vida

            // Eliminar partículas que hayan alcanzado el final de su vida
            if (pointUpwards.timeToLive <= 0) {
                this.bonificationsPointsToDraw.splice(index, 1);
            }
        })
    }

    // UPDATE PARTICLES EFFECTS
    updateBrokenBrickEffect() {
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

    // UPDATE FALLING ELEMENT FUNCION 
    updateElementToFall() {
        const currentTime = Date.now();
        this.elementsToFall = this.elementsToFall.filter(elementFalling => {

            if (elementFalling.element.bonification === "nula") {
                if (!elementFalling.startTime) {
                    elementFalling.startTime = currentTime;
                } else if (currentTime - elementFalling.startTime > 3000) {
                    return false;
                }
            } else {
                elementFalling.y += elementFalling.vy;
            }

            if (
                elementFalling.x < this.paddle.x + this.paddle.w &&
                elementFalling.x + elementFalling.w > this.paddle.x &&
                elementFalling.y < this.paddle.y + this.paddle.h + 50 &&
                elementFalling.y + elementFalling.h + 50 > this.paddle.y
            ) {
                // Verificar si la bonificación ya se aplicó
                if (!elementFalling.appliedBonification) {

                    // save interaction with element
                    this.interactions[elementFalling.element.name+"InPaddle"] = this.interactions[elementFalling.element.name+"InPaddle"] + 1

                    if (elementFalling.element.bonification === "premio") {
                        this.score += this.bonificationPointInfo.bonificationValue
                        this.createBonificationPoints(this.paddle.x, this.paddle.y)
                        this.setScore(this.score)
                        // Marca la bonificación como aplicada
                    } else if (elementFalling.element.bonification === "mediadora") {
                        const originalWidth = this.paddle.w;
                        const targetWidth = this.paddle.w + 50 > 180 ? this.paddle.w : this.paddle.w + 50;
                        const animationDuration = 400;
                        const startTime = performance.now();

                        const animatePaddle = (currentTime) => {
                            const elapsedTime = currentTime - startTime;
                            const progress = Math.min(elapsedTime / animationDuration, 1);
                            this.paddle.w = originalWidth + progress * (targetWidth - originalWidth);
                            if (progress < 1) {
                                requestAnimationFrame(animatePaddle);
                            } else {
                                // La animación ha terminado, puedes realizar acciones adicionales aquí
                                this.showBonification('AGRANDAS PADDLE !', this.paddle.bonificationDuration)
                                setTimeout(() => {
                                    // Inicia la animación para achicar la barra después de un tiempo de espera
                                    if(!this.ball.readyToLunch) this.shrinkPaddle();
                                }, this.paddle.bonificationDuration); // Espera x segundo antes de achicar la barra
                            }
                        };

                        animatePaddle(startTime);
                        // Marca la bonificación como aplicada
                    } 
                    elementFalling.appliedBonification = true;
                    setTimeout(() => {
                        this.createParticlesBrokenEffect({
                            ...elementFalling,
                             brickColor: this.bonusColor,
                            y: elementFalling.y + 40
                            }, 100)
                    }, 50);
                }
                return false;
            }

            if (elementFalling.y > this.canvas.height) {
                return false;
            }

            return true;
        });
    }

    // SHRINK PADDLE
    shrinkPaddle() {
        const originalWidth = this.paddle.w;
        const targetWidth = 130;
        const animationDuration = 400; // Puedes ajustar la duración según sea necesario
        const startTime = performance.now();

        const animatePaddleShrink = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / animationDuration, 1);
            this.paddle.w = originalWidth + progress * (targetWidth - originalWidth);
            
            if (progress < 1) {
                requestAnimationFrame(animatePaddleShrink);
            }
        };

        animatePaddleShrink(startTime);
    }

     updateStatus(scaleRatio, deltaTime) {
        this.gameConfig.width *= scaleRatio.xRatio;
        this.gameConfig.height *= scaleRatio.yRatio;
        this.movePaddle();  
        this.moveBall()
        this.updateElementToFall()
        this.updateBrokenBrickEffect()
        this.updateShowPointsNotification()
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

    // CHECK BRICK COLLISION
    checkBrickCollision () {
        const allBroken = this.bricks.every(column => column.every(brick => !brick.visible));

        if(allBroken) {
            this.showBonification('Avanzas de nivel', 2000, 'top')
            this.resetBallAndPaddle()
            this.bricks = []
            this.createBricks()
            this.inGame = false
            this.actualLevel += 1
        }
        // Brick collision
        this.bricks?.forEach((column, columnIndex) => {
            column.forEach((brick, brickIndex) => {
                if (brick.visible) {
                    if (
                        this.ball.x - this.ball.size < brick.x + brick.w - 5 &&
                        this.ball.x + this.ball.size > brick.x &&
                        this.ball.y - this.ball.size < brick.y + brick.h - 1 &&
                        this.ball.y + this.ball.size > brick.y  
                    ) {
                        this.ball.dy *= -1;
                        if (brick.element && brick.visible) {
                            if(brick.element.bonification) {
                                this.createElementToFall(brick.x, brick.y, brick.element, brick.w, brick.h, brick.brickColor)
                                this.interactions[brick.element.name+"InBrick"] = this.interactions[brick.element.name+"InBrick"] + 1
                            }else{
                                this.score = this.score + this.gameConfig.brickBonification;
                                this.setScore(this.score)
                            }
                            brick.visible = false;
                        }
                        this.ball.speed += 0.005;
                        setTimeout(() => {
                            this.createParticlesBrokenEffect(brick, 100)
                        }, 50);
                    }
                }
            });
        });
    }

    // CHECK PADDLE COLLISION
    checkPaddleCollision() {
        // Verificar colisión con el paddle
        if (
            this.ball.x + this.ball.size > this.paddle.x &&
            this.ball.x - this.ball.size < this.paddle.x + this.paddle.w &&
            this.ball.y + this.ball.size > this.paddle.y
        ) {
            // Cambiar la dirección en Y para simular un rebote
            this.ball.dy = -this.ball.speed / 1.8;
    
            // Calcular el punto medio del paddle
            const paddleMidPoint = this.paddle.x + this.paddle.w / 2;
    
            // Determinar el punto de impacto
            const impactPoint = this.ball.x - paddleMidPoint;
    
            // Calcular el cambio de ángulo en base al punto de impacto
            // Este valor puede ajustarse para cambiar la "sensibilidad" del efecto
            const angleChange = impactPoint / (this.paddle.w - 4 / 2); // Normalizado entre -1 y 1
    
            // Ajustar la dirección en X de la pelota
            // Aquí ajustamos dx basándonos en el punto de impacto y algún factor de influencia
            this.ball.dx = this.ball.speed * angleChange;
            this.ball.speed = this.ball.speed
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
           this.loseLife()
        }
    }


    loseLife(){
        if(this.lives > 0){
            this.lives = this.lives - 1
            this.inGame = false
            this.setLives(this.lives)
            this.resetBallAndPaddle();
            this.paddle.w = 130,
            this.showBonification(' -1 vida ', 2000, 'top')
            this.elementsToFall = []
            // this.showAllBricks();

            if(this.lives === 0){
                this.inGame = false
                this.setGameOver()
                this.gameOver()
            }
        }
    }

    // RESET GAME
    resetBallAndPaddle () {
        // Restablece la posición del paddle y la pelota al centro o a una posición inicial
        this.paddle.x = this.canvas.width / 2 - this.paddle.w / 2; 
        this.paddle.y = this.canvas.height - 20; 
        this.ball.x = this.canvas.width / 2;
        this.ball.y = this.paddle.y - 10
        this.ball.dx = 0; 
        this.ball.dy = 0;
        this.ball.readyToLunch = true;
        this.ball.speed = this.gameConfig.ballInformation.speed
    }

    // GAME OVER
    gameOver() {
        // Initialize objects for storing segregated interactions
        let interactionsInPaddle = {};
        let interactionsInBrick = {};
    
        // Iterate over the interactions and segregate them
        for (let key in this.interactions) {
            if (key.endsWith("InPaddle")) {
                interactionsInPaddle[key] = this.interactions[key];
            } else if (key.endsWith("InBrick")) {
                interactionsInBrick[key] = this.interactions[key];
            }
        }
    
        // Call the game end modal and save game results with segregated interactions
        this.gameEndModal('FIN DEL JUEGO', `Obtuviste una puntuacion de ${this.score}`, () => this.saveGameResults({
            score: this.score,
            timePlayed: this.getTimePlayed(),
            interactionsInPaddle: interactionsInPaddle, // Add segregated interactions for paddle
            interactionsInBrick: interactionsInBrick,   // Add segregated interactions for brick
            date: new Date().toLocaleString()
        }));
    }
}

export default BricksClass;