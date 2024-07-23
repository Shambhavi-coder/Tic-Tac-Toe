import React from 'react';
import { useState } from 'react';


export default function GameBoard({onSelectSquare,board}) {
  
  // const[gameBoard,setGameBoard]=useState(initialGameBoard);
    // function handleSelectSquare(rolIndex,colIndex)
    // {
    //            setGameBoard((preGameBoard)=>{
    //             const updateBoard=[...preGameBoard.map(initialArray=>[...initialArray])];
    //         updateBoard[rolIndex][colIndex]=activePlayerSymbol;
    //         return updateBoard;
    //     });
    //    onSelectSquare();
    // }
  return (

    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={()=>onSelectSquare(rowIndex,colIndex)} disabled={playerSymbol!== null}>{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}

