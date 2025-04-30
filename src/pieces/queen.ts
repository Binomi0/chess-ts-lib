import Piece, { PieceColor } from "../piece";

class Queen extends Piece {
  constructor(color: PieceColor) {
    super(color, "Queen");
  }
  move() {
    console.log(`${this.color} Queen moved`);
  }
}
export default Queen;
