import React, { useContext, useEffect, useState } from 'react'
import { StyledAppLayout, StyledFlexCenter, StyledLayoutContent } from '../styled-components/containers'
import { Button, TextField } from '@mui/material'
import { APP_DATA } from '../CONSTANTS'
import { useNavigate } from 'react-router-dom'
import UserContext from '../UserProvider/UserContext'
import { editUser } from '../firebase/firebase'

export default function ThirdForm() {
  const navigate = useNavigate()  
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [answers, setAnswers] = useState(() => {
    let answerArray = []
    APP_DATA.APP_THIRD_FORM.QUESTIONS.forEach(question => {
      answerArray.push({
        question: question.QUESTION,
        answer_selected: ''
      })
    })
    return answerArray;
  })
  const [residencia, setResidencia] = useState('')
  const [inputnumber, setinputnumber] = useState('')
  const {userInfo, setUserInfo, loadingLogin, setLoadingLogin} = useContext(UserContext)

  useEffect(() => {
    if(!userInfo?.email) navigate('/')
    if(userInfo?.thirdForm?.isCompleted) navigate('/game')
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



  const handleGoToSecondForm = async () => {
    setLoadingLogin(true)
    if(loadingLogin) return
    let userInfoCopy = {...userInfo}  
    userInfoCopy.thirdForm.isCompleted = true
    userInfoCopy.thirdForm.answers = [...answers]
    const userUpdated = await editUser(userInfoCopy.id, userInfoCopy)
    if(userUpdated){
      setUserInfo(userInfoCopy)
      navigate('/game')
    }else{
      alert("Error, try again")
    }
    setLoadingLogin(false)
  }
  
  const handleAnswers = (index, subIndex, type, e) => {
    let answersCopy = [...answers]
    if(type === 'input'){
      setResidencia(e.target.value)
      answersCopy[index].answer_selected = e.target.value
    }else if(type === 'inputnumber'){
      if(e.target.value < 10 || e.target.value > 75) {
        setinputnumber('')
        answersCopy[index].answer_selected = ''
        return
      }else{
        setinputnumber(e.target.value)
        answersCopy[index].answer_selected = e.target.value
      }

    }else{
      answersCopy[index].answer_selected = APP_DATA.APP_THIRD_FORM.QUESTIONS[index].POSSIBLE_ANSWERS[subIndex];
    }
    setAnswers(answersCopy)
  }

  return (
  <StyledAppLayout>
    <h1>{APP_DATA.APP_TITLE}</h1>


    <StyledLayoutContent>
      <h2>{APP_DATA.APP_THIRD_FORM.TITLE}</h2>
      <p>{APP_DATA.APP_THIRD_FORM.SUBTITLE}</p>

          {APP_DATA.APP_THIRD_FORM.QUESTIONS.map((question, indexOption) => 
            <StyledFlexCenter key={indexOption}>
              <h3>{question.QUESTION}</h3>
              {question.hasInput ? 
                <StyledFlexCenter key={indexOption} style={{padding: 0, margin: '5px', justifyContent:'flex-start', alignItems:'center'}} direction="row">
                  <TextField
                  
                  type={indexOption === 0 ? 'number' : 'text'}
                  valuie={residencia}
                  onChange={(e) => handleAnswers(indexOption, null, indexOption === 0 ? 'inputnumber' : 'input', e)}/>
                </StyledFlexCenter>
              : question?.POSSIBLE_ANSWERS.map((answerOption, indexSubOption) => 
              <StyledFlexCenter key={indexSubOption} style={{padding: 0, margin: '5px', justifyContent:'flex-start', alignItems:'center'}} direction="row">
              <input type='radio' style={{marginRight:'10px'}} checked={answers[indexOption].answer_selected === answerOption} onChange={() => handleAnswers(indexOption,indexSubOption)}/>
              <label onClick={() => handleAnswers(indexOption,indexSubOption)}> {answerOption} </label>
          </StyledFlexCenter>
              )}
            </StyledFlexCenter>
          )
        }
    <Button
      variant='contained'
      onClick={handleGoToSecondForm}
      disabled={buttonDisabled}
      style={{marginBottom: '2em'}}
    >
      {APP_DATA.APP_THIRD_FORM.BUTTON}
    </Button>
      {inputnumber === '' && <p style={{margin: 0, paddingBottom: '15px', color:'red'}}>Verifica la edad</p>}
    </StyledLayoutContent>
  

  </StyledAppLayout>
  )
}
