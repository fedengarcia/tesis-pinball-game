import React, { useContext, useEffect, useState } from 'react'
import { StyledAppLayout, StyledFlexCenter, StyledLayoutContent } from '../styled-components/containers'
import { Button, Slider, TextField } from '@mui/material'
import { APP_DATA } from '../CONSTANTS'
import { useNavigate } from 'react-router-dom'
import UserContext from '../UserProvider/UserContext'
import { editUser } from '../firebase/firebase'

export default function LastForm2() {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [answers, setAnswers] = useState(() => {
    let answerArray = []
    APP_DATA.APP_LAST_FORM_2.QUESTIONS.forEach(question => {
      answerArray.push({
        question: question.QUESTION,
        answer_selected: ''
      })
    })
    return answerArray;
  })
  const navigate = useNavigate()  
  const {userInfo, setUserInfo, loadingLogin, setLoadingLogin} = useContext(UserContext)
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if(!userInfo?.email) navigate('/')
    if(userInfo?.finalForm2.isCompleted) navigate('/end')
  }, [userInfo]);

  useEffect(() => {
    let isCompleted = false
    answers?.forEach((answer, index) => {
      if(answer.answer_selected === ''){
        isCompleted = true
      }
    })
    setButtonDisabled(isCompleted)
  }, [answers]);

  const handleAnswers = (type, index, e, indexSubOption) => {
    let answersCopy = [...answers]
    if(type === 'input'){
      setInputValue(e.target.value)
      answersCopy[index].answer_selected = e.target.value
    }else if(type === 'slider'){
        answersCopy[index].answer_selected = e.target.value;
    }
    setAnswers(answersCopy)
}
  

  const getMarks = (scaleText) => {
    return  [
        {
          value: 1,
          label: scaleText[0],
        },
        {
          value: 2,
          label: '2',
        },
        {
          value: 3,
          label: '3',
        },
        {
          value: 4,
          label: '4',
        },
        {
          value: 5,
          label: '5',
        },
        {
          value: 6,
          label: '6',
        },
        {
          value: 7,
          label: scaleText[1],
        },
      ];
  }
  
  function valuetext(value) {
    return `${value}`;
  }


  const handleGoToFinalForm2 = async () => {
    setLoadingLogin(true)
    if(loadingLogin) return
    let userInfoCopy = {...userInfo}  
    userInfoCopy.finalForm2.isCompleted = true
    userInfoCopy.finalForm2.answers = [...answers]
    const userUpdated = await editUser(userInfoCopy.id, userInfoCopy)
    if(userUpdated){
      setUserInfo(userInfoCopy)
      navigate('/end')
    }else{
      alert("Error, try again")
    }
    setLoadingLogin(false)
  }
  
  return (
    <StyledAppLayout>
      <h1>{APP_DATA.APP_TITLE}</h1>

    <StyledLayoutContent>
      <h2>{APP_DATA.APP_LAST_FORM_2.TITLE}</h2>
      <p>{APP_DATA.APP_LAST_FORM_2.SUBTITLE}</p>
      <p>Valora según tu opinión. Si no tienes claro qué valoración dar, déjate llevar por la intuición.</p>
       
      {APP_DATA.APP_LAST_FORM_2.QUESTIONS.map((question, indexOption) => 
            <StyledFlexCenter key={indexOption}>
              <h3>{question.QUESTION}</h3>
              <StyledFlexCenter style={{alignItems:'center'}}>
                    <Slider
                    aria-label="Custom marks"
                    defaultValue={5}
                    value={parseInt(answers[indexOption].answer_selected)}
                    onChange={e => handleAnswers('slider', indexOption, e)}
                    getAriaValueText={valuetext}
                    marks={getMarks(question?.scaleText)}
                    shiftStep={1}
                    min={1}
                    max={7} 
                    style={{ width: '700px' }} // Aquí ajustas el ancho del slider
                    />
                </StyledFlexCenter>
            </StyledFlexCenter>
          )}

    <Button
      variant='contained'
      onClick={handleGoToFinalForm2}
      disabled={buttonDisabled}
      style={{marginBottom: '2em'}}
    >
      {APP_DATA.APP_LAST_FORM_2.BUTTON}
    </Button>
    </StyledLayoutContent>
  </StyledAppLayout>
  )
}
