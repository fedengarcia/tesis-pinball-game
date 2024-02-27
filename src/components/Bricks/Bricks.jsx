import React, { useEffect, useState, useRef } from "react"
import { StyledGameInfoContainer, StyledRules, StyledTableGame } from "./StyledBricks"
import { APP_DATA } from "../../CONSTANTS"
import BricksClass from "./BricksClass"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartBroken, faHeart} from "@fortawesome/free-solid-svg-icons";

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
	this.saveGameResults = this.props.saveGameResults
    this.gameConfiguration = this.props.gameConfiguration
	this.showBonification = this.props.showBonification
	this.endGameModal = this.props.endGameModal

    this.renderCanvas = this.renderCanvas.bind(this);

    

		this.state = {
			timer: 0,
			score: 0,
			lives: [faHeart, faHeart, faHeart],
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
			this.gameClass = new BricksClass(
				this.canvas,
				this.context,
				this.gameConfiguration,
				this.setLives,
				this.setElementsCatched,
				this.setScore,
				this.setInteractions,
				this.setGameEndResult,
				this.showBonification,
				this.endGameModal,
				this.saveGameResults,
				this.getTimePlayed,
			);
			this.renderCanvas();
			this.initTimer();
		}
	};

	componentDidMount() {
		this.startGame();
	}

	initTimer() {
		this.intervalTimer = setInterval(() => {
			this.setState({timer: this.state.timer + 1})
		}, 1000);
	}


  renderCanvas() {
		if(this.state.gameEnd) return
		this.frameCount++;
		
		//Calculamos Xratio
		this.scaleRatio.xRatio = this.canvas?.width / this.canvasConfig.width;
		this.scaleRatio.yRatio = this.canvas?.width / this.canvasConfig.width;

		//We update the canvas
		this.gameClass.updateStatus(this.scaleRatio, this.state.timer);

		//We draw the canvas
		this.gameClass.draw();

		//We call the main Canvas loop again
		this.animationFrameId = window.requestAnimationFrame(this.renderCanvas);
	
	}

	setLives = (position) => {
		let livesCopy = this.state.lives
		livesCopy[position] = faHeartBroken
		this.setState({lives: livesCopy})
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

  	setTimePlayed = () => {
		var minutes = "00";
		var seconds = "00";
		
		// If existe time : set timer
		if(this.state.timer){
			minutes = Math.floor(this.state.timer / 60);
			seconds = this.state.timer - minutes * 60;
		}

		minutes = minutes === "00" ? "00" : minutes < 10 ? `0${minutes}` : minutes;
		seconds = seconds === "00" ? "00" : seconds < 10 ? `0${seconds}` : seconds;

		return `${minutes}:${seconds}`
	}

	getTimePlayed = () => {
		return this.state.timer
	}
	
	setGameEndResult = () => {
		if (this.intervalTimer) clearInterval(this.intervalTimer);
		this.props.setGameResult({
			interactions: this.state.interactions,
			score: this.state.score,
			timePlayed: this.setTimePlayed(),
			date: new Date()	
		});
		this.setState({ gameEnd: true });
	};

	


  render(){
    return(
      <StyledTableGame>
      <div className="gameCanvas">
        <canvas ref={this.canvasRef} id="canvas" width={this.canvasConfig.width} height={this.canvasConfig.height}></canvas>
      </div>
       <StyledGameInfoContainer>        
            <div className='lifes'>
              	<label>{`${APP_DATA.APP_GAME.GAME_CONFIGURATION.lifesLabel} `}</label>
				{this.state.lives.map((liveType, key) => <FontAwesomeIcon key={key} style={{marginRight: '5px', color: liveType === faHeartBroken ? '#645f5f' :'#ff0000'}} icon={liveType} size="1x"/>)}				


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

 