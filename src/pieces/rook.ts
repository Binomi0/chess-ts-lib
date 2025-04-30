import Piece, { PieceColor } from "../piece";

class Rook extends Piece {
  constructor(color: PieceColor) {
    super(color, "Rook");
  }
  move() {
    console.log(`${this.color} Rook moved`);
  }
}
export default Rook;
