import React from 'react';
import Platform from '../Platform/Platform';


const PlatformList=({platforms})=>{
	return(
		<div>
			{platforms.map((item,i)=>{
				return(
						<Platform 
							data={platforms[i]} 
							key={i}
						/>
					)
			})}
		</div>
		)
}
			
export default PlatformList;