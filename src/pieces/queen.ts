import ChessBoard, { Movement } from "../chessBoard";
import Piece, { PieceColor, Position } from "../piece";

export class Queen extends Piece {
  private static readonly directions: Position[] = [
    [-1, 0], // ↑
    [1, 0], // ↓
    [0, -1], // ←
    [0, 1], // →
    [-1, -1], // ↖️
    [-1, 1], // ↗️
    [1, -1], // ↙️
    [1, 1], // ↘️
  ];

  constructor(color: PieceColor) {
    super(color, "Queen");
  }

  static validateMove(board: ChessBoard["board"], movement: Movement): boolean {
    const validMoves: Position[] = [];

    for (const [dx, dy] of this.directions) {
      let newRow = movement.from[0] + dx;
      let newCol = movement.from[1] + dy;

      while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        const target = board[newRow][newCol];

        if (target === undefined) {
          validMoves.push([newRow, newCol]);
        } else if (target.color !== movement.piece.color) {
          validMoves.push([newRow, newCol]); // Captura
          break;
        } else {
          break; // Pieza aliada bloquea
        }

        newRow += dx;
        newCol += dy;
      }
    }

    return validMoves.some(
      (move) => move[0] === movement.to[0] && move[1] === movement.to[1]
    );
  }
}

export class WhiteQueen extends Queen {
  constructor() {
    super("white");
  }
}

export class BlackQueen extends Queen {
  constructor() {
    super("black");
  }
}
