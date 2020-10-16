import React, {Component} from 'react';
import PlatformList from '../PlatformList/PlatformList';
import Doodler from '../Doodler/Doodler';

import './Grid.css';

class Grid extends Component{
	constructor(props){
		super(props);
		this.state={
			gameState:'STOP',
			doodler:{
				isJumping:'STAY',
				fallspeed:8,
				AtopValue:0,
				style:{
					topValue:470,
					top:'470px',
					leftValue:150,
					left:'150px'					
				}
			},
			platformList:[
				{
					id:1,
					style:{
						position:'absolute',
						topValue:100,
						top:`100px`,
						leftValue:50,
						left:'50px'
					}
				},
				{
					id:2,
					style:{
						position:'absolute',
						topValue:200,
						top:`200px`,
						leftValue:50,
						left:'50px'
					}
				},
				{
					id:3,
					style:{
						position:'absolute',
						topValue:300,
						top:`300px`,
						leftValue:50,
						left:'50px'
					}
				},			
				{
					id:4,
					style:{
						position:'absolute',
						topValue:400,
						top:`400px`,
						leftValue:150,
						left:'150px'
					}
				},
				{
					id:5,
					style:{
						position:'absolute',
						topValue:500,
						top:`500px`,
						leftValue:150,
						left:'150px'
					}
				}

			]
		}
	}
	
	componentDidMount(){
		document.onkeydown = this.onKeyDown;
		this.timerID=setInterval(
			()=>{
					this.movePlatform()
					this.chceckIfPlatformOutside()
				}
			,40);
		this.doodlerFall=setInterval(
			()=>{
				this.doodlerMove()
				this.checkIfDoodlerOutside()		
			},50
		)
		
	}
	
	componentWillUnmount() {
    	clearInterval(this.timerID);
  	}

	onKeyDown=(e)=>{
		e=e||window.event;
		switch(e.keyCode){
			case 32:
			//poniższy kod musi być w warunku na zderzenie z platforma
			this.state.platformList.forEach(
				(item)=>{
					if (
						this.state.doodler.isJumping!=='JUMP'
						&&(this.state.doodler.style.topValue+20>=item.style.topValue-30) //dol doodlera nizej od gory platformy
						&&(this.state.doodler.style.topValue-20<=item.style.topValue+20) //gora doodlera nizej niz doodlera
						&&(this.state.doodler.style.leftValue+60>=item.style.leftValue)
						&&(this.state.doodler.style.leftValue<=item.style.leftValue+85)
						){
						let stateOfDoodlerCopy=JSON.parse(JSON.stringify(this.state.doodler))
						stateOfDoodlerCopy.isJumping='JUMP'
						this.state.gameState='START'
						stateOfDoodlerCopy.AtopValue=stateOfDoodlerCopy.style.topValue
						this.setState({doodler:stateOfDoodlerCopy})
					}
				}
			)
			break;
			
			case 37: //left
			//poniższy kod musi być w warunku na zderzenie z platforma
			let leftStateDoodlerCopy=JSON.parse(JSON.stringify(this.state.doodler))
				leftStateDoodlerCopy.style.leftValue=leftStateDoodlerCopy.style.leftValue-4
				leftStateDoodlerCopy.style.left=`${leftStateDoodlerCopy.style.leftValue}px`
				this.setState({doodler:leftStateDoodlerCopy})
			break;

			case 39: //left
			//poniższy kod musi być w warunku na zderzenie z platforma
			let rightStateDoodlerCopy=JSON.parse(JSON.stringify(this.state.doodler))
			rightStateDoodlerCopy.style.leftValue=rightStateDoodlerCopy.style.leftValue+4
			rightStateDoodlerCopy.style.left=`${rightStateDoodlerCopy.style.leftValue}px`
			this.setState({doodler:rightStateDoodlerCopy})
			break;
			}
		}

	doodlerMove(UpOrDown=0){
		if (this.state.doodler.isJumping==='STAY'&&this.state.doodler.gameState==='STOP'){
			//console.log(this.state.doodler.AtopValue)
		}else if (this.state.doodler.isJumping==='JUMP'){
			//console.log(this.state.doodler.isJumping)
				let stateOfDoodlerCopy=JSON.parse(JSON.stringify(this.state.doodler))
					stateOfDoodlerCopy.style.topValue=stateOfDoodlerCopy.style.topValue-8
					stateOfDoodlerCopy.style.top=stateOfDoodlerCopy.style.topValue
					this.setState({doodler:stateOfDoodlerCopy})
					if ((Math.abs(this.state.doodler.style.topValue-this.state.doodler.AtopValue)>=200)){
						let actualstateOfDoodlerCopy=JSON.parse(JSON.stringify(this.state.doodler));
						actualstateOfDoodlerCopy.isJumping='FALL'
						this.setState({doodler:actualstateOfDoodlerCopy})
					}	
		}else if (this.state.doodler.isJumping==='FALL'){
			//console.log('fall')	
			let fallstateOfDoodlerCopy=JSON.parse(JSON.stringify(this.state.doodler))

					fallstateOfDoodlerCopy.style.topValue=fallstateOfDoodlerCopy.style.topValue+8
					fallstateOfDoodlerCopy.style.top=fallstateOfDoodlerCopy.style.topValue
					this.setState({doodler:fallstateOfDoodlerCopy})
					//tutaj trzebaby zrobić zwolnienie doodlera do predkosci platformy dla przypadku zderzenia z platforma
			}
		
	}

	movePlatform(){
		if (this.state.gameState!=='STOP'&&this.state.gameState!=='GAME_OVER'){
			let newStateValues=JSON.parse(JSON.stringify(this.state.platformList))
			newStateValues.forEach((item)=>{
				item.style.topValue=item.style.topValue+5;
				item.style.top=`${item.style.topValue}px`;
				item.style.left=`${item.style.leftValue}px`;
			})
			return(
				this.setState({platformList:newStateValues})
				) 
		}



	}

	//test czy platforma poza planszą
	chceckIfPlatformOutside(){
		let newStateValues=JSON.parse(JSON.stringify(this.state.platformList))
		newStateValues.forEach((item)=>{
			if(item.style.topValue>550){
				const randomDigit=Math.random()*300;
				item.style.topValue=0;
				item.style.top='0px';
				item.style.leftValue=`${randomDigit}`;
				item.style.left=`${randomDigit}px`;
			}

		})
				return(
			this.setState({platformList:newStateValues})
			)
	}

	//test czy doodler jest poza planszą
	checkIfDoodlerOutside(){
		if (this.state.doodler.style.topValue>550){
			console.log('game over')
			//jezeli jest poza
			clearInterval(this.timerID);
			clearInterval(this.doodlerFall);
			}
		}
  
	render(){
		return(
			<div className='Grid tc bg-light-green center br3 ma2 bw2 shadow-5'>
				<PlatformList platforms={this.state.platformList}/>
				
				<Doodler doodler={this.state.doodler} />
			</div>
			)
	}
}

export default Grid;