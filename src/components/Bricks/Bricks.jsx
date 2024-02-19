import React, { useEffect, useState, useRef } from "react"
import { StyledGameInfoContainer, StyledRules, StyledTableGame } from "./StyledBricks"
import { APP_DATA } from "../../CONSTANTS"
import useSweetAlert from "../../hooks/useSweetAlert"
import { editUser } from "../../firebase/firebase"
import BricksClass from "./BricksClass"

// const {popUp, modal} = useSweetAlert()

class Bricks extends React.Component{
	canvasRef;
	canvas;
	context;
  canvasConfig = {
    width: 900,
    height: 750,
  }
  
	scaleRatio = {
		xRatio: 0,
		YRatio: 0
	};
  constructor(props){
    super(props)
    this.canvasRef = React.createRef()
    // {setPlayingGame, gameConfiguration, setGameResult, userInfo}){ 
    this.gameConfiguration = this.props.gameConfiguration

    this.renderCanvas = this.renderCanvas.bind(this);

    
		var minutes = "00"
		var seconds = "00"
		
		// If existe time : set timer
		if(this.gameConfiguration?.time){
			minutes = Math.floor(this.gameConfiguration?.time / 60);
			seconds = this.gameConfiguration?.time - minutes * 60;
		}

		this.state = {
			timer: {
				minutes: minutes === "00" ? "00" : `0${minutes}`,
				seconds: seconds === "00" ? "00" : seconds < 10 ? `0${seconds}` : seconds,
			},
			score: 0,
			lives: 2,
			elementsCatched: [],
			interactions: {},
			start: false,
			gameEnd: false
		};
  }

  startGame = () => {
		this.setState({ start: true });
		this.canvas = this.canvasRef.current;
		this.context = this.canvasRef.current.getContext("2d");

    
		if (this.context) {
			this.gameClass = new BricksClass(this.canvas, this.context, this.gameConfiguration, this.setLives, this.setElementsCatched, this.setScore, this.setInteractions, this.setGameEndResult);
			this.renderCanvas();
			this.initTimer();
		}
	};

	componentDidMount() {
		this.startGame();
	}

	initTimer() {
			this.intervalTimer = setInterval(() => {
				const { timer } = this.state;
				if (this.props?.gameConfiguration?.time) {
					if (parseInt(timer.minutes) !== 0 || parseInt(timer.seconds) !== 0) {
						var minutes = parseInt(timer.seconds) === 0 ? parseInt(timer.minutes) - 1 : parseInt(timer.minutes)
						var seconds = parseInt(timer.minutes) !== 0 && parseInt(timer.seconds) === 0 ? 59 : (parseInt(timer.seconds) - 1);

						if (seconds === 0 && minutes === 1) {
							minutes = 1
						}
						
						if(seconds === 0 && minutes === 0){
							this.setState({
								timer: {
									seconds: seconds,
									minutes: minutes
								}
							})
							this.gameEnd()
						}
					}
				} else {
					var seconds = (parseInt(timer.seconds) + 1) % 60;
					var minutes = seconds === 0 ? parseInt(timer.minutes) + 1 : parseInt(timer.minutes);
				}

				if (seconds < 10) seconds = "0" + seconds;
				if (minutes < 10) minutes = "0" + minutes;

				this.setState({
					timer: {
						seconds: seconds,
						minutes: minutes
					}
				});

			}, 1000);
	}


  renderCanvas() {
		if(this.state.gameEnd) return
		this.frameCount++;
		//this.clearCanvas(this.context);
		// check if time is over
		if(this.gameConfiguration.time){
			if(parseInt(this.state.timer.seconds) === 0 && parseInt(this.state.timer.minutes) === 0){
				return
			}
		}
		//Calculamos Xratio
		this.scaleRatio.xRatio = this.canvas?.width / this.canvasConfig.width;
		this.scaleRatio.yRatio = this.canvas?.width / this.canvasConfig.width;

		//We update the canvas
		this.gameClass.updateStatus(this.scaleRatio);

		//We draw the canvas
		this.gameClass.draw();

		//We call the main Canvas loop again
		this.animationFrameId = window.requestAnimationFrame(this.renderCanvas);
	}

	setLives = (lives) => {
		this.setState({lives: lives})
	}

	setElementsCatched = (elementsCatched) => {
		this.setState({elementsCatched: elementsCatched})
	}

	setScore = (score) => {
		this.setState({score: score})
	}

	setInteractions = (interactions) => {
		this.setState({interactions: interactions})
	}

  	setGameEndResult = (tableAssigned = [], timePlayed = 0) => {
		this.setState({ gameEnd: true });
		if (this.intervalTimer) clearInterval(this.intervalTimer);
		this.props.setGameResult({
			elementsCatched: this.elementsCatched,
			score: this.score,
			tableAssigned: tableAssigned,
			timePlayed: timePlayed,
			date: new Date()	
		});
	};



  render(){
    return(
      <StyledTableGame>
      <div className="gameCanvas">
        <canvas ref={this.canvasRef} id="canvas" width={this.canvasConfig.width} height={this.canvasConfig.height}></canvas>
      </div>
       <StyledGameInfoContainer>
            {this.gameConfiguration.time > 0 ? 
                <div className='timer'>
                    <>
                      <samp className='mitutes'>{this.state.timer.minutes}</samp>:<samp className='seconds'>{this.state.timer.seconds}</samp>
                    </>
                </div>
              : <></> 
            }
            <div className='lifes'>
              <p>{`${APP_DATA.APP_GAME.GAME_CONFIGURATION.lifesLabel} ${this.state.lives}`}</p>
            </div>
            <div className='points'>
              <p>{`${APP_DATA.APP_GAME.GAME_CONFIGURATION.pointsLabel} ${this.state.score}`}</p>
            </div>
          </StyledGameInfoContainer>
      </StyledTableGame>
    )
  }
   
}  
  


export default Bricks;

 