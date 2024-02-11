import basket from './assets/images/basket/basket.png';
import basketDamage from './assets/images/basket/basket-damage.png';
import basketGood from './assets/images/basket/basket-good.png';
import backgroundImage from './assets/images/word-catcher/background.png'


class WordCatcherClass {
    ctx;
    config;

    ///
    marginX = 5;

    //Mouse
    isLastClicked = false;

    mouse = {
        x: 0,
        y: 0,
        click: false,
        enter: false
    };
    positionBasket = {
        x: 500,
        y: 800,
        desplace: {
            x: 0,
            y: 0
        }
    }
    sizeBasket = {
        width: 150,
        height: 50
    }

    frameCount = 0;

    gameEnd = false;

    //Images
    imgBasket = null;
    imgBasketDamage = null;
    imgBasketGood = null;
    imageBackground = null;

    opacityBasketDamage = 0;
    opacityBasketGood = 0;
    basketImgCharge = false;

    gameEndFunction = null;
    huterWordFuction = null;

    elements = {
        damageElements: [],
        elementsToCatch: []
    }

    elementsToFalling = [];
    points = 0

    intervalGenerateElements;


    constructor(ctx, config = { width: 500, height: 500, size: 10 }, elements = { elementsToCatch: [], damageElements: [] }, gameEndFunction, huterWordFuction) {
        this.ctx = ctx;
        this.config = config;
        this.elements = elements;
        this.gameEndFunction = gameEndFunction;
        this.huterWordFuction = huterWordFuction;
        // Set image background
        this.imageBackground = new Image()
        this.imageBackground.src = backgroundImage
        this.imageBackground.onload = () => {

            this.imgBasket = new Image();
            this.imgBasket.src = basket;
            this.imgBasket.onload = () => {

                this.imgBasketDamage = new Image();
                this.imgBasketDamage.src = basketDamage;
                this.imgBasketDamage.onload = () => {

                    this.imgBasketGood = new Image();
                    this.imgBasketGood.src = basketGood;
                    this.imgBasketGood.onload = () => {
                        this.basketImgCharge = true;
                    }
                }
            }
        }

        this.huterWordFuction(this.points)
        this.intervalGenerateElements = setInterval(this.generateElements, 1000);
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
        this.ctx.fillStyle = '#000000'
        this.ctx.beginPath()
        this.ctx.fill()
    }

    updateStatus(mouse, scaleRatio) {
        if (this.gameEnd === true) return;

        this.config.width *= scaleRatio.xRatio;
        this.config.height *= scaleRatio.yRatio;

        this.mouse = mouse;

        this.mouse.x *= scaleRatio.xRatio;
        this.mouse.y *= scaleRatio.yRatio;

        //Save last Variables
        this.isLastClicked = this.mouse.click;

        if (this.opacityBasketGood > 0 || (this.opacityBasketGood - 0.09) > 0) {
            this.opacityBasketGood -= 0.09;
        } else {
            this.opacityBasketGood = 0;
        }

        if (this.opacityBasketDamage > 0 || (this.opacityBasketDamage - 0.09) > 0) {
            this.opacityBasketDamage -= 0.09;
            let desplace = 10;
            this.positionBasket.desplace = {
                x: Math.floor(Math.random() * (desplace - -desplace + 1) + -desplace),
                y: Math.floor(Math.random() * (desplace - -desplace + 1) + -desplace)
            }
        } else {
            this.opacityBasketDamage = 0;
            this.positionBasket.desplace = {
                x: 0,
                y: 0
            }
        }

        this.updatePositionBasket();
        this.moveElements()
    }

    updatePositionBasket() {
        this.positionBasket.x = this.mouse.x
    }

    generateElements = () => {
        if (this.gameEnd === true) return;
        let number = Math.floor(Math.random() * 150);
        if (number < 150) {
            let isGoodWord = Math.floor(Math.random() * 100);

            let name = "";
            let bonification = '';
            let image_src = ''

            if (isGoodWord < 40) {
                let wordAttempts = 0;
                do {
                    wordAttempts += 1;
                    let element = this.elements.elementsToCatch[Math.floor(Math.random() * this.elements.elementsToCatch.length)];
                    name = element.name;
                    bonification = element.bonification
                    image_src = element.src
                } while (name === "");
            } else {
                let element = this.elements.damageElements[Math.floor(Math.random() * this.elements.damageElements.length)];
                name = element.name;
                bonification = element.bonification
                image_src = element.src
            }

            let wordWidth = this.ctx.measureText(name).width;
            let velocity = Math.random() * (1.5) + 0.5;

            let position = {
                init: -1,
                center: -1,
                end: -1
            };
            let positionAttempts = 0;

            do {
                positionAttempts += 1;

                let positionInit = Math.floor(Math.random() * ((this.config.width - wordWidth) - (this.marginX * 2))) + this.marginX;
                position = {
                    init: positionInit,
                    center: positionInit + (wordWidth / 2),
                    end: positionInit + wordWidth
                }

                let positionsAlreadyTaken = this.elementsToFalling.filter(elementFalling => {

                    if (
                        (elementFalling.x.init <= position.init && elementFalling.x.end >= position.init) ||
                        (elementFalling.x.init <= position.end && elementFalling.x.end >= position.end) ||
                        (position.init <= elementFalling.x.init && position.end >= elementFalling.x.end) ||
                        (position.init >= elementFalling.x.init && position.end <= elementFalling.x.end)
                    ) {

                        let counter = 0;
                        while (true) {
                            if ((counter * velocity) < this.config.height && ((counter * elementFalling.speed) + elementFalling.y) < this.config.height) {
                                if ((counter * velocity) + 400 >= ((counter * elementFalling.speed) + elementFalling.y)) {
                                    return true;
                                }
                            } else {
                                return false;
                            }
                            counter++;
                        }
                    }

                    return false;
                });

                if (positionsAlreadyTaken.length > 0) {
                    position.init = -1;
                }

                if (positionAttempts > 200) return;
            } while (position.init === -1);


            this.elementsToFalling.push({
                name: name,
                bonification: bonification,
                src: image_src,
                speed: velocity,
                y: 0,
                x: position,
                color: 'red',
                width: wordWidth
            })
        }
    }

