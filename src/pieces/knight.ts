import Piece, { PieceColor } from "../piece";

class Knight extends Piece {
  private readonly movement: [number, number] = [2, 1];
  private readonly moveBackward = true;

  constructor(color: PieceColor) {
    super(color, "Knight");
  }
  move() {
    console.log(`${this.color} Knight moved`);
    console.log(
      `Movement: ${this.movement}, moveBackward: ${this.moveBackward}`
    );
  }
}
export default Knight;
