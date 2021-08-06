import React from 'react';

function Platform(props) {
  return (
    <div 
    	className="Platform br3 pa2 ma3 bw2 shadow-5" 
    	style={props.data.style} 
    	key={props.data.number}>{props.data.id}
    </div>
  );
}
export default Platform;