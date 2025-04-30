import Piece, { PieceColor } from "../piece";

class King extends Piece {
  constructor(color: PieceColor) {
    super(color, "King");
  }
  move() {
    console.log(`${this.color} King moved`);
  }
}
export default King;
