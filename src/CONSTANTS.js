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
        TITLE: 'Recoge las marcas, pero ten cuidado !',
        END_GAME_BUTTON: 'Terminar partida',
        GAME_CONFIGURATION:{
            times_up: 'Se acabo el tiempo!',
            points: 'Puntos del juego:',
            time: 30,
            /* 
                Bonifications must be same length of images/words 
                The only functionality of points available are x2, x1, +1 
                Ball will rest -1 point
            */
            bonifications: ['x2', 'x1', '+1'],
            /* 
                if you want use only images, keep brand_words empty
                If you want use only words, just keep brand_images empty
                If you want both, keep two with values
            */
            damageElements: [
                {
                    name: 'ball',
                    src: '/assets/react.svg'
                },
                {
                    name: 'ball',
                    src: '/assets/react.svg'
                }
            ],
            elementsToDrop: [{
                name: 'Samsung',
                src: '/assets/react.svg'
            },
            {
                name: 'Apple',
                src: '/assets/react.svg'
            },
            {
                name: 'Xiaomi',
                src: '/assets/react.svg'
            },
            ], 
        }
    }
}