import appleSVG from './assets/apple-logo.svg'
import samsungSVG from './assets/samsung-logo.svg'
import xiaomiSVG from './assets/xiaomi-logo.svg'

// CHANGE HERE THE INFORMATION OF THE BRANDS 
// MAKE SHURE THAT THE NAME MATCH WITH THE SRC IMAGE
const BRANDS_INFO = {
    BRAND_1: {
        name: "Samsung",
        src: samsungSVG
    },
    BRAND_2: {
        name: "Apple",
        src: appleSVG
    },
    BRAND_3: {
        name: "Xiaomi",
        src: xiaomiSVG
    }
}

const BRANDS = [
    BRANDS_INFO.BRAND_1.name,
    BRANDS_INFO.BRAND_2.name,
    BRANDS_INFO.BRAND_3.name,
]

export const APP_DATA = {
    APP_TITLE: "APP TITLE",
    APP_LOGIN_SUBTITLE: "SUBTITLE LOGIN",
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
        TITLE: 'FIN DE TESIS',
        SUB_TITLE: 'RESULTADOS',
        RESTART_BUTTON: 'Volver a jugar'
    },
    APP_GAME: {
        TITLE: 'Bricks',
        GAME_STATUS:{
            FIRST_TIME: {
                TITLE: 'Esta es tu primera vez',
                SUBTITLE: 'Desafia tus limites y haz el puntaje mas alto que puedas!',
                BUTTON_TITLE: 'Comenzar a jugar',
            },
            SECOND_TIME: {
                TITLE: 'Esta es tu segunda vez',
                SUBTITLE: 'Desbloquea una recompensa jugando por segunda vez!',
                BUTTON_TITLE: 'Comenzar a jugar',
            },
            GAME_FINISH: {
                TITLE: 'Has hecho todos los intentos posibles',
                SUBTITLE: 'Gracias por participar',
                BUTTON_TITLE: 'Volver a jugar',
                BUTTON_TITLE2: 'Responde y obtiene recompensa',
                BUTTON_TITLE3: 'Ver ranking'
            }
        },
        GAME_CONFIGURATION:{
            pointsLabel: 'Puntos:',
            lifesLabel: 'Vidas:',
            elementsNames: BRANDS,
            /* 
                Bonifications must be same length of images/words 
                The only functionality of points available are x2, x1, +1 
                Ball will rest -1 point
            */
            showBonifications: true,
            tables: [
                [
                    {
                        "table": 1,
                        "name": BRANDS_INFO.BRAND_1.name,
                        "src": BRANDS_INFO.BRAND_1.src,
                        "bonification": "nula",
                    },
                    {
                        "table": 1,
                        "name": BRANDS_INFO.BRAND_2.name,
                        "src": BRANDS_INFO.BRAND_2.src,
                        "bonification": "mediadora",
                    },
                    {
                        "table": 1,
                        "name": BRANDS_INFO.BRAND_3.name,
                        "src": BRANDS_INFO.BRAND_3.src,
                        "bonification": "premio",
                    }
                ],
                [
                    {
                        "table": 2,
                        "name": BRANDS_INFO.BRAND_1.name,
                        "src": BRANDS_INFO.BRAND_1.src,
                        "bonification": "nula",
                    },
                    {
                        "table": 2,
                        "name": BRANDS_INFO.BRAND_2.name,
                        "src": BRANDS_INFO.BRAND_2.src,
                        "bonification": "premio",
                    },
                    {
                        "table": 2,
                        "name": BRANDS_INFO.BRAND_3.name,
                        "src": BRANDS_INFO.BRAND_3.src,
                        "bonification": "mediadora",
                    }
                ],
                [
                    {
                        "table": 3,
                        "name": BRANDS_INFO.BRAND_1.name,
                        "src": BRANDS_INFO.BRAND_1.src,
                        "bonification": "premio",
                    },
                    {
                        "table": 3,
                        "name": BRANDS_INFO.BRAND_2.name,
                        "src": BRANDS_INFO.BRAND_2.src,
                        "bonification": "nula",
                    },
                    {
                        "table": 3,
                        "name": BRANDS_INFO.BRAND_3.name,
                        "src": BRANDS_INFO.BRAND_3.src,
                        "bonification": "mediadora",
                    }
                ],
                [
                    {
                        "table": 4,
                        "name": BRANDS_INFO.BRAND_1.name,
                        "src": BRANDS_INFO.BRAND_1.src,
                        "bonification": "mediadora",
                    },
                    {
                        "table": 4,
                        "name": BRANDS_INFO.BRAND_2.name,
                        "src": BRANDS_INFO.BRAND_2.src,
                        "bonification": "nula",
                    },
                    {
                        "table": 4,
                        "name": BRANDS_INFO.BRAND_3.name,
                        "src": BRANDS_INFO.BRAND_3.src,
                        "bonification": "premio",
                    }
                ],
                [
                    {
                        "table": 5,
                        "name": BRANDS_INFO.BRAND_1.name,
                        "src": BRANDS_INFO.BRAND_1.src,
                        "bonification": "mediadora",
                    },
                    {
                        "table": 5,
                        "name": BRANDS_INFO.BRAND_2.name,
                        "src": BRANDS_INFO.BRAND_2.src,
                        "bonification": "premio",
                    },
                    {
                        "table": 5,
                        "name": BRANDS_INFO.BRAND_3.name,
                        "src": BRANDS_INFO.BRAND_3.src,
                        "bonification": "nula",
                    }
                ],
                [
                    {
                        "table": 6,
                        "name": BRANDS_INFO.BRAND_1.name,
                        "src": BRANDS_INFO.BRAND_1.src,
                        "bonification": "premio",
                    },
                    {
                        "table": 6,
                        "name": BRANDS_INFO.BRAND_2.name,
                        "src": BRANDS_INFO.BRAND_2.src,
                        "bonification": "mediadora",
                    },
                    {
                        "table": 6,
                        "name": BRANDS_INFO.BRAND_3.name,
                        "src": BRANDS_INFO.BRAND_3.src,
                        "bonification": "nula",
                    }
                ],

            ],
            lives: 3,
            addLinesBlockTimer: 5000, // En milisegundos
            brickBonification: 10, // Bonificacion para ruptra de bloque standar
            brickStandardColor: '#CCCCCC',  // Color para bloques estándar
            brickBonusColor: '#FFA500',  // Color para bloques con bonificacion
            fallingElementVelocity: 0.8, // velocidad al caer las bonificaciones marcas
            arrowColor: 'black',
            paddleInformation: {
                color: '#3498db',
                width: 130, // largo del paddle
                height: 20, // alto del paddle
                borderRadius: 10, // Radio de las esquinas para hacerlo redondeado
                speed: 4, // velocidad de movimiento
            },
            ballInformation:{
                color: '#3498db',
                size: 10, // Tamano
                speed: 2, // velocidad
                ballVelocityToAdd: 0.02 // velocidad incremental de la bola al colisionar
            },
            bonificationPointInfo:{
                vy: 0.5, // velocidad de aparicion hacia arriba
                timeToLive: 2, // tiempo de vida de la bonificacion
                color: 'lightgreen', //color
                shadowColor: 'rgba(255, 255, 0, 0.8)', //sombra
            },
            randomBricks:{
                standarBrick: 80, // entre 0 y 80%
                [BRANDS_INFO.BRAND_1.name]: 86, // entre 80 y 86
                [BRANDS_INFO.BRAND_2.name]: 93, // entre 86 y 93
                [BRANDS_INFO.BRAND_3.name]: 100, // entre 93 y 100
            }

        }
    }
}

