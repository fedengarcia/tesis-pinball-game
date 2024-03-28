const BROWSERS = {
    CHROME: "Chrome",
    FIREFOX: "Firefox",
    SAFARI: "Safari",
    EDGE: "Edge",
}

const detectBrowser = () => {
    var userAgent = navigator.userAgent;

    if (userAgent.indexOf(BROWSERS.CHROME) !== -1) { //FUNCIONA PERFECTO !!
        return {
            addBlocksLineTime: 10000,
            ballVelocity: 4,
            ballColisionVelocitiy: 0.02,
            paddleVelocity: 6,
            paddleBofinificationDuration: 12000,
            fallingElementVelocity: 2,
            bonificationShowTimer: 2,
            bonificationVyVelocitiy: 0.5,
        };
    } else if (userAgent.indexOf(BROWSERS.FIREFOX) !== -1) {
        return {
            addBlocksLineTime: 10000,
            ballVelocity: 10,
            ballColisionVelocitiy: 0.5,
            paddleVelocity: 10,
            paddleBofinificationDuration: 12000,
            fallingElementVelocity: 2,
            bonificationShowTimer: 2,
            bonificationVyVelocitiy: 0.5,
        };
    } else if (userAgent.indexOf(BROWSERS.SAFARI) !== -1) {
        return {
            addBlocksLineTime: 10000,
            ballVelocity: 8,
            ballColisionVelocitiy: 0.02,
            paddleVelocity: 6,
            paddleBofinificationDuration: 12000,
            fallingElementVelocity: 2,
            bonificationShowTimer: 2,
            bonificationVyVelocitiy: 0.5,
        };
    } else if (userAgent.indexOf(BROWSERS.EDGE) !== -1) { //FUNCIONA PERFECTO !!
        return {
            addBlocksLineTime: 10000,
            ballVelocity: 8,
            ballColisionVelocitiy: 0.02,
            paddleVelocity: 8,
            paddleBofinificationDuration: 12000,
            fallingElementVelocity: 2,
            bonificationShowTimer: 2,
            bonificationVyVelocitiy: 0.5,
        };
    } else {
        return {
            addBlocksLineTime: 10000,
            ballVelocity: 8,
            ballColisionVelocitiy: 0.02,
            paddleVelocity: 8,
            paddleBofinificationDuration: 12000,
            fallingElementVelocity: 2,
            bonificationShowTimer: 2,
            bonificationVyVelocitiy: 0.5,
        };
    }
}

const { 
    addBlocksLineTime,
    ballVelocity,
    ballColisionVelocitiy,
    paddleVelocity,
    paddleBofinificationDuration,
    fallingElementVelocity,
    bonificationShowTimer,
    bonificationVyVelocitiy,
} = detectBrowser()


// CHANGE HERE THE INFORMATION OF THE BRANDS 
// MAKE SHURE THAT THE NAME MATCH WITH THE SRC IMAGE
const BRANDS_INFO = {
    BRAND_1: {
        name: "Samsung",
    },
    BRAND_2: {
        name: "Apple",
    },
    BRAND_3: {
        name: "Xiaomi",
    }
}

const BRANDS = [
    BRANDS_INFO.BRAND_1.name,
    BRANDS_INFO.BRAND_2.name,
    BRANDS_INFO.BRAND_3.name,
]

