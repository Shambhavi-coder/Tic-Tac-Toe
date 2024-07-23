import {useState} from 'react';
export default function Player({initialName,symbol,isActive,onChangeName})
{ const [isEditing,setIsEditing]=useState(false);
    const [playerName,setPlayerlName]=useState(initialName)

    function Edit()
    {
       setIsEditing((editing)=>!editing);
       if(isEditing){
        onChangeName(symbol,playerName);
       }
      
      
    }
    function handleChange(event)
    {
        console.log(event);
        setPlayerlName(event.target.value);
         
    }

    let edititablePlayerName= <span className="player-name">{playerName}</span> ;
    let btnCaption='Edit';

    if(isEditing===true)
        {
           edititablePlayerName= <input type="text" required  value={playerName} onChange={handleChange} />;
           btnCaption='Save';
        }
    
       
            
        
   return(
    <li className={isActive?'active':undefined}> 
        <span className="players" >
            { edititablePlayerName}
           
            <span className="player-symbol">{symbol}</span> 
            </span>
            <button onClick={Edit}> {btnCaption}</button>
        </li>
    
   ); 
          
}