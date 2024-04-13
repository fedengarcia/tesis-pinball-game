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
  const navigate = useNavigate()  
  const {userInfo, setUserInfo, loadingLogin, setLoadingLogin} = useContext(UserContext)


  useEffect(() => {
    if(userInfo?.finalForm1.isCompleted) navigate('/final-form-2')
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

  const handleAnswers = (type, index, e, indexSubOption) => {
    let answersCopy = [...answers]
    console.log(e?.target?.value ?? e);

    if(type === 'radio'){
        setRadioButton(e)
        answersCopy[index].answer_selected = e;
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
    }
    console.log(answersCopy);
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


  const handleSeeResults = async () => {
    setLoadingLogin(true)
    if(loadingLogin) return
    let userInfoCopy = {...userInfo}  
    userInfoCopy.finalForm1.isCompleted = true
    userInfoCopy.finalForm1.answers = [...answers]
    const userUpdated = await editUser(userInfoCopy.id, userInfoCopy)
    if(userUpdated){
      setUserInfo(userInfoCopy)
      navigate('/final-form2')
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
       
      {APP_DATA.APP_LAST_FORM_1.QUESTIONS.map((question, indexOption) => 
            <StyledFlexCenter key={indexOption}>
              <h3>{question.QUESTION}</h3>


              {question.hasRadio ? 
                <StyledFlexCenter  style={{justifyContent:'flex-start'}} direction={"row"}>
                    <>
                {question.POSSIBLE_ANSWERS.map((answerOption, indexSubOption) => 
                        <StyledFlexCenter key={indexSubOption} style={{width:'30%',padding: 0, margin: '5px', justifyContent:'flex-start', alignItems:'center'}} direction="row">
                        <img  style={{width:'40px',}}src={question.POSSIBLE_ANSWERS_IMAGES[indexSubOption]}/>
                        <input type='radio' style={{marginRight:'10px'}} checked={answers[indexOption].answer_selected === answerOption} onChange={(e) => handleAnswers('radio',indexOption,answerOption)}/>
                        <label onClick={(e) => handleAnswers('radio',indexOption, answerOption)}> {answerOption} </label>
                    </StyledFlexCenter>
                )}
                </>
                </StyledFlexCenter>
              :
              question.hasScale ?
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
                />
              :
                <></>
            
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
