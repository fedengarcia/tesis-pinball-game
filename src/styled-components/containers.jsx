import { styled } from "@mui/system";

export const StyledLayoutContent = styled('div')`
    width: 900px;
    height: 750px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    overflow-y: scroll;
    padding: 0 1em;
    background-color: #f5f4f1;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 8px;
    margin-bottom: 2em;
    overflow-x: hidden;
    ::-webkit-scrollbar {
        width: 0.5vw;
      }
      
    /* Track */
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 4px #1565c0;
        border-radius: 0px;
    }
      
    /* Handle #43a1a2 or #214F61 or #ADADAD */
    ::-webkit-scrollbar-thumb {
        box-shadow: inset 4px 2px 12px 2px #1565c0;
        border-radius: 4px;
      }
`

export const StyledAppLayout = styled('div')`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    flex-direction: column;
`


export const StyledFlexCenter = styled('div')`
      width: 100%;
      box-sizing: border-box;
      padding: 1em;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: ${props => props.direction ?? 'column'};



`