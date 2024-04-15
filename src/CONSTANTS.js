import bricksgame from './assets/bricksgame.png'
import rojo from './assets/rojo.png'
import azul from './assets/azul.png'
import verde from './assets/verde.png'
import logo1 from './assets/Logo2.png'
import logo2 from './assets/logo8.png'
import logo3 from './assets/logo10.png'
import logo4 from './assets/logo11.png'
import logo5 from './assets/logo12.png'
import logo6 from './assets/logo13.png'



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
            ballVelocity: 12,
            ballColisionVelocitiy: 0.5,
            paddleVelocity: 14,
            paddleBofinificationDuration: 12000,
            fallingElementVelocity: 6,
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
    APP_TITLE: "¡Bienvenid@ al videojuego “rompeladrillos”!",
    APP_LOGIN_SUBTITLE: "Tienes que jugar con tu ordenador de sobremesa o portátil. No se puede jugar con el móvil.",
    APP_LOGIN_SUBTITLE2: "Es importante que dejes tu correo verdadero para que podamos contactarte si eres el ganador o ganadora.",
    APP_EMAIL_LABEL: "Email",
    APP_BUTTON_PLAY: 'Continuar',
    APP_BUTTON_END: 'Responder y ver resultados',
    APP_FIRST_FORM: {
        BUTTON:'Continuar',
        TITLE: 'Primer cuestionario',
        SUBTITLE: 'Sección 1 de 3: comportamiento de juego.',
        QUESTIONS:[
        {
            QUESTION: "¿Cuánto tiempo llevas jugando videojuegos (considera cualquier videojuego, también para móvil)?",
            POSSIBLE_ANSWERS: [
                "Menos de 1 año",
                "De 1 a 2 años",
                "De 3 a 5 años",
                "De 6 a 8 años",
                "9 años o más"
              ]
        },
        {
            QUESTION: "¿Con qué frecuencia juegas videojuegos?",
            POSSIBLE_ANSWERS: [
                "Nunca",
                "De 1 a 10 veces al año",
                "Al menos una vez al mes",
                "Al menos una vez a la semana",
                "Diariamente"
              ]
        },
        {
            QUESTION: "¿Cuánto dura en promedio tu sesión de juego?",
            POSSIBLE_ANSWERS: [
                "Menos de media hora",
                "Entre media hora y una hora",
                "Entre 1 y 2 horas",
                "Más de 2 horas y menos de 4",
                "Más de 4 horas y menos de 6",
                "Más de 6 horas"
              ]
        },
        {
            QUESTION: "¿Has jugado anteriormente a un juego estilo “rompeladrillos” o “brick breaker”?",
            imgsrc: bricksgame,
            POSSIBLE_ANSWERS:[
                "Nunca",
                "Alguna vez",
                "Varias veces",
                "Muchas veces"
              ]
        },
        // You can add here all the questions that you need
        ]
    },
    APP_SECOND_FORM: {
        BUTTON:'Continuar',
        TITLE: 'Primer cuestionario',
        SUBTITLE: 'Sección 2 de 3: marcas y publicidad in-game.',
        QUESTIONS:[
        {
            QUESTION: "Indica si reconoces alguna de las marcas",
            POSSIBLE_ANSWERS_IMAGES:[azul,rojo,verde],
            POSSIBLE_ANSWERS: [
                'Si',
                'No',
              ]
        },
        {
            QUESTION: `Evalúa en qué grado te gusta cada uno de los logos.`,
            hasScale:true,
            POSSIBLE_ANSWERS_IMAGES:[azul,rojo,verde],
            scaleText:['Nada en absoluto', 'Muchisimo'],
        },
        {
            QUESTION: "Las marcas son propiedad de organizaciones que se dedican a un sector productivo. No sabes con certeza a qué se dedica cada marca, pero trata de adivinarlo intuitivamente. Pueden dedicarse a lo mismo, o no.",
            hasInput: true,
            POSSIBLE_ANSWERS_IMAGES:[azul,rojo,verde],
            POSSIBLE_ANSWERS: ['','','']
        },
        {
            QUESTION: "¿Cómo valorarías una marca que te diera puntos, siendo el objetivo del juego ganar el mayor número de puntos posible?",
            hasScale: true,
            scaleText:['Totalmente en contra', 'Totalmente a favor']
        },
        {
            QUESTION: "¿Cómo valorarías una marca que te ayudara facilitándote el juego y pudiendo por ello ganar más puntos?",
            hasScale: true,
            scaleText:['Totalmente en contra', 'Totalmente a favor'],
        },
        // You can add here all the questions that you need
        ]
    },
    APP_THIRD_FORM: {
        BUTTON:'Finalizar',
        TITLE: 'Primer cuestionario',
        SUBTITLE: 'Primer cuestionario. Sección 3 de 3: datos sociodemográficos.',
        QUESTIONS:[
        {
            QUESTION: "Edad",
            hasInput: true,
            POSSIBLE_ANSWERS: ['10','75']
        },
        {
            QUESTION: `Genero`,
            POSSIBLE_ANSWERS: [
                "Varón",
                "Mujer",
                "Otro",
                "Prefiero no decirlo"
              ],
        },
        {
            QUESTION: "Lugar de residencia",
            hasInput: true
        },
        {
            QUESTION: "Nivel educativo",
            POSSIBLE_ANSWERS:[
                "Estudio la ESO",
                "Tengo la ESO (Educación Secundaria Obligatoria)",
                "Estudio Bachillerato",
                "Tengo Bachillerato",
                "Estudio Formación Profesional",
                "Tengo estudios de Formación Profesional",
                "Estudio un grado universitario",
                "Soy graduado o graduada",
                "Estudio un máster",
                "Tengo un máster",
                "Estoy haciendo un doctorado",
                "Tengo un doctorado"
              ]
        },
        // You can add here all the questions that you need
        ]
    },
    APP_LAST_FORM_1:{
        TITLE: 'Cuestionario final.',
        SUBTITLE: 'Sección 1 de 2: actitudes generales hacia la publicidad.',
        BUTTON: 'CONTINUAR',
        QUESTIONS:[
            {
                QUESTION: "¿Qué sientes sobre la publicidad?",
                hasScale: true,
                scaleText:['Odio la publicidad', 'Amo la publicidad']
            },
            {
                QUESTION: "¿Cuál es tu opinión sobre la publicidad?",
                hasScale: true,
                scaleText:['Totalmente innecesaria', 'Totalmente necesaria']
            },
            {
                QUESTION: "¿Sabías que existe publicidad dentro de los videojuegos?",
                QUESTION2: "La publicidad dentro de los videojuegos se llama IGA. En general, ¿cuál es tu actitud hacia la IGA?",
                hasScale: true,
                hasRadio: true,
                hasHiddenQuestion: true,
                scaleText:['Totalmente negativa', 'Totalmente positiva'],
                POSSIBLE_ANSWERS: [
                    'Si',
                    'No',
                  ]
            },
            {
                QUESTION: `¿Te ha parecido divertido el juego?`,
                hasScale:true,
                scaleText:['Nada divertido', 'Totalmente divertido'],
            },
            {
                hasRadio: true,
                QUESTION: "¿Cuál de estas marcas estaban en el juego?",
                POSSIBLE_ANSWERS_IMAGES:[logo1, rojo, logo2, verde, logo3, logo4, logo5, azul, logo6],
                POSSIBLE_ANSWERS: ['Si', 'No']
            },
        ]
    },
    APP_LAST_FORM_2:{
        TITLE: 'Cuestionario final.',
        SUBTITLE: 'Sección 2 de 2: actitudes generales hacia las marcas',
        BUTTON: 'FINALIZAR',
        QUESTIONS:[
            {
                QUESTION: "Valora de 1 a 7 cada uno de los logos:",
                hasScale: true,
                POSSIBLE_ANSWERS_IMAGES:[rojo, verde, azul],
                scaleText:['No me gusta nada', 'Me gusta muchísimo']
            },
            {
                QUESTION: "Valora de 1 a 7 el grado en el que aconsejarías cada una de las marcas:",
                hasScale: true,
                POSSIBLE_ANSWERS_IMAGES:[rojo, verde, azul],
                scaleText:['Nada recomendable', 'Totalmente recomendable']
            },
            {
                QUESTION: "Las marcas son propiedad de organizaciones que se dedican a un sector productivo. No sabes con certeza a qué se dedica cada marca, pero trata de adivinralo intuitivamente. Pueden dedicarse a lo mismo, o no.",
                hasInput: true,
            },
            {
                QUESTION: `Valora de 1 a 7 el grado de congruencia de cada marca con el juego:`,
                hasScale: true,
                POSSIBLE_ANSWERS_IMAGES:[rojo, verde, azul],
                scaleText:['Totalmente incogruente', 'Totalmente congruente'],
            },
            {
                QUESTION: "¿Cómo afectó la presencia de cada uno de los logos a tu experiencia de juego?",
                hasScale: true,
                POSSIBLE_ANSWERS_IMAGES:[rojo, verde, azul],
                scaleText:['La empeoró completamente', 'La mejoró completamente'],
            },
            {
                QUESTION: " ¿Encontraste la inserción de estos logos dentro del juego intrusiva o molesta",
                hasScale: true,
                POSSIBLE_ANSWERS_IMAGES:[rojo, verde, azul],
                scaleText:['Nada molesto', 'Totalmente molesto'],
            },
        ]
    },
    APP_END:{
        TITLE: '¡Bienvenid@ al videojuego “rompeladrillos”!',
        SUB_TITLE: 'RESULTADOS',
        RESTART_BUTTON: 'Atras'
    },
    APP_GAME: {
        TITLE: '¡Bienvenid@ al videojuego “rompeladrillos”!',
        CONTROLS: {
            TITLE: 'Te recuerdo cómo se juega:',
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

