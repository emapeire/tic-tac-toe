/* eslint-disable react/prop-types */
import { useState } from "react";
import "./App.css";

const TURNS = {
  X: "X",
  O: "O",
};

const Square = ({ children, updateBoard, index, isSelected }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;
  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

const WINNER_COMBINATIONS = [
  // Horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // Vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  // Diagonal
  [0, 4, 8],
  [2, 4, 6],
];

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null);

  const checkWinner = (boardToCheck) => {
    for (const combination of WINNER_COMBINATIONS) {
      const [a, b, c] = combination;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  };

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null);
  };

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset game</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      {winner !== null && (
        <section className="winner">
          <div className="text">
            <h2>
              {winner === false ? "It's a tie!" : `Player ${winner} wins!`}
            </h2>
            {winner ? (
              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>
            ) : null}
            <footer>
              <button onClick={resetGame}>Play again</button>
            </footer>
          </div>
        </section>
      )}
    </main>
  );
}
