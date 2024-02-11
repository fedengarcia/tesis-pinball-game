import React from "react";
import WordCatcherClass from "./WordCatcherClass";
import { StyledGameInfoContainer, StyledRules, StyledWordCatcherTableGame } from "./WordCatcherStyles";


class WordCatcher extends React.Component {
	canvasRef;
	canvas;
	context;
	animationFrameId;
	frameCount = 0;

	scaleRatio = {
		xRatio: 0,
		YRatio: 0
	};

	config;

	gameClass = null;

	//Mouse variables
	mouse = {
		x: 0,
		y: 0,
		click: false,
		enter: false
	};

	intervalTimer = null;

	constructor(props) {
		super(props);
		console.log(props)
		this.canvasRef = React.createRef();

		this.config = {
			width: 1000,
			height: 900,
		};

		this.renderCanvas = this.renderCanvas.bind(this);


		// CONFIG TIMER
		var minutes = "00"
		var seconds = "00"
		
		// If existe time : set timer
		if(props.config.time){
			minutes = Math.floor(props.config.time / 60);
			seconds = props.config.time - minutes * 60;
		}

		this.state = {
			timer: {
				minutes: minutes === "00" ? "00" : `0${minutes}`,
				seconds: seconds === "00" ? "00" : seconds < 10 ? `0${seconds}` : seconds,
			},
			points: 0,
			start: false,
			gameEnd: false
		};
	}

	startGame = () => {
		this.setState({ start: true });
		this.canvas = this.canvasRef.current;
		this.context = this.canvasRef.current.getContext("2d");

		let elementsToDrop = this.setBonifications(this.props.config.elementsToDrop,this.props.config.bonifications)
		let elements = {
			damageElements: this.props.config.damageElements,
			elementsToCatch: elementsToDrop
		}
		this.elements = elements
		if (this.context) {
			this.gameClass = new WordCatcherClass(this.context, this.config, elements, this.gameEnd, this.toHuntWord);
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
			if (this.props.config.time) {
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
			if(seconds && seconds){
				this.setState({
					timer: {
						seconds: seconds,
						minutes: minutes
					}
				});
			}

		}, 1000);
	}

	renderCanvas() {
		this.frameCount++;
		//this.clearCanvas(this.context);

		// check if time is over
		if(this.props.config.time){
			if(parseInt(this.state.timer.seconds) === 0 && parseInt(this.state.timer.minutes) === 0){
				return
			}
		}
		//Calculamos Xratio
		this.scaleRatio.xRatio = this.canvas.width / this.config.width;
		this.scaleRatio.yRatio = this.canvas.width / this.config.width;

		//We update the canvas
		this.gameClass.updateStatus(this.mouse, this.scaleRatio);

		//We draw the canvas
		this.gameClass.draw();

		//We call the main Canvas loop again
		this.animationFrameId = window.requestAnimationFrame(this.renderCanvas);
	}

	toHuntWord = (points) => {
		this.setState({
			points: points
		})
	};

	handleMouseDown = (event) => {
		event.preventDefault();
		this.mouse.click = true;
	};

	handleMouseUp = () => {
		this.mouse.click = false;
	};

	handleMouseMove = (event) => {
		const rect = this.canvas.getBoundingClientRect();

		const x = ((event.clientX - rect.left) / rect.width) * this.config.width;
		const y = ((event.clientY - rect.top) / rect.height) * this.config.height;

		this.mouse.x = x;
		this.mouse.y = y;
	};

	gameEnd = () => {
		this.setState({ gameEnd: true });
		if (this.intervalTimer) clearInterval(this.intervalTimer);
		this.props.setGameResult({
			points: this.state.points
		})
	};

	mouseOnEnter = () => {
		this.mouse.enter = true;
	};

	mouseOnLeave = () => {
		this.mouse.enter = false;
	};

	smartphoneTouchStart = (e) => {
		e.preventDefault();
	};

	smartphoneTouchEnd = (e) => {
		e.preventDefault();
		this.mouse.click = false;
		this.mouse.enter = false;
	};

	smartphoneTouchMove = (e) => {
		e.preventDefault();
		this.mouse.click = true;
		this.mouse.enter = true;
		this.handleMouseMove({
			clientX: e.touches[0].clientX,
			clientY: e.touches[0].clientY
		});
	};

	scroll = (e) => {
		e.preventDefault();
		if (this.mouse.enter) e.preventDefault();
	};

	setBonifications = (elements, bonifications) => {
		const elementsWithBonification = []
		const bonificationsCopy = [...bonifications];
		// Recorrer cada elemento y asignar una bonificación aleatoria
		elements.forEach(element => {
			const randomIndex = Math.floor(Math.random() * bonificationsCopy.length);
			element.bonification = bonificationsCopy.splice(randomIndex, 1)[0];
			elementsWithBonification.push(element)
		});
		return elementsWithBonification
	};

	render() {


		return (
			<StyledWordCatcherTableGame onScroll={this.scroll}>
				<div className='gameCanvas'>
					<canvas
						ref={this.canvasRef}
						width={this.config.width}
						height={this.config.height}
						onMouseDown={this.handleMouseDown}
						onMouseUp={this.handleMouseUp}
						onMouseMove={this.handleMouseMove}
						onMouseLeave={this.mouseOnLeave}
						onMouseEnter={this.mouseOnEnter}
						onTouchStart={this.smartphoneTouchStart}
						onTouchEnd={this.smartphoneTouchEnd}
						onTouchMoveCapture={this.smartphoneTouchMove}
						className='canvasRef'
					></canvas>
				</div>
				<StyledGameInfoContainer>
					{this.props.config.time > 0 ? 
							<div className='timer'>
								{parseInt(this.state.timer.seconds) === 0 && parseInt(this.state.timer.minutes) === 0
									?
										<samp>{this.props.config.times_up}</samp>
									:
									<>
										<samp className='mitutes'>{this.state.timer.minutes}</samp>:<samp className='seconds'>{this.state.timer.seconds}</samp>
									</>
								}
							</div>
						: <></> 
					}
					<div className='points'>
						{`${this.props.config.pointsLabel} ${this.state.points}`}
					</div>
				</StyledGameInfoContainer>
				{this.props.config.showBonifications &&
				<StyledRules>
					{this.elements?.elementsToCatch.map((element, index) => 
					<div key={index} className="rule-element-container">
						<img src={element.src}/>
						<h3>{`${element.bonification}`}</h3>
					</div>)}
					<div className="rule-element-container">
						<img src={this?.elements?.damageElements[0]?.src}/>
						<h3>-1</h3>
					</div>
				</StyledRules>}
				
			</StyledWordCatcherTableGame>
		);
	}
}

export default WordCatcher;
