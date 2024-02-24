import styled from "styled-components";



export const StyledTableGame = styled('div')`
    width: 100%;
    display: flex;
    justify-content: center; 
    align-items: center; 
    flex-direction: column;
        
    .gameCanvas {
        display: flex;
        align-items: center; 
        justify-content: center; 

        
        canvas {
            background: #f0f0f0;
            display: block;
            border-radius: 5px;
        }
    }
`

export const StyledGameInfoContainer = styled('div')`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    aling-items: center;     
    top: 80px;
    position: absolute;
    width: 900px;

    @media (max-width: 992px) {
        width: 100%;
    }

    p {
        margin: 0;
    }


    .timer {
        padding: 0.2em 0.5em;
        display: flex; 
        align-items: center;
        justify-content: center;
        margin: 20px;
        background-color: lightgrey;
        color: black;
        font-size: 1.5em;
        border-radius: 8px;
        text-align: center;
    }

    .points{
        padding: 0.2em 0.5em;
        margin: 20px;
        background-color: lightgrey;
        color: black;
        font-size: 1.5em;
        border-radius: 8px;
        text-align: left;
        display:flex;
        flex-direction: column;
    }

    .lifes{
        padding: 0.2em 0.5em;
        margin: 20px;
        background-color: lightgrey;
        color: black;
        font-size: 1.5em;
        border-radius: 8px;
        text-align: left;
        display:flex;

        label{
            margin-right: 5px;
        }
    }

}
`

export const StyledRules = styled('div')`
        top: 180px;
        right: 460px;
        position: absolute;
        border-radius: 8px;

        .rule-element-container{
            display: flex;
            align-items: center;
            img{
                margin-right: 10px;
                width: 40px;
                height: 40px;
            }
            h3{
                margin: 10px 0;
            }
        }
`