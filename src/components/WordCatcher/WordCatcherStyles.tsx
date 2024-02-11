import styled from "styled-components";



export const StyledWordCatcherTableGame = styled('div')`
    width: 100%;
    display: flex;
    justify-content: center; 
    align-items: center; 
    flex-direction: column;
    background: url('/assets/images/word-catcher/background.png');      
    
    .gameCanvas {
        display: flex;
        align-items: center; 
        justify-content: center; 

        
        canvas {
            width: 100% !important;
        }
    }
`

export const StyledGameInfoContainer = styled('div')`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;     

    @media (max-width: 992px) {
        width: 100%;
    }

    p {
        margin: 0;
    }


    .timer {
        top: 160px;
        padding: 0.2em 0.5em;
        position: absolute;
        display: flex; 
        align-items: center;
        justify-content: center;
        margin: 20px;
        background-color: lightgrey;
        color: black;
        font-size: 1.2em;
        border-radius: 8px;
        text-align: center;
    }

    .points{
        top: 160px;
        right: 560px;
        padding: 0.2em 0.5em;
        position: absolute;
        margin: 20px;
        background-color: lightgrey;
        color: black;
        font-size: 1.2em;
        border-radius: 8px;
        text-align: center;
    }

}
`

