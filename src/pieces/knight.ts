import Piece, { PieceColor } from "../piece";

class Knight extends Piece {
  constructor(color: PieceColor) {
    super(color, "Knight");
  }
  move() {
    console.log(`${this.color} Knight moved`);
  }
}
export default Knight;
