import { WINNER_COMBINATIONS } from "../lib/constants";

export const checkWinnerFrom = (boardToCheck) => {
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

export const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square !== null);
};
