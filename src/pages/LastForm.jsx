import React, { useContext, useEffect, useState } from 'react'
import { StyledAppLayout, StyledFlexCenter, StyledLayoutContent } from '../styled-components/containers'
import { Button, Slider } from '@mui/material'
import { APP_DATA } from '../CONSTANTS'
import { useNavigate } from 'react-router-dom'
import UserContext from '../UserProvider/UserContext'
import { editUser } from '../firebase/firebase'

export default function LastForm() {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [answers, setAnswers] = useState(() => {
    let answerArray = []
    APP_DATA.APP_LAST_FORM_1.QUESTIONS.forEach(question => {
      answerArray.push({
        question: question.QUESTION,
        answer_selected: ''
      })
    })
    return answerArray;
  })
  const [radioButton2, setRadioButton2] = useState({
    radioSelected: '',
    answer_selected: ''
  })
  const [radioButton, setRadioButton] = useState({
    logo1: '',
    logo2: '',
    logo3: '',
    logo4: '',
    logo5: '',
    logo6: '',
    azul: '',
    verde: '',
    rojo: ''
  })
  const navigate = useNavigate()  
  const {userInfo, setUserInfo, loadingLogin, setLoadingLogin} = useContext(UserContext)


  useEffect(() => {
    if(!userInfo?.email) navigate('/')
    if(userInfo?.finalForm1.isCompleted) navigate('/final-form-2')
  }, [userInfo]);

  useEffect(() => {
    let isCompleted = false
    answers?.forEach((answer, index) => {
      if(answer.answer_selected === '') isCompleted = true
      if(radioButton.logo1 === "" || radioButton.logo2 === "" ||  radioButton.logo3 === "" ||  radioButton.logo4 === "" ||
        radioButton.logo5 === "" ||  radioButton.logo6 === "" || radioButton.rojo === "" ||  radioButton.verde === "" ||
        radioButton.azul === "") isCompleted = true
    })
    setButtonDisabled(isCompleted)
  }, [answers]);

  const handleAnswers = (type, index, e, indexSubOption) => {
    let answersCopy = [...answers]
    if(type === 'radio'){
      let radioButtonCopy = {...radioButton}
      radioButtonCopy = {
          ...radioButtonCopy,
           [indexSubOption === 0 ? 'logo1' 
            : indexSubOption === 1 ? 'rojo' 
            : indexSubOption === 2 ? 'logo2' 
            : indexSubOption === 3 ? 'verde' 
            : indexSubOption === 4 ? 'logo3' 
            : indexSubOption === 5 ? 'logo4'
            : indexSubOption === 6 ? 'logo5' 
            : indexSubOption === 7 ? 'azul' 
            : 'logo6']: e
      };
      setRadioButton(radioButtonCopy)
      answersCopy[index].answer_selected = JSON.stringify(radioButtonCopy);
    }else if(type === 'slider'){
        answersCopy[index].answer_selected = e.target.value;
    }else{
      let radioButton2Copy = {...radioButton2}
      if(type === 'radioslider'){
        radioButton2Copy = {
          ...radioButton2Copy,
          answer_selected: e.target.value
        }
      }else{
        radioButton2Copy = {
          ...radioButton2Copy,
          radioSelected: e
        }
      }
      setRadioButton2(radioButton2Copy)
      answersCopy[index].answer_selected = JSON.stringify(radioButton2Copy);
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
    userInfoCopy.finalForm1.isCompleted = true
    userInfoCopy.finalForm1.answers = [...answers]
    const userUpdated = await editUser(userInfoCopy.id, userInfoCopy)
    if(userUpdated){
      setUserInfo(userInfoCopy)
      navigate('/final-form-2')
    }else{
      alert("Error, try again")
    }
    setLoadingLogin(false)
  }
  

  return (
    <StyledAppLayout>
      <h1>{APP_DATA.APP_TITLE}</h1>

    <StyledLayoutContent>
      <h2>{APP_DATA.APP_LAST_FORM_1.TITLE}</h2>
      <p>{APP_DATA.APP_LAST_FORM_1.SUBTITLE}</p>
      <p>Valora según tu opinión. Si no tienes claro qué valoración dar, déjate llevar por la intuición.</p>
       
      {APP_DATA.APP_LAST_FORM_1.QUESTIONS.map((question, indexOption) => 
            <StyledFlexCenter key={indexOption}>
              <h3>{question.QUESTION}</h3>
              {indexOption === APP_DATA.APP_LAST_FORM_1.QUESTIONS.length - 1 ? 
                <StyledFlexCenter  style={{display:'grid', gridTemplateColumns: 'repeat(3,1fr)', gap:'10px', width: '100%', alignItems:'center', justifyContent:'center'}} direction={"row"}>
                  {question?.POSSIBLE_ANSWERS_IMAGES?.map((answerOption, indexSubOption) => 
                        <StyledFlexCenter key={indexSubOption} style={{width:'30%',flex:'grid', gridTemplateColumns: 'repeat(3, 1fr)',padding: 0, margin: '5px', justifyContent:'flex-start', alignItems:'center'}} direction="column">
                          <img  style={{width:'40px',}}src={question.POSSIBLE_ANSWERS_IMAGES[indexSubOption]}/>
                          <StyledFlexCenter direction="row" style={{alignItems:'center'}}>
                              <input type='radio' 
                                style={{marginRight:'10px'}} 
                                checked={
                                  radioButton[
                                    indexSubOption === 0 ? 'logo1' 
                                  : indexSubOption === 1 ? 'rojo' 
                                  : indexSubOption === 2 ? 'logo2' 
                                  : indexSubOption === 3 ? 'verde' 
                                  : indexSubOption === 4 ? 'logo3' 
                                  : indexSubOption === 5 ? 'logo4'
                                  : indexSubOption === 6 ? 'logo5' 
                                  : indexSubOption === 7 ? 'azul' 
                                  : 'logo6'] === 'si'}
                                   onChange={(e) => handleAnswers('radio',indexOption,'si', indexSubOption)}/>
                              <label onClick={(e) => handleAnswers('radio',indexOption, 'si')}> si </label>
                              <input type='radio' style={{marginRight:'10px'}} 
                              checked={
                                radioButton[
                                  indexSubOption === 0 ? 'logo1' 
                                : indexSubOption === 1 ? 'rojo' 
                                : indexSubOption === 2 ? 'logo2' 
                                : indexSubOption === 3 ? 'verde' 
                                : indexSubOption === 4 ? 'logo3' 
                                : indexSubOption === 5 ? 'logo4'
                                : indexSubOption === 6 ? 'logo5' 
                                : indexSubOption === 7 ? 'azul' 
                                : 'logo6'] === 'no'}
                              onChange={(e) => handleAnswers('radio',indexOption,'no', indexSubOption)}/>
                              <label onClick={(e) => handleAnswers('radio',indexOption, 'no')}> no </label>
                          </StyledFlexCenter>
                      </StyledFlexCenter>
                  )}
                </StyledFlexCenter>
              :
              question.hasScale && !question?.hasRadio ?
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
                <>
                 {question.POSSIBLE_ANSWERS.map((answerOption, indexSubOption) => 
                    <StyledFlexCenter key={indexSubOption} style={{padding: 0, margin: '5px', justifyContent:'flex-start', alignItems:'center'}} direction="row">
                        <input type='radio' style={{marginRight:'10px'}} checked={radioButton2.radioSelected === answerOption} onChange={() => handleAnswers('radioButton2',indexOption,answerOption)}/>
                        <label onClick={() => handleAnswers('radioButton2',indexOption,answerOption)}> {answerOption} </label>
                    </StyledFlexCenter>
                  )}
                  {radioButton2.radioSelected === 'Si' &&
                    <>
                      <h4>{question.QUESTION2}</h4>
                      <StyledFlexCenter style={{alignItems:'center'}}>
                          <Slider
                          aria-label="Custom marks"
                          defaultValue={5}
                          value={radioButton2.answer_selected}
                          onChange={e => handleAnswers('radioslider', indexOption, e)}
                          getAriaValueText={valuetext}
                          marks={getMarks(question?.scaleText)}
                          shiftStep={1}
                          min={1}
                          max={7} 
                          style={{ width: '700px' }} // Aquí ajustas el ancho del slider
                          />
                      </StyledFlexCenter>
                  </>
                }
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
      {APP_DATA.APP_LAST_FORM_1.BUTTON}
    </Button>
    </StyledLayoutContent>
  </StyledAppLayout>
  )
}
