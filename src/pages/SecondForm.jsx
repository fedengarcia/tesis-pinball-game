import React, { useContext, useEffect, useState } from 'react'
import { StyledAppLayout, StyledFlexCenter, StyledLayoutContent } from '../styled-components/containers'
import { Button, Slider, TextField } from '@mui/material'
import { APP_DATA } from '../CONSTANTS'
import { useNavigate } from 'react-router-dom'
import UserContext from '../UserProvider/UserContext'
import { editUser } from '../firebase/firebase'

export default function SecondForm() {
  const navigate = useNavigate()  
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [answers, setAnswers] = useState(() => {
    let answerArray = []
    APP_DATA.APP_SECOND_FORM.QUESTIONS.forEach(question => {
      answerArray.push({
        question: question.QUESTION,
        answer_selected: ''
      })
    })
    return answerArray;
  })
  const [radioButton, setRadioButton] = useState({
    azul: '',
    rojo: '',
    verde: '',
  })
  const [inputAnswers, setInputAnswers] = useState({
    azul: '',
    rojo: '',
    verde: '',
  })
  const [sliderAnswers, setSlidersAnswers] = useState({
    azul: '',
    rojo: '',
    verde: '',
  })
  const {userInfo, setUserInfo, loadingLogin, setLoadingLogin} = useContext(UserContext)

  useEffect(() => {
    if(!userInfo?.email) navigate('/')
    if(userInfo?.secondForm?.isCompleted) navigate('/third-form')
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
    userInfoCopy.secondForm.isCompleted = true
    userInfoCopy.secondForm.answers = [...answers]
    const userUpdated = await editUser(userInfoCopy.id, userInfoCopy)
    if(userUpdated){
      setUserInfo(userInfoCopy)
      navigate('/second-form')
    }else{
      alert("Error, try again")
    }
    setLoadingLogin(false)
  }
  
  const handleAnswers = (type, index, e, indexSubOption) => {
    let answersCopy = [...answers]

    if(type === 'radio'){
        let radioButtonCopy = {...radioButton}
        radioButtonCopy = {
            ...radioButtonCopy,
            [indexSubOption === 0 ? 'azul' : indexSubOption === 1 ? 'rojo' : 'verde']: e
        };
        setRadioButton(radioButtonCopy)
        answersCopy[index].answer_selected = JSON.stringify(radioButtonCopy);
    }else if(type === 'slider'){
        answersCopy[index].answer_selected = e.target.value;
    }else if(type === 'input'){
        let inputAnswersCopy = {...inputAnswers}
        inputAnswersCopy = {
            ...inputAnswersCopy,
            [indexSubOption === 0 ? 'azul' : indexSubOption === 1 ? 'rojo' : 'verde']: e.target.value
        }
        setInputAnswers(inputAnswersCopy)
        answersCopy[index].answer_selected = JSON.stringify(inputAnswersCopy)
    }else if(type === 'multiple_slider'){
      let sliderAnswerCopy = {...sliderAnswers}
      sliderAnswerCopy = {
          ...sliderAnswerCopy,
          [indexSubOption === 0 ? 'azul' : indexSubOption === 1 ? 'rojo' : 'verde']: e.target.value
      }
      setSlidersAnswers(sliderAnswerCopy)
      answersCopy[index].answer_selected = JSON.stringify(sliderAnswerCopy)
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

  
  return (
  <StyledAppLayout>
    <h1>{APP_DATA.APP_TITLE}</h1>

    <StyledLayoutContent>
      <h2>{APP_DATA.APP_SECOND_FORM.TITLE}</h2>
      <p>{APP_DATA.APP_SECOND_FORM.SUBTITLE}</p>

          {APP_DATA.APP_SECOND_FORM.QUESTIONS.map((question, indexOption) => 
            <StyledFlexCenter key={indexOption}>
              <h3>{question.QUESTION}</h3>


              {indexOption === 0 ? 
                <StyledFlexCenter  style={{justifyContent:'flex-start'}} direction={"row"}>
                    <>
                {question.POSSIBLE_ANSWERS_IMAGES.map((answerOption, indexSubOption) => 
                        <StyledFlexCenter key={indexSubOption} style={{width:'30%',padding: 0, margin: '5px', justifyContent:'flex-start', alignItems:'center'}} direction="column">
                        <img  style={{width:'40px',}}src={question.POSSIBLE_ANSWERS_IMAGES[indexSubOption]}/>
                        <StyledFlexCenter direction="row" style={{alignItems:'center'}}>
                            <input type='radio' style={{marginRight:'10px'}} checked={radioButton[indexSubOption === 0 ? 'azul' : indexSubOption === 1 ? 'rojo' : 'verde'] === 'si'} onChange={(e) => handleAnswers('radio',indexOption,'si', indexSubOption)}/>
                            <label onClick={(e) => handleAnswers('radio',indexOption, 'si')}> si </label>
                            <input type='radio' style={{marginRight:'10px'}} checked={radioButton[indexSubOption === 0 ? 'azul' : indexSubOption === 1 ? 'rojo' : 'verde'] === 'no'} onChange={(e) => handleAnswers('radio',indexOption,'no', indexSubOption)}/>
                            <label onClick={(e) => handleAnswers('radio',indexOption, 'no')}> no </label>
                        </StyledFlexCenter>
                    </StyledFlexCenter>
                )}
                </>
                </StyledFlexCenter>
              :indexOption === 1 ? 
                <>
                  {question.POSSIBLE_ANSWERS_IMAGES.map((answerOption, indexSubOption) => 
                          <StyledFlexCenter key={indexSubOption} style={{padding: 0, margin: '5px', justifyContent:'flex-start', alignItems:'center'}} direction="column">
                          <img  style={{width:'40px',}}src={question.POSSIBLE_ANSWERS_IMAGES[indexSubOption]}/>
                          <StyledFlexCenter style={{alignItems:'center'}}>
                            <Slider
                            aria-label="Custom marks"
                            defaultValue={5}
                            value={parseInt(sliderAnswers[indexSubOption === 0 ? 'azul' : indexSubOption === 1 ? 'rojo' : 'verde'])}
                            onChange={e => handleAnswers('multiple_slider',indexOption,e, indexSubOption)}
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

              : question.hasScale ?
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
              :
              question.POSSIBLE_ANSWERS.map((answerOption, indexSubOption) => 
              <StyledFlexCenter key={indexSubOption} style={{padding: 0, margin: '5px', justifyContent:'flex-start', alignItems:'center'}} direction="column">
                    <img  style={{width:'40px', margin: '20px'}}src={question.POSSIBLE_ANSWERS_IMAGES[indexSubOption]}/>
                    <TextField 
                    fullWidth
                    onChange={(e) => handleAnswers('input',indexOption,e, indexSubOption)}
                     value={inputAnswers[indexSubOption === 0 ? 'azul' : indexSubOption === 1 ? 'rojo' : 'verde']}/>
              </StyledFlexCenter>
            )
            }
            </StyledFlexCenter>
          )}

    <Button
      variant='contained'
      onClick={handleGoToSecondForm}
      disabled={buttonDisabled}
      style={{marginBottom: '2em'}}
    >
      {APP_DATA.APP_SECOND_FORM.BUTTON}
    </Button>
    </StyledLayoutContent>


  </StyledAppLayout>
  )
}
