import React, { useContext, useEffect, useState } from 'react'
import { StyledAppLayout, StyledFlexCenter, StyledLayoutContent } from '../styled-components/containers'
import { Button } from '@mui/material'
import { APP_DATA } from '../CONSTANTS'
import { useNavigate } from 'react-router-dom'
import UserContext from '../UserProvider/UserContext'
import { editUser } from '../firebase/firebase'

export default function FirstForm() {
  const navigate = useNavigate()  
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [firstTime, setFirstime] = useState(true)
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
  const {userInfo, setUserInfo, loadingLogin, setLoadingLogin} = useContext(UserContext)

  useEffect(() => {
    if(!userInfo?.email) navigate('/')
    if(userInfo?.firstForm?.isCompleted) navigate('/second-form')
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
    userInfoCopy.firstForm.isCompleted = true
    userInfoCopy.firstForm.answers = [...answers]
    const userUpdated = await editUser(userInfoCopy.id, userInfoCopy)
    if(userUpdated){
      setUserInfo(userInfoCopy)
      navigate('/second-form')
    }else{
      alert("Error, try again")
    }
    setLoadingLogin(false)
  }
  
  const handleAnswers = (index, subIndex) => {
    let answersCopy = [...answers]
    answersCopy[index].answer_selected = APP_DATA.APP_FIRST_FORM.QUESTIONS[index].POSSIBLE_ANSWERS[subIndex];
    setAnswers(answersCopy)
  }

  return (
  <StyledAppLayout>
    <h1>{APP_DATA.APP_TITLE}</h1>

    {firstTime ? 
    <StyledLayoutContent>
        <h2>INSTRUCCIONES</h2>
        <p>Usa las teclas de flechas de dirección para mover la “raqueta”. Tienes que mover la raqueta para golpear la bola y romper cuantos más ladrillos puedas. Cada ladrillo te da puntos. El objetivo es que consigas la máxima puntuación. Algunos de los ladrillos se transforman en marcas y esas marcas te dan muchos puntos o alargan la raqueta, lo que permite golpear la pelota con más facilidad.</p>
        <p>Tienes tres vidas en cada partida. Las vidas se pierden cuando no se golpea la bola o cuando los ladrillos bajan tanto que tocan la “raqueta”. Tienes que jugar como mínimo tres partidas pero puedes jugar un máximo de cinco partidas, si lo deseas. Los puntos de cada partida se guardan. No juegues más de dos partidas en el mismo día.
</p>
        <p>El jugador o la jugadora que gane más puntos obtendrá una tarjeta de Amazon por valor de 30€. También se sorteará una tarjeta de 30€ de Amazon entre todas aquellas personas que hayan jugado las cinco partidas. Se eliminarán del sorteo los jugadores que se dejen perder o hagan trampas.
</p>
        <p>También hay que contestar a dos cuestionarios, uno antes de la primera partida y otro al finalizar la última.
</p>
        <p>Vamos allá, comenzamos con el primer cuestionario antes de jugar. </p>

        <Button
          variant='contained'
          onClick={() => setFirstime(false)}
          style={{marginBottom: '2em'}}
        >
          PRIMER CUESTIONARIO
        </Button>
    </StyledLayoutContent>  
  :


    <StyledLayoutContent>
      <h2>{APP_DATA.APP_FIRST_FORM.TITLE}</h2>
      <p>{APP_DATA.APP_FIRST_FORM.SUBTITLE}</p>
        {APP_DATA.APP_FIRST_FORM.QUESTIONS.length > 0 
        ? 
          APP_DATA.APP_FIRST_FORM.QUESTIONS.map((question, indexOption) => 
            <StyledFlexCenter key={indexOption}>
              <h3>{question.QUESTION}</h3>
              {question?.imgsrc && <div style={{margin: '0 auto'}}>
                <img src={question.imgsrc}/>
              </div>}
              {question.POSSIBLE_ANSWERS.map((answerOption, indexSubOption) => 
                <StyledFlexCenter key={indexSubOption} style={{padding: 0, margin: '5px', justifyContent:'flex-start', alignItems:'center'}} direction="row">
                    <input type='radio' style={{marginRight:'10px'}} checked={answers[indexOption].answer_selected === answerOption} onChange={() => handleAnswers(indexOption,indexSubOption)}/>
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
      onClick={handleGoToSecondForm}
      disabled={buttonDisabled}
      style={{marginBottom: '2em'}}
    >
      {APP_DATA.APP_FIRST_FORM.BUTTON}
    </Button>
    </StyledLayoutContent>
  }

  </StyledAppLayout>
  )
}
