import React from "react";
import WordCatcherClass from "./WordCatcherClass";
import { StyledGame, StyledGameInfoContainer, StyledWordCatcherTableGame } from "./WordCatcherStyles";


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
			height: 1000,
		};

		this.renderCanvas = this.renderCanvas.bind(this);


		// CONFIG TIMER
		var minutes = "00"
		var seconds = "00"
		
		// If existe time : set timer
		if(props.config.time){
			minutes = Math.floor(props.config.time.time / 60);
			seconds = props.config.time?.time - minutes * 60;
		}

		this.state = {
			timer: {
				minutes: minutes === "00" ? "00" : `0${minutes}`,
				seconds: seconds === "00" ? "00" : seconds < 10 ? `0${seconds}` : seconds,
			},
			words: {
				wordsToSearch: [],
				wordsSearched: []
			},
			start: false,
			gameEnd: false
		};
	}

	startGame = () => {
		this.setState({ start: true });
		this.canvas = this.canvasRef.current;
		this.context = this.canvasRef.current.getContext("2d");
		let elements = {
			damageElements: this.props.config.damageElements,
			elementsToCatch: this.props.config.elementsToDrop,
		}
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

			this.setState({
				timer: {
					seconds: seconds,
					minutes: minutes
				}
			});

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

	toHuntWord = (wordsToSearch = [], correctWordsSearched = [], incorrectWordsSearched = []) => {
		this.setState({
			words: {
				wordsToSearch,
				correctWordsSearched,
				incorrectWordsSearched
			}
		});
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
		this.props.setStateMicrogame([{
			accepted_values: this.state.words.correctWordsSearched,
			unaccepted_values:this.state.words.incorrectWordsSearched
		}])
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

	render() {
		let pointsWords = this.state.words.wordsToSearch.map((word, index) => {
			if (this.state.words.correctWordsSearched.includes(word)) {
				return <p key={index} className='finded'>⬤</p>;
			} else {
				return <p key={index} className='not-finded'>⬤</p>;
			}
		});

		return (
		<StyledWordCatcherTableGame onScroll={this.scroll}>
			<StyledGame>
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
				{this.props?.data?.props?.time > 0 ? 
					<StyledGameInfoContainer>
						<div className='timer'>
							{parseInt(this.state.timer.seconds) === 0 && parseInt(this.state.timer.minutes) === 0
								?
									<samp>"Time's up"</samp>
								:
								<>
									<samp className='mitutes'>{this.state.timer.minutes}</samp>:<samp className='seconds'>{this.state.timer.seconds}</samp>
								</>
							}
						</div>
					</StyledGameInfoContainer>
				: <></> 
				}
				<StyledGameInfoContainer>
					<div className='words'>
						<div className='marker'>{pointsWords}</div>
					</div>
				</StyledGameInfoContainer>
				
			</StyledGame>
		</StyledWordCatcherTableGame>
		);
	}
}

export default WordCatcher;
