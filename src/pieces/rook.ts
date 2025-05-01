import Piece, { PieceColor } from "../piece";

class Rook extends Piece {
  private readonly movement: [number, number] = [8, 8];
  private readonly moveBackward = true;

  constructor(color: PieceColor) {
    super(color, "Rook");
  }
  move() {
    console.log(`${this.color} Rook moved`);
    console.log(
      `Movement: ${this.movement}, moveBackward: ${this.moveBackward}`
    );
  }
}
export default Rook;
