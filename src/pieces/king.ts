import Piece, { PieceColor } from "../piece";

class King extends Piece {
  private readonly movement: [number, number] = [1, 1];
  private readonly moveBackward = true;

  constructor(color: PieceColor) {
    super(color, "King");
  }
  move() {
    console.log(`${this.color} King moved`);
    console.log(
      `Movement: ${this.movement}, moveBackward: ${this.moveBackward}`
    );
  }
}
export default King;
