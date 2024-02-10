import React, { useEffect, useState } from 'react'
import { StyledFlexCenter, StyledLayoutContent } from '../styled-components/containers'
import { Button } from '@mui/material'
import { APP_DATA } from '../CONSTANTS'
import { useNavigate } from 'react-router-dom'


export default function FirstForm() {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [answers, setAnswers] = useState(() => {
    let answerArray = []
    APP_DATA.APP_FIRST_FORM.QUESTIONS.forEach(question => {
      answerArray.push({
        question: question.QUESTION,
        answer_selected: ''
      })
    })
    return answerArray;
  })
  const navigate = useNavigate()  

  useEffect(() => {
    let isCompleted = false
    answers.forEach(answer => {
      if(answer.answer_selected === ''){
        isCompleted = true
      }
    })
    setButtonDisabled(isCompleted)
  }, [answers]);

  const handlePinballInit = () => {
    console.log(answers)
    navigate('pinball-game')
  }
  
  const handleAnswers = (index, subIndex) => {
    let answersCopy = [...answers]
    answersCopy[index].answer_selected = APP_DATA.APP_FIRST_FORM.QUESTIONS[index].POSSIBLE_ANSWERS[subIndex];
    setAnswers(answersCopy)
  }

  return (
  <>
    <StyledLayoutContent>
      <h2>{APP_DATA.APP_FIRST_FORM.TITLE}</h2>
      <p>{APP_DATA.APP_FIRST_FORM.SUBTITLE}</p>
        {APP_DATA.APP_FIRST_FORM.QUESTIONS.length > 0 
        ? 
          APP_DATA.APP_FIRST_FORM.QUESTIONS.map((question, indexOption) => 
            <StyledFlexCenter key={indexOption}>
              <h3>{question.QUESTION}</h3>
              {question.POSSIBLE_ANSWERS.map((answerOption, indexSubOption) => 
                <StyledFlexCenter key={indexSubOption} style={{padding: 0, margin: '5px', justifyContent:'flex-start', alignItems:'center'}} direction="row">
                    <input type='checkbox' style={{marginRight:'10px'}} checked={answers[indexOption].answer_selected === answerOption} onChange={() => handleAnswers(indexOption,indexSubOption)}/>
                    <label onClick={() => handleAnswers(indexOption,indexSubOption)}> {answerOption} </label>
                </StyledFlexCenter>
              )}
            </StyledFlexCenter>
          )
        :
          <p>No existe un formulario, por favor revisa el archivo de configuracion</p>
        }
    </StyledLayoutContent>
    <Button
      variant='contained'
      onClick={handlePinballInit}
      disabled={buttonDisabled}
    >
      {APP_DATA.APP_BUTTON_PLAY}
    </Button>
  </>
  )
}
