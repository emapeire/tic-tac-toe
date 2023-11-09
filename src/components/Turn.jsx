/* eslint-disable react/prop-types */
import { TURNS } from "../lib/constants";
import { Square } from "./Square";

export default function Turn({ turn }) {
  return (
    <section className="turn">
      <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
      <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
    </section>
  );
}
