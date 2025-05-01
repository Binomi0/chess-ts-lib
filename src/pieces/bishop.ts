import Piece, { PieceColor } from "../piece";

class Bishop extends Piece {
  private readonly movement: [number, number] = [1, 1];
  private readonly moveBackward = true;

  constructor(color: PieceColor) {
    super(color, "Bishop");
  }
  move() {
    console.log(`${this.color} Bishop moved`);
    console.log(
      `Movement: ${this.movement}, moveBackward: ${this.moveBackward}`
    );
  }
}
export default Bishop;
