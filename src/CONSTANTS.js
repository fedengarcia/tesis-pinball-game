import appleSVG from './assets/apple-logo.svg'
import samsungSVG from './assets/samsung-logo.svg'
import xiaomiSVG from './assets/xiaomi-logo.svg'
import ballSVG from './assets/ball.svg'

export const APP_DATA = {
    APP_TITLE: "Bienvenido a mi tesis",
    APP_SUBTITLE: "Espero que lo disfruten y se diviertan mientras aprendemos",
    APP_SHOW_LABEL_INPUT: true,
    APP_NAME_LABEL: "Nombre",
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
    APP_GAME: {
        TITLE: 'Recoge las marcas, pero ten cuidado con las bolas !',
        END_GAME_BUTTON: 'Terminar partida',
        GAME_CONFIGURATION:{
            times_up: 'Se acabo el tiempo!',
            pointsLabel: 'Puntos:',
            time: 30,
            /* 
                Bonifications must be same length of images/words 
                The only functionality of points available are x2, x1, +1 
                Ball will rest -1 point
            */
            showBonifications: true,
            bonifications: ['x2', 'x1', '+1'],
            /* 
                if you want use only images, keep brand_words empty
                If you want use only words, just keep brand_images empty
                If you want both, keep two with values
            */
            damageElements: [
                {
                    name: 'ball',
                    src: ballSVG
                },
                {
                    name: 'ball',
                    src: ballSVG
                }
            ],
            elementsToDrop: [{
                name: 'Samsung',
                src: samsungSVG
            },
            {
                name: 'Apple',
                src: appleSVG
            },
            {
                name: 'Xiaomi',
                src: xiaomiSVG
            },
            ], 
        }
    }
}