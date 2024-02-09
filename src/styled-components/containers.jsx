import { styled } from "@mui/system";

export const StyledLayoutContent = styled('div')`
    width: 500px;
    height: 450px;
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
    ::-webkit-scrollbar {
        width: 0.5vw;
      }
      
    /* Track */
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 4px #214f61;
        border-radius: 0px;
    }
      
    /* Handle #43a1a2 or #214F61 or #ADADAD */
    ::-webkit-scrollbar-thumb {
        box-shadow: inset 4px 2px 12px 2px #214f61;
        border-radius: 4px;
      }
`

export const StyledAppLayout = styled('div')`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    width: 600px;
`