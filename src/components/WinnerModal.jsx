/* eslint-disable react/prop-types */
import { Square } from "./Square";

export default function WinnerModal({ winner, resetGame }) {
  if (winner === null) return null;
  const winnerText = winner ? `Player ${winner} wins!` : "It's a tie!";

  return (
    <section className="winner">
      <div className="text">
        <h2>{winnerText}</h2>
        {winner ? (
          <header className="win">{winner && <Square>{winner}</Square>}</header>
        ) : null}
        <footer>
          <button onClick={resetGame}>Play again</button>
        </footer>
      </div>
    </section>
  );
}
