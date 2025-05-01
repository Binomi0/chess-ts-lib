import Piece, { PieceColor } from "../piece";

class Queen extends Piece {
  private readonly movement: [number, number] = [8, 8];
  private readonly moveBackward = true;

  constructor(color: PieceColor) {
    super(color, "Queen");
  }
  move() {
    console.log(`${this.color} Queen moved`);
    console.log(
      `Movement: ${this.movement}, moveBackward: ${this.moveBackward}`
    );
  }
}

export default Queen;
