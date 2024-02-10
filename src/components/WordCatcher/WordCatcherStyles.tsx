import styled from "styled-components";


export const StyledWordCatcherTableGame = styled('div')`
    width: 100%;
    height: fit-content !important;
    margin-top: 15px;
    display:flex; 
    align-items: center; 
    flex-direction: column;
    position: relative;
    overflow: hidden;

    @media (max-width: 992px) {
        margin-top: 09px;
    }


`

export const StyledGame = styled('div')`
    width: 100%;
    display: flex;
    justify-content: center; 
    align-items: center; 
    flex-direction: row;
    width:80%;
    
    @media (max-width: 992px) {
        flex-direction: column;
        width: 100%;
    }
    
    .gameCanvas {
        display: flex;
        align-items: center; 
        justify-content: center; 
        width: 100%;
        
        canvas {
            width: 85% !important;
            @media (min-width: 992px) {
                width: 90% !important;
            }
        }
    }
`

export const StyledGameInfoContainer = styled('div')`
    display: flex;
    flex-direction: column;
    width: 90%;
    align-items: center;            

    @media (max-width: 992px) {
        width: 100%;
    }

    p {
        margin: 0;
    }


    .timer {
        margin: 20px;
        background-color: grey;
        color: black;
        font-size: 1em;
        border-radius: 8px;
        text-align: center;
        width: 90%;
        display: inline;

        @media (max-width: 992px) {
            width: 60%;
            margin-top: 10px;
            margin-bottom: 10px;
        }
    }

}
`