    moveElements() {
        for (let i = 0; i < this.elementsToFalling.length; i++) {
            this.elementsToFalling[i].y += this.elementsToFalling[i].speed;
            let elementFalling = this.elementsToFalling[i];

            if (elementFalling.y >= this.positionBasket.y && elementFalling.y <= this.positionBasket.y + this.sizeBasket.height) {
                let posBasket = {
                    init: this.positionBasket.x - (this.sizeBasket.width / 2),
                    end: this.positionBasket.x + (this.sizeBasket.width / 2)
                }

                if (
                    (elementFalling.x.init > posBasket.init && elementFalling.x.init < posBasket.end) ||
                    (elementFalling.x.center > posBasket.init && elementFalling.x.center < posBasket.end) ||
                    (elementFalling.x.end > posBasket.init && elementFalling.x.end < posBasket.end)
                ) {
                    let index = this.elements.damageElements.findIndex(element => element.name === elementFalling.name)
                    if (index !== -1) {
                        this.basketOnDamage()
                        if(this.points > 0) this.points = this.points - 1
                    } else {               
                        if(elementFalling.bonification === '+1') this.points = this.points + 1 
                        if(elementFalling.bonification === 'x1') this.points = this.points 
                        if(elementFalling.bonification === 'x2') this.points = this.points * 2 
                        this.opacityBasketGood = 0.8;
                    }
                    this.huterWordFuction(this.points)
                    this.elementsToFalling.splice(i, 1);
                }
            }

            if (elementFalling.y > (this.config.height + 40)) {
                this.elementsToFalling.splice(i, 1);
            }
        }
    }

    draw() {
        this.clearCanvas();

        this.ctx.globalAlpha = 0.5;
        this.ctx.drawImage(this.imageBackground, 0, 0, this.config.width, this.config.height)
        this.ctx.globalAlpha = 1;

        if (!this.basketImgCharge) return;
        this.drawelEmentsToFalling()
        let distanceCenter = this.sizeBasket.width / 2;
        this.ctx.strokeStyle = "#ff0000";

        this.ctx.drawImage(this.imgBasket, this.positionBasket.x - distanceCenter, this.positionBasket.y, this.sizeBasket.width, 50);

        //Bascket Damage Draw
        this.ctx.globalAlpha = this.opacityBasketDamage;
        this.ctx.drawImage(
            this.imgBasketDamage,
            (this.positionBasket.x - distanceCenter) - this.positionBasket.desplace.x,
            this.positionBasket.y - this.positionBasket.desplace.y,
            this.sizeBasket.width, 50
        );

        //Bascket Good Draw
        this.ctx.globalAlpha = this.opacityBasketGood;
        this.ctx.drawImage(
            this.imgBasketGood,
            this.positionBasket.x - distanceCenter,
            this.positionBasket.y,
            this.sizeBasket.width, 50
        );

        this.ctx.globalAlpha = 1;
    }

    async drawelEmentsToFalling() {
        this.ctx.font = "bold 50px Comic-Sans";
        this.ctx.textBaseline = 'middle';
      
        for (let i = 0; i < this.elementsToFalling.length; i++) {
          let elementFalling = this.elementsToFalling[i];
          if (elementFalling.src) {
            // Si hay una propiedad src, dibujar la imagen
            const img = new Image();
            img.src = elementFalling.src;
            this.ctx.drawImage(img, elementFalling.x.init, elementFalling.y, 100, 100);
        } else {
            // Si no hay src, dibujar el texto
            this.ctx.fillStyle = elementFalling.color;
            this.ctx.fillText(elementFalling.name, elementFalling.x.init, elementFalling.y);
          }
        }
      }

    basketOnDamage() {
        this.opacityBasketDamage = 0.8;
        this.userErrors++;
    }

    onEndGame() {
        this.gameEnd = true;
        this.gameEndFunction(this.points);
    }
}

export default WordCatcherClass;