export const APP_DATA = {
    APP_TITLE: "¡Bienvenido/a al Brick Breaker!",
    APP_LOGIN_SUBTITLE: "Es importante que dejes tu correo para que podamos contactarte si eres el ganador o ganadora.",
    APP_EMAIL_LABEL: "Email",
    APP_BUTTON_PLAY: 'Responder y a jugar !',
    APP_BUTTON_END: 'Responder y ver resultados',
    APP_FIRST_FORM: {
        TITLE: 'Titulo del primer formulario',
        SUBTITLE: 'Subtitlo de primer formulario',
        QUESTIONS:[
        {
            QUESTION: "Ejemplo de pregunta 1 - primer formulario",
            POSSIBLE_ANSWERS: ['Option 1', 'Option 2', 'Option 3']
        },
        {
            QUESTION: "Ejemplo de pregunta 2 - primer formulario",
            POSSIBLE_ANSWERS: ['Option 1', 'Option 2', 'Option 3']
        },
        {
            QUESTION: "Ejemplo de pregunta 3 - primer formulario",
            POSSIBLE_ANSWERS: ['Option 1', 'Option 2', 'Option 3']
        },
        // You can add here all the questions that you need
        ]
    },
    APP_LAST_FORM:{
        TITLE: 'Titulo del ultimo formulario',
        SUBTITLE: 'Subtitlo de ultimo formulario',
        QUESTIONS:[
        {
            QUESTION: "Ejemplo de pregunta 1 - ultimo formulario",
            POSSIBLE_ANSWERS: ['Option 1', 'Option 2', 'Option 3']
        },
        {
            QUESTION: "Ejemplo de pregunta 2 - ultimo formulario",
            POSSIBLE_ANSWERS: ['Option 1', 'Option 2', 'Option 3']
        },
        {
            QUESTION: "Ejemplo de pregunta 3 - ultimo formulario",
            POSSIBLE_ANSWERS: ['Option 1', 'Option 2', 'Option 3']
        },
        // You can add here all the questions that you need
        ]
    },
    APP_END:{
        TITLE: '¡Bienvenido/a al Brick Breaker!',
        SUB_TITLE: 'RESULTADOS',
        RESTART_BUTTON: 'Atras'
    },
    APP_GAME: {
        TITLE: '¡Bienvenido/a al Brick Breaker!',
        CONTROLS: {
            TITLE: 'CONTROLES',
            SUBTITLE: 'Pulsa los CURSORES DE DIRECCIÓN del teclado para mover la flecha hacia donde lanzar la bola.',
            SUBTITLE2: 'Pulsa BARRA ESPACIADORA para lanzarla.',
            SUBTITLE3: 'Mueve tu barra con los CURSORES de DIRECCIÓN del teclado para golpear la bola.',
            SUBTITLE4: '¿Preparado para jugar?',
            BUTTON: 'JUGAR'
        },
        GAME_STATUS:{
            FIRST_TIME: {
                TITLE: 'INSTRUCCIONES',
                SUBTITLE: '¿Como se juega?',
                SUBTITLE2: 'Objetivo: conseguir el mayor número de puntos posibles para aparecer en el ranking en primera posición.',
                SUBTITLE3: 'El jugador que aparezca primero en el ranking ganará una tarjeta de Amazon de 20€',
                BUTTON_TITLE: 'CONTINUAR',
            },
            SECOND_TIME: {
                TITLE: 'Partida terminada',
                SUBTITLE: 'Para poder ganar necesitas jugar al menos dos partidas y rellenar el cuestionario.',
                SUBTITLE2: 'Puedes jugar hoy u otro día. Si quieres jugar otro día, guarda el enlace y entra con el mismo correo que hoy.',
                BUTTON_TITLE: 'JUGAR',
                BUTTON_TITLE2: 'JUGAR OTRO DIA',
            },
            GAME_FINISH: {
                TITLE: 'Partida terminada',
                SUBTITLE: 'Puedes seguir jugando para tener mayor puntuación o rellenar el cuestionario.',
                CANT_PLAY: 'Ya has realizado todos tus intentos.',
                ADVISE: 'Si no rellenas el cuestionario, tu puntuación no queda registrada.',
                ADVISE2: 'Una vez rellenas el cuestionario, no puedes volver a jugar.',
                BUTTON_TITLE: 'JUGAR',
                BUTTON_TITLE2: 'CUESTIONARIO',
                BUTTON_TITLE3: 'VER RANKING',
            }
        },
        GAME_CONFIGURATION:{
            pointsLabel: 'Puntos:',
            lifesLabel: 'Vidas:',
            elementsNames: BRANDS,
            showBonifications: true,
            tables: [
                [
                    {
                        "table": 1,
                        "name": BRANDS_INFO.BRAND_1.name,
                        "bonification": "nula",
                    },
                    {
                        "table": 1,
                        "name": BRANDS_INFO.BRAND_2.name,
                        "bonification": "mediadora",
                    },
                    {
                        "table": 1,
                        "name": BRANDS_INFO.BRAND_3.name,
                        "bonification": "premio",
                    }
                ],
                [
                    {
                        "table": 2,
                        "name": BRANDS_INFO.BRAND_1.name,
                        "bonification": "nula",
                    },
                    {
                        "table": 2,
                        "name": BRANDS_INFO.BRAND_2.name,
                        "bonification": "premio",
                    },
                    {
                        "table": 2,
                        "name": BRANDS_INFO.BRAND_3.name,
                        "bonification": "mediadora",
                    }
                ],
                [
                    {
                        "table": 3,
                        "name": BRANDS_INFO.BRAND_1.name,
                        "bonification": "premio",
                    },
                    {
                        "table": 3,
                        "name": BRANDS_INFO.BRAND_2.name,
                        "bonification": "nula",
                    },
                    {
                        "table": 3,
                        "name": BRANDS_INFO.BRAND_3.name,
                        "bonification": "mediadora",
                    }
                ],
                [
                    {
                        "table": 4,
                        "name": BRANDS_INFO.BRAND_1.name,
                        "bonification": "mediadora",
                    },
                    {
                        "table": 4,
                        "name": BRANDS_INFO.BRAND_2.name,
                        "bonification": "nula",
                    },
                    {
                        "table": 4,
                        "name": BRANDS_INFO.BRAND_3.name,
                        "bonification": "premio",
                    }
                ],
                [
                    {
                        "table": 5,
                        "name": BRANDS_INFO.BRAND_1.name,
                        "bonification": "mediadora",
                    },
                    {
                        "table": 5,
                        "name": BRANDS_INFO.BRAND_2.name,
                        "bonification": "premio",
                    },
                    {
                        "table": 5,
                        "name": BRANDS_INFO.BRAND_3.name,
                        "bonification": "nula",
                    }
                ],
                [
                    {
                        "table": 6,
                        "name": BRANDS_INFO.BRAND_1.name,
                        "bonification": "premio",
                    },
                    {
                        "table": 6,
                        "name": BRANDS_INFO.BRAND_2.name,
                        "bonification": "mediadora",
                    },
                    {
                        "table": 6,
                        "name": BRANDS_INFO.BRAND_3.name,
                        "bonification": "nula",
                    }
                ],

            ],
            lives: 3,
            addLinesBlockTimer: addBlocksLineTime, // En milisegundos -> Progresivo hasta 5 segundos
            brickBonification: 10, // Bonificacion para ruptra de bloque standar
            brickStandardColor: '#CCCCCC',  // Color para bloques estándar
            brickBonusColor: '#FFA500',  // Color para bloques con bonificacion
            fallingElementVelocity: fallingElementVelocity, // velocidad al caer las bonificaciones marcas
            arrowColor: 'black',
            paddleInformation: {
                color: '#3498db',
                width: 130, // largo del paddle
                height: 20, // alto del paddle
                borderRadius: 10, // Radio de las esquinas para hacerlo redondeado
                speed: paddleVelocity, // velocidad de movimiento  6 para deploy
                bonificationDuration: paddleBofinificationDuration
            },
            ballInformation:{
                color: '#3498db',
                size: 10, // Tamano
                speed: ballVelocity, // velocidad   5 para deploy
                ballVelocityToAdd: ballColisionVelocitiy // velocidad incremental de la bola al colisionar
            },
            bonificationPointInfo:{
                vy: bonificationVyVelocitiy, // velocidad de aparicion hacia arriba
                timeToLive: bonificationShowTimer, // tiempo de vida de la bonificacion
                color: 'green', //color
                shadowColor: 'rgba(255, 255, 0, 0.8)', //sombra
                bonificationValue: 100, //puntuacion de bonificacion
                fontSize: 40
            },
            randomBricks:{
                standardBrick: 80, // entre 0 y 80%
                brand1: 86, // entre 80 y 86
                brand2: 93, // entre 86 y 93
                brand3: 100, // entre 93 y 100
            }

        }
    }
}

