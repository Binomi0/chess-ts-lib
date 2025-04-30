import Piece, { PieceColor } from "../piece";

class Pawn extends Piece {
  constructor(color: PieceColor) {
    super(color, "Pawn");
  }

  move() {
    console.log(`${this.color} Pawn moved`);
  }
}

export default Pawn;
