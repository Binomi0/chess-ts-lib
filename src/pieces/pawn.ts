import ChessBoard from "../chessBoard";
import Piece, { PieceColor } from "../piece";

class Pawn extends Piece {
  private readonly movement: [number, number] = [1, 1];
  private readonly moveBackward = false;

  constructor(color: PieceColor) {
    super(color, "Pawn");
  }

  static validateWhiteMove(
    board: ChessBoard["board"],
    from: [number, number],
    to: [number, number]
  ): boolean {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;

    if (toRow === fromRow + 1 && toCol === fromCol) {
      return true;
    } else if (toRow === fromRow + 2 && fromCol === toCol && fromRow === 1) {
      return true;
    } else if (
      toRow === fromRow + 1 &&
      (fromCol === fromCol + 1 || fromCol === fromCol - 1)
    ) {
      if (board[toRow][toCol] !== undefined) {
        if (board[toRow][toCol]?.color === "black") {
          return true;
        }
      }
    }

    return false;
  }

  static validateBlackMove(
    board: ChessBoard["board"],
    from: [number, number],
    to: [number, number]
  ): boolean {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;

    if (toRow === fromRow - 1 && toCol === fromCol) {
      return true;
    } else if (toRow === fromRow - 2 && toCol === fromCol && fromRow === 6) {
      return true;
    } else if (
      toRow === fromRow + 1 &&
      (fromCol === fromCol + 1 || fromCol === fromCol - 1) &&
      board[toRow][toCol] !== undefined &&
      board[toRow][toCol].color === "white"
    ) {
      return true;
    }

    return false;
  }

  move() {
    console.log(`${this.color} Pawn moved`);
    console.log(
      `Movement: ${this.movement}, moveBackward: ${this.moveBackward}`
    );
  }
}

export default Pawn;
