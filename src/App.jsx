import { useState } from "react";
import "./App.css";
import confetti from "canvas-confetti";
import { TURNS } from "./lib/constants";
import { checkEndGame, checkWinnerFrom } from "./utils/board";
import WinnerModal from "./components/WinnerModal";
import Turn from "./components/Turn";
import Game from "./components/Game";

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null);

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  };

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset game</button>
      <Game board={board} updateBoard={updateBoard} />
      <Turn turn={turn} />
      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}
