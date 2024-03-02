import React, { useContext, useEffect, useState } from 'react'
import { StyledAppLayout, StyledFlexCenter, StyledLayoutContent } from '../styled-components/containers'
import { Button } from '@mui/material'
import { APP_DATA } from '../CONSTANTS'
import { useNavigate } from 'react-router-dom'
import UserContext from '../UserProvider/UserContext'
import { editUser } from '../firebase/firebase'

export default function LastForm() {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [answers, setAnswers] = useState(() => {
    let answerArray = []
    APP_DATA.APP_LAST_FORM.QUESTIONS.forEach(question => {
      answerArray.push({
        question: question.QUESTION,
        answer_selected: ''
      })
    })
    return answerArray;
  })
  const navigate = useNavigate()  
  const {userInfo, setUserInfo, loadingLogin, setLoadingLogin} = useContext(UserContext)


  useEffect(() => {
    if(userInfo?.finalForm.isCompleted) navigate('/end-game')
  }, [userInfo]);

  useEffect(() => {
    let isCompleted = false
    answers.forEach(answer => {
      if(answer.answer_selected === ''){
        isCompleted = true
      }
    })
    setButtonDisabled(isCompleted)
  }, [answers]);

  const handleAnswers = (index, subIndex) => {
    let answersCopy = [...answers]
    answersCopy[index].answer_selected = APP_DATA.APP_LAST_FORM.QUESTIONS[index].POSSIBLE_ANSWERS[subIndex];
    setAnswers(answersCopy)
  }

  const handleSeeResults = async () => {
    setLoadingLogin(true)
    if(loadingLogin) return
    let userInfoCopy = {...userInfo}  
    userInfoCopy.finalForm.isCompleted = true
    userInfoCopy.finalForm.answers = [...answers]
    const userUpdated = await editUser(userInfoCopy.id, userInfoCopy)
    if(userUpdated){
      setUserInfo(userInfoCopy)
      navigate('/end-game')
    }else{
      alert("Error, try again")
    }
    setLoadingLogin(false)
  }
  
  return (
    <StyledAppLayout>
      <h1>{APP_DATA.APP_TITLE}</h1>

    <StyledLayoutContent>
      <h2>{APP_DATA.APP_LAST_FORM.TITLE}</h2>
      <p>{APP_DATA.APP_LAST_FORM.SUBTITLE}</p>
        {APP_DATA.APP_LAST_FORM.QUESTIONS.length > 0 
        ? 
          APP_DATA.APP_LAST_FORM.QUESTIONS.map((question, indexOption) => 
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
    <Button
      variant='contained'
      disabled={buttonDisabled}
      onClick={handleSeeResults}
      style={{marginBottom: '2em'}}

    >
      {APP_DATA.APP_BUTTON_END}
    </Button>
    </StyledLayoutContent>
  </StyledAppLayout>
  )
}
