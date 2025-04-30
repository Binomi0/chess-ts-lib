import Piece, { PieceColor } from "../piece";

class Bishop extends Piece {
  constructor(color: PieceColor) {
    super(color, "Bishop");
  }
  move() {
    console.log(`${this.color} Bishop moved`);
  }
}
export default Bishop;
