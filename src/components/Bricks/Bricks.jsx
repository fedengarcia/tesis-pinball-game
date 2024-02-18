import React, { useEffect, useState, useRef } from "react"
import { StyledGameInfoContainer, StyledRules, StyledTableGame } from "./StyledBricks"
import { APP_DATA } from "../../CONSTANTS"
import useSweetAlert from "../../hooks/useSweetAlert"

const paddleFunction = ()=>{
  const canvas = document.getElementById('canvas')
  return(
      {
          x: canvas.width / 2 - 40,
          y: canvas.height - 20,
          w: 130,
          h: 20,
          speed: 8,
          dx: 0,
          visible: true    
      }
  )
}

const ballFunction = ()=>{
  const canvas = document.getElementById('canvas')
  return(
      {
          x: canvas.width / 2,
          y: canvas.height / 2,
          size: 10,
          speed: 4,
          dx: 4,
          dy: -4,
          visible: true            
      }
  )
}

const brickInfoFunction = ()=>{
  return(
      {
          w: 80,
          h: 20,
          padding: 12,
          offsetX: 40,
          offsetY: 80,
          visible: true
      }
  )
}


export default function Bricks({setPlayingGame, gameConfiguration, setGameResult}){  
  const {popUp} = useSweetAlert()
  const brickRowCount = 9;
  const brickColumnCount = 5;
  const delay = 500; //delay to reset the game

  const [canvas,setCanvas]=useState("")
  const [canvasContext,setCanvasContext]=useState("")
  
  const [ball,setBall]=useState({})
  const [paddle,setPaddle]=useState({})
  const [brickInfo,setBrickInfo]=useState({})
  const [elementsToFall, setElementsToFall] = useState([]);
  const elementsToFallRef = useRef(elementsToFall);

  const [lives, setLives] = useState(2);
  const [paddleWidth, setPaddleWidth] = useState(paddle.w);

  // Timer
  const [timer, setTimer] = useState({ minutes: "00", seconds: "00" });
  const initialTime = APP_DATA.APP_GAME.GAME_CONFIGURATION.time;
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  const [points, setPoints] = useState(0)
  const [bricks,setBricks]=useState([])


  useEffect(() => {
    setPaddleWidth(paddle.w)
  }, [paddle])

  // Brands falling
  useEffect(() => {
    elementsToFallRef.current = elementsToFall;
  }, [elementsToFall]);

  // Time
  useEffect(() => {
    
    const intervalId = setInterval(() => {
      const minutes = Math.floor(timeRemaining / 60);
      const seconds = timeRemaining % 60;

      setTimer({
        minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
        seconds: seconds < 10 ? `0${seconds}` : `${seconds}`
      });

      if (timeRemaining === 0) {
        clearInterval(intervalId);
        // Aquí puedes realizar alguna acción cuando el temporizador llega a 0
      } else {
        setTimeRemaining(prevTime => prevTime - 1);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta
    };
  }, [timeRemaining]);



  useEffect(() => {
    if(canvas===""){
      setCanvas(document.getElementById('canvas'))
      setCanvasContext(document.getElementById('canvas').getContext("2d"))
    }else{
      setBall(
        ballFunction()
      )
      setPaddle(
        paddleFunction()
      )
      setBrickInfo(
        brickInfoFunction()
      )
    }
  }, [canvas]);

  useEffect(() => {
    if(brickInfo.visible!==undefined){
      let newArray=[]
      for (let i = 0; i < brickRowCount; i++) {
        newArray[i] = [];
        for (let j = 0; j < brickColumnCount; j++) {
          const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
          const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
          let element = null;
          const randomElement = Math.random() * 100;
          if (randomElement < 33) element = gameConfiguration.tables[0];
          else if (randomElement < 66) element =  gameConfiguration.tables[1];
          else element = gameConfiguration.tables[2];
          newArray[i][j] = { x, y, element, ...brickInfo };
        }
      }
      setBricks(newArray)
    }

  }, [brickInfo]);

  useEffect(() => {
    if(bricks.length!==0){
        update();
    }
  }, [bricks]);

  function update() {
    movePaddle();
    moveBall();
    updateElementsToFall();
    draw();
  
    requestAnimationFrame(update);
  }

// Draw ball on canvas
  function drawBall() {
    canvasContext.beginPath();
    canvasContext.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    canvasContext.fillStyle = ball.visible ? '#0095dd' : 'transparent';
    canvasContext.fill();
    canvasContext.closePath();
  }

  // Draw paddle on canvas
  function drawPaddle() {
    canvasContext.beginPath();
    canvasContext.rect(paddle.x, paddle.y, paddleWidth, paddle.h);
    canvasContext.fillStyle = paddle.visible ? '#0095dd' : 'transparent';
    canvasContext.fill();
    canvasContext.closePath();
  }

  // Draw bricks on canvas
  function drawBricks() {
    bricks.forEach(column => {
      column.forEach(brick => {
        canvasContext.beginPath();
        canvasContext.rect(brick.x, brick.y, brick.w, brick.h);
        canvasContext.fillStyle = brick.visible ? '#0095dd' : 'transparent';
        canvasContext.fill();
        canvasContext.closePath();
      });
    });
  }

  // Move paddle on canvas
  function movePaddle() {
    paddle.x += paddle.dx;

    // Wall detection
    if (paddle.x + paddle.w > canvas.width) {
      paddle.x = canvas.width - paddle.w;
    }

    if (paddle.x < 0) {
      paddle.x = 0;
      }
  }

  // Move ball on canvas
  function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
    if (ball.y + ball.size > canvas.height) {
      setLives(lives => {
        if (lives - 1 > 0) {
          // Restablecer la posición de la pelota y el paddle
          resetBallAndPaddle();
          return lives - 1;
        } else {
          // El jugador ha perdido todas sus vidas, manejar el fin del juego
          handleGameOver();
          return 0;
        }
      });
    }

    // Wall collision (right/left)
    if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
      ball.dx *= -1; // ball.dx = ball.dx * -1
    }

    // Wall collision (top/bottom)
    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
      ball.dy *= -1;
    }

    // Paddle collision
    if (
      ball.x - ball.size > paddle.x &&
      ball.x + ball.size < paddle.x + paddle.w &&
      ball.y + ball.size > paddle.y
    ) {
      ball.dy = -ball.speed;
    }

    // Brick collision
    bricks.forEach((column, columnIndex) => {
      column.forEach((brick, brickIndex) => {
        if (brick.visible) {
          if (
            ball.x - ball.size > brick.x && 
            ball.x + ball.size < brick.x + brick.w &&
            ball.y + ball.size > brick.y &&
            ball.y - ball.size < brick.y + brick.h
          ) {
            ball.dy *= -1;

            if (brick.element && brick.visible) {
              setElementsToFall(elementsToFall => {
                return [...elementsToFall, { x: brick.x, y: brick.y, vy: 2, element: brick.element, w: brick.w, h: brick.h }];
              });
              brick.visible = false;
            }
            increaseScore();
          }
        }
      });
    });


    // Hit bottom wall - Lose
    if (ball.y + ball.size > canvas.height) {
        showAllBricks();
        setPoints(0)
    }
  }

  function resetBallAndPaddle() {
    // Restablece la posición del paddle y la pelota al centro o a una posición inicial
    // Ejemplo:
    paddle.x = canvas.width / 2 - paddleWidth / 2; // Asegúrate de que paddleWidth esté actualizado
    paddle.y = canvas.height - 20; // O donde sea que inicialmente coloques el paddle
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = 2; // O los valores iniciales que tengas para dx y dy
    ball.dy = -2;
  }

  function handleGameOver() {
    console.log("Game Over");
    // alert('game over')
  }

  // Increase score
  function increaseScore() {
    setPoints(prevPoints => prevPoints + 1)
    // if (points % (brickRowCount * brickColumnCount) === 0 || points===45) {
    //   if(points===45){
    //     alert("GANASTE!! \n PREMIO: Un besito :3")
    //   }
    //   ball.visible = false;
    //   paddle.visible = false;

    //   //After 0.5 sec restart the game
    //   setTimeout(function () {
    //       showAllBricks();
    //       // score=0
    //       paddle.x = canvas.width / 2 - 40;
    //       paddle.y = canvas.height - 20;
    //       ball.x = canvas.width / 2;
    //       ball.y = canvas.height / 2;
    //       ball.visible = true;
    //       paddle.visible = true;
    //   },delay)
    // }
  }

  // Make all bricks appear
  function showAllBricks() {
    bricks.forEach(column => {
      column.forEach(brick => (brick.visible = true));
    });
  }

  function drawElementsToFall() {
    elementsToFallRef.current.forEach(elementToFall => {
      const elementImage = new Image();
      elementImage.src = elementToFall.element.src
      canvasContext.drawImage(elementImage, elementToFall.x, elementToFall.y, 70, 70);
    });
  }

  
  function updateElementsToFall() {
    setElementsToFall(elementsToFall => elementsToFall.filter(elementToFall => {
      // console.log(elementToFall)
      elementToFall.y += elementToFall.vy;
      // console.log(elementToFall.element)
      // Colisión con el paddle
      if (
        elementToFall.x < paddle.x + paddle.w &&
        elementToFall.x + elementToFall.w > paddle.x &&
        elementToFall.y < paddle.y + paddle.h &&
        elementToFall.y + elementToFall.h > paddle.y
      ) {
        if (elementToFall.element.bonification === "premio") {
          popUp({message: `+ ${points+2} PUNTOS EXTRA`})
          setPoints(prevPoints => prevPoints + 2)
        } else if (elementToFall.element.bonification === "mediadora") {
          popUp({message: `+ ${prevLives + 1} VIDA EXTRA`})
          setLives(prevLives => prevLives + 1);
        } else if (elementToFall.element.bonification === "nula") {
          popUp({message: `PADDLE MAS GRANDE !`})
          setPaddleWidth(prevWidth => prevWidth + 20);
        }
        return false; 
      }
  
      if (elementToFall.y > canvas.height) {
        return false;
      }
  
      return true;
    }));
  }
  
  // Draw everything
  function draw() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    
    drawElementsToFall();
    drawBall();
    drawPaddle();
    drawBricks();
  }

  // Keydown event
  function keyDown(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      paddle.dx = paddle.speed;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      paddle.dx = -paddle.speed;
    }
  }

  // Keyup event
  function keyUp(e) {
    if (
      e.key === 'Right' ||
      e.key === 'ArrowRight' ||
      e.key === 'Left' ||
      e.key === 'ArrowLeft'
    ) {
      paddle.dx = 0;
    }
  }

  // Keyboard event handlers
  document.addEventListener('keydown', keyDown);
  document.addEventListener('keyup', keyUp);

  return(
    <StyledTableGame>
    <div className="gameCanvas">
      <canvas id="canvas" width="900" height="750"></canvas>
    </div>
     <StyledGameInfoContainer>
					{initialTime > 0 ? 
							<div className='timer'>
									<>
										<samp className='mitutes'>{timer.minutes}</samp>:<samp className='seconds'>{timer.seconds}</samp>
									</>
							</div>
						: <></> 
					}
					<div className='lifes'>
            <p>{`${APP_DATA.APP_GAME.GAME_CONFIGURATION.lifesLabel} ${lives}`}</p>
					</div>
					<div className='points'>
            <p>{`${APP_DATA.APP_GAME.GAME_CONFIGURATION.pointsLabel} ${points}`}</p>
					</div>
				</StyledGameInfoContainer>
    </StyledTableGame>
  )}


 