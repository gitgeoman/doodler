import React, {Component} from 'react';
import Doodler from './Doodler';
import Platform from './Platform';

class Grid extends Component{
  constructor(props){
    super(props);
    this.state={
      isGameOver:false,

      doodler:{
        style:{
          position:'absolute',
          top:'400px',
          left:'150px'
        }
      },
      platform:{
        numberOfPlatform:5,
        platformStartPosition:{
          style:{
            position:'absolute',
            top:'500px',
            left:'150px'
          }
        }
      }
    }
  }
  
  generatePlatformState(i){
    const platformActualPosition={
      style:{
            position:'absolute',
            top:`${Math.ceil(Math.random()+i*100)}px`,
            left:`${Math.ceil(Math.random()*300)}px`,
      }
    }
    return platformActualPosition
  }

  createPlatroms(){
    const listItem=Array(5).fill('null').map((item,i)=>{
      item=this.generatePlatformState(i);
      return(<Platform data={item.style} function={this.movePlatform()}/>)
        })
    return(
      <div>{listItem}</div>
      //{<Platform data={this.state.platform.platformStartPosition.style}/>}
      )
  };





  createDoodler(){
    return (
      <Doodler doodler={this.state.doodler}/>
      )
  };

  startGame(){
    if(!this.state.isGameOver){
      this.createDoodler()//it would be nice to add button later
      this.createPlatroms()
    }
  }

  movePlatform(style){
    //console.log(style);

  }

  componentDidMount(){
    setInterval(this.movePlatform, 200);
  };





  render(){
    return(
      <div className='Grid'>
        {this.createDoodler()}
        {this.createPlatroms()}
        
      </div>)
  }
}

export default Grid;
