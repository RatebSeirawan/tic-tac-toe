import React, {useState} from 'react';
import './Game.css';

const calculateWinner = (board) => {
  const winningLines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,9],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];

  for(let i = 0; i < winningLines.length; i++) {
    const [a,b,c] = winningLines[i];
    if(board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }

  return null;
};

export default () => {
  const [turn, setTurn] = useState(true); // if true then X to play else O to play
  const [history, setHistory] = useState([Array(9).fill(null)]);

  const Square = ({index}) => {
    return (
      <button className="square" onClick={() => onSquareClick(index)}>
        {history[history.length - 1][index]}
      </button>
    )
  };

  const onSquareClick = (index) => {
    const current = [...history[history.length - 1]];
    const player = turn ? 'X' : 'O'; 

    if(current[index] || calculateWinner(current)) {
      return;
    }

    current[index] = player;
    
    setTurn(!turn);
    setHistory([...history, current]);
  };

  const getStatus = () => {
    const winner = calculateWinner(history[history.length - 1]);
    if(winner) {
      return winner + ' Wins!!';
    }
    else if(history[history.length - 1].every(item => item)) {
      return 'Draw!';
    }
    else if(turn) {
      return 'X to play!';
    } else {
      return 'O to play!';
    }
  };

  const jumpTo = (index) => {
    console.log(history);
    setHistory(history.slice(0, index + 1));
  };

  const History = () => history.map((step, index) => {
    const desc = index ? 'Go to Step ' + index : 'Go to Start';

    return (
      <ol key={index}>
        <button onClick={() => jumpTo(index)}>
          {desc}
        </button>
      </ol>
    );
  });

  return (
    <div className="game">
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <h4>{getStatus()}</h4>
        <div className="board">
          <div className="row">
            <Square index={0} />
            <Square index={1} />
            <Square index={2} />
          </div>
          <div className="row">
            <Square index={3} />
            <Square index={4} />
            <Square index={5} />
          </div>
          <div className="row">
            <Square index={6} />
            <Square index={7} />
            <Square index={8} />
          </div>
        </div>
      </div>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <ul>
          <History />
        </ul>
      </div>
    </div>
  )
};
