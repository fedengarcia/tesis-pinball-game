import appleSVG from './assets/apple-logo.svg'
import samsungSVG from './assets/samsung-logo.svg'
import xiaomiSVG from './assets/xiaomi-logo.svg'

const generate_tables = () => {
    let tables = [];

    const interactions = ['nula', 'mediadora', 'premio'];

    const brands = [
        { name: 'Samsung', src: samsungSVG },
        { name: 'Apple', src: appleSVG },
        { name: 'Xiaomi', src: xiaomiSVG }
    ];

    for (let i = 0; i < 9; i++) {
        const table = [];

        // Generar aleatoriamente las interacciones y asignar name y src para cada marca en esta mesa
        for (let j = 0; j < 3; j++) {
            const randomInteractionIndex = Math.floor(Math.random() * 3);
            const brand = {
            table: i+1,
            name: brands[j].name,
            src: brands[j].src,
            bonification: interactions[randomInteractionIndex]
            };
            table.push(brand);
        }

        tables.push(table);
    }
    return tables
}

export const APP_DATA = {
    APP_TITLE: "Bienvenido a mi tesis",
    APP_LOGIN_SUBTITLE: "Espero que lo disfruten y se diviertan mientras aprendemos",
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
    APP_GAME: {
        TITLE: 'Pinball',
        END_GAME_BUTTON: 'Terminar partida',
        GAME_CONFIGURATION:{
            times_up: 'Se acabo el tiempo!',
            time: 120,
            pointsLabel: 'Puntos:',
            brands: ['samsung', 'apple', 'xiaomi'],
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
                        "name": "Samsung",
                        "src": samsungSVG,
                        "bonification": "nula",
                        "ballHits": 0
                    },
                    {
                        "table": 1,
                        "name": "Apple",
                        "src": appleSVG,
                        "bonification": "mediadora",
                        "ballHits": 0
                    },
                    {
                        "table": 1,
                        "name": "Xiaomi",
                        "src": xiaomiSVG,
                        "bonification": "premio",
                        "ballHits": 0
                    }
                ],
                [
                    {
                        "table": 2,
                        "name": "Samsung",
                        "src": samsungSVG,
                        "bonification": "mediadora",
                        "ballHits": 0
                    },
                    {
                        "table": 2,
                        "name": "Apple",
                        "src": appleSVG,
                        "bonification": "mediadora",
                        "ballHits": 0
                    },
                    {
                        "table": 2,
                        "name": "Xiaomi",
                        "src": xiaomiSVG,
                        "bonification": "mediadora",
                        "ballHits": 0
                    }
                ],
                [
                    {
                        "table": 3,
                        "name": "Samsung",
                        "src": samsungSVG,
                        "bonification": "nula",
                        "ballHits": 0
                    },
                    {
                        "table": 3,
                        "name": "Apple",
                        "src": appleSVG,
                        "bonification": "nula",
                        "ballHits": 0
                    },
                    {
                        "table": 3,
                        "name": "Xiaomi",
                        "src": xiaomiSVG,
                        "bonification": "premio",
                        "ballHits": 0
                    }
                ],
                [
                    {
                        "table": 4,
                        "name": "Samsung",
                        "src": samsungSVG,
                        "bonification": "nula",
                        "ballHits": 0
                    },
                    {
                        "table": 4,
                        "name": "Apple",
                        "src": appleSVG,
                        "bonification": "mediadora",
                        "ballHits": 0
                    },
                    {
                        "table": 4,
                        "name": "Xiaomi",
                        "src": xiaomiSVG,
                        "bonification": "premio",
                        "ballHits": 0
                    }
                ],
                [
                    {
                        "table": 5,
                        "name": "Samsung",
                        "src": samsungSVG,
                        "bonification": "premio",
                        "ballHits": 0
                    },
                    {
                        "table": 5,
                        "name": "Apple",
                        "src": appleSVG,
                        "bonification": "premio",
                        "ballHits": 0
                    },
                    {
                        "table": 5,
                        "name": "Xiaomi",
                        "src": xiaomiSVG,
                        "bonification": "mediadora",
                        "ballHits": 0
                    }
                ],
                [
                    {
                        "table": 6,
                        "name": "Samsung",
                        "src": samsungSVG,
                        "bonification": "nula",
                        "ballHits": 0
                    },
                    {
                        "table": 6,
                        "name": "Apple",
                        "src": appleSVG,
                        "bonification": "mediadora",
                        "ballHits": 0
                    },
                    {
                        "table": 6,
                        "name": "Xiaomi",
                        "src": xiaomiSVG,
                        "bonification": "mediadora",
                        "ballHits": 0
                    }
                ],
                [
                    {
                        "table": 7,
                        "name": "Samsung",
                        "src": samsungSVG,
                        "bonification": "nula",
                        "ballHits": 0
                    },
                    {
                        "table": 7,
                        "name": "Apple",
                        "src": appleSVG,
                        "bonification": "premio",
                        "ballHits": 0
                    },
                    {
                        "table": 7,
                        "name": "Xiaomi",
                        "src": xiaomiSVG,
                        "bonification": "premio",
                        "ballHits": 0
                    }
                ],
                [
                    {
                        "table": 8,
                        "name": "Samsung",
                        "src": samsungSVG,
                        "bonification": "nula",
                        "ballHits": 0
                    },
                    {
                        "table": 8,
                        "name": "Apple",
                        "src": appleSVG,
                        "bonification": "premio",
                        "ballHits": 0
                    },
                    {
                        "table": 8,
                        "name": "Xiaomi",
                        "src": xiaomiSVG,
                        "bonification": "premio",
                        "ballHits": 0
                    }
                ],
                [
                    {
                        "table": 9,
                        "name": "Samsung",
                        "src": samsungSVG,
                        "bonification": "mediadora",
                        "ballHits": 0
                    },
                    {
                        "table": 9,
                        "name": "Apple",
                        "src": appleSVG,
                        "bonification": "premio",
                        "ballHits": 0
                    },
                    {
                        "table": 9,
                        "name": "Xiaomi",
                        "src": xiaomiSVG,
                        "bonification": "mediadora",
                        "ballHits": 0
                    }
                ]
            ]
        }
    }
}

