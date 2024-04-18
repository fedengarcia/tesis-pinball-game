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
  const sliderAnswerTemplate = {
    azul: '',
    verde: '',
    rojo: ''
  }
  const [slidersAnswers,setSlidersAnswers] = useState({
    "slider0": sliderAnswerTemplate,
    "slider1": sliderAnswerTemplate,
    "slider3": sliderAnswerTemplate,
    "slider4": sliderAnswerTemplate,
    "slider5": sliderAnswerTemplate
  })


  const navigate = useNavigate()  
  const {userInfo, setUserInfo, loadingLogin, setLoadingLogin} = useContext(UserContext)
  const [inputAnswers, setInputAnswers] = useState({
    azul: '',
    rojo: '' ,
    verde: ''
  })

  useEffect(() => {
    if(!userInfo?.email) navigate('/')
    if(userInfo?.finalForm2.isCompleted) navigate('/end')
  }, [userInfo]);

  useEffect(() => {
    let isCompleted = false
    answers?.forEach((answer, index) => {
      if(answer.answer_selected === '') isCompleted = true
      if(inputAnswers.azul === '' || inputAnswers.verde === '' || inputAnswers.rojo === '') isCompleted = true
      if(slidersAnswers.slider0.azul === '' || slidersAnswers.slider0.verde === '' || slidersAnswers.slider0.rojo === ''
        || slidersAnswers.slider1.azul === '' || slidersAnswers.slider1.verde === '' || slidersAnswers.slider1.rojo === ''
        || slidersAnswers.slider3.azul === '' || slidersAnswers.slider3.verde === '' || slidersAnswers.slider3.rojo === ''
        || slidersAnswers.slider4.azul === '' || slidersAnswers.slider4.verde === '' || slidersAnswers.slider4.rojo === ''
        || slidersAnswers.slider5.azul === '' || slidersAnswers.slider5.verde === '' || slidersAnswers.slider5.rojo === '') isCompleted = true
      
    })
    setButtonDisabled(isCompleted)
  }, [answers]);

  const handleAnswers = (type, index, e, indexSubOption) => {
    let answersCopy = [...answers]
    if(type === 'input'){
      let inputAnswersCopy = {...inputAnswers}
      inputAnswersCopy = {
          ...inputAnswersCopy,
          [indexSubOption === 0 ? 'azul' : indexSubOption === 1 ? 'rojo' : 'verde']: e.target.value
      }
      setInputAnswers(inputAnswersCopy)
      answersCopy[index].answer_selected = JSON.stringify(inputAnswersCopy)
    }else if(type === 'slider'){
        let slidersAnswersCopy = {...slidersAnswers}
        slidersAnswersCopy = {
            ...slidersAnswersCopy,
            [`slider${index}`]: {
              ...slidersAnswersCopy[`slider${index}`],
              [indexSubOption === 0 ? 'azul' : indexSubOption === 1 ? 'rojo' : 'verde']: e.target.value
            }
        }
        setSlidersAnswers(slidersAnswersCopy)
        answersCopy[index].answer_selected = JSON.stringify(slidersAnswersCopy[`slider${index}`])
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
              {
                question.hasInput ? 
                <>
                    {question.POSSIBLE_ANSWERS.map((answerOption, indexSubOption) => 
                      <StyledFlexCenter key={indexSubOption} style={{padding: 0, margin: '5px', justifyContent:'flex-start', alignItems:'center'}} direction="column">
                            <img  style={{width:'40px', margin: '20px'}}src={question.POSSIBLE_ANSWERS_IMAGES[indexSubOption]}/>
                            <TextField 
                            fullWidth
                            onChange={(e) => handleAnswers('input',indexOption,e, indexSubOption)}
                            value={inputAnswers[indexSubOption === 0 ? 'azul' : indexSubOption === 1 ? 'rojo' : 'verde']}/>
                      </StyledFlexCenter>
                    )}
                </>
                :
                <>
                  {question.POSSIBLE_ANSWERS_IMAGES.map((answerOption, indexSubOption) => 
                      <StyledFlexCenter key={indexSubOption} style={{padding: 0, margin: '5px', justifyContent:'flex-start', alignItems:'center'}} direction="column">
                      <img  style={{width:'40px',}}src={question.POSSIBLE_ANSWERS_IMAGES[indexSubOption]}/>
                      <StyledFlexCenter style={{alignItems:'center'}}>
                        <Slider
                        aria-label="Custom marks"
                        defaultValue={5}
                        value={slidersAnswers[`slider${indexOption}`][indexSubOption === 0 ? 'azul' : indexSubOption === 1 ? 'rojo' : 'verde']}
                        onChange={e => handleAnswers('slider',indexOption,e, indexSubOption)}
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
                
                </>
              }
             
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
