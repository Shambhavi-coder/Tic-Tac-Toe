import { useState } from 'react';
import Player from './components/player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Header from './components/Header.jsx';
import Log from './Log.jsx';
import { WINNING_COMBINATIONS } from '../winning-combinations (1).js';
import GameOver from './components/GameOver.jsx';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveActivePlayer(gameTurn)
{
  let currentPlayer='X';
  if(gameTurn.length>0 && gameTurn[0].player==='X' )
  {
    currentPlayer='O';
   
  }
  return currentPlayer;
}
function App() {
  const [player,setPlayer]=useState({X:'Player 1',O:'Player 2'});
  const [gameTurn,setGameTurn]=useState([]); 
  
  //const[activePLayer,setActivePlayer]=useState('X');

 const activePLayer=deriveActivePlayer(gameTurn);

 let gameBoard=[...initialGameBoard.map(array=>[...array])];
  for(const turn of gameTurn)
  {
    const{square,player}=turn;
    const{row,col}=square;
    gameBoard[row][col]=player;
  }
 const winner=deriveWinner(player,gameBoard);
 const hasDraw =gameTurn.length===9 && !winner;


  function handleSelectSquare(rowIndex,colIndex)
  {
    //setActivePlayer((currentActive)=> currentActive==='X'?'O':'X'));
    setGameTurn((preTurns)=>{
     const currentPlayer=deriveActivePlayer(preTurns);
      const updatedTurns=[{square:{row:rowIndex ,col:colIndex},player:activePLayer},...preTurns,

       ];
       return updatedTurns;
    });
  }
  function deriveWinner(player,gameBoard)
  {
    let winner;
    for(const combination of WINNING_COMBINATIONS)
    {
     const firstSquareSymbol=gameBoard[combination[0].row][combination[0].column];
     const secondSquareSymbol=gameBoard[combination[1].row][combination[1].column];
     const thirdSquareSymbol=gameBoard[combination[2].row][combination[2].column];
   
     if(firstSquareSymbol&&firstSquareSymbol===secondSquareSymbol&&secondSquareSymbol===thirdSquareSymbol)
     {
       winner=player[firstSquareSymbol];
     }
    }
    return winner;
  }
  function handleRestart()
  {
    setGameTurn([]);
  }

  function handlePLayerName(symbol,newName)
  {
    setPlayer(prePlayer=>{
      return{
        ...prePlayer,[symbol]:newName
      };
    })
  }
  return (
    <>
    <Header/>

   <main>
     <div id="game-container">
      <ol id="players" className='highlight-player'>
     <Player initialName="Player1" symbol="X" isActive={activePLayer==='X'} onChangeName={handlePLayerName}/>
     <Player initialName="Player2" symbol="O" isActive={activePLayer==='O'}
     onChangeName={handlePLayerName}/>
      </ol>
      {(winner|| hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
    <GameBoard onSelectSquare={handleSelectSquare} 
    turns={gameTurn}  activePlayerSymbol={activePLayer } board={gameBoard}/>
     </div>
    
   </main>
   <Log turns={gameTurn}/>
   
   </>
   
  )
}


export default App;

