import { BoardCell, Movement } from "../chessBoard";
import Piece, { PieceColor, Position } from "../piece";

export class Bishop extends Piece {
  private static readonly directions: Position[] = [
    [-1, -1],
    [1, 1],
    [-1, 1],
    [1, -1],
  ];

  constructor(color: PieceColor) {
    super(color, "Bishop");
  }

  static validateMove(board: BoardCell[][], movement: Movement): boolean {
    const validMoves = [];

    for (const [dx, dy] of this.directions) {
      let newRow = movement.from[0] + dx;
      let newCol = movement.from[1] + dy;

      while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        const target = board[newRow][newCol];

        if (target === undefined) {
          validMoves.push([newRow, newCol]); // Casilla vacía, se puede mover
        } else if (target.color !== movement.piece.color) {
          validMoves.push([newRow, newCol]); // Puede capturar
          break; // Pero no puede pasar más allá
        } else {
          break; // Bloqueado por una pieza del mismo color
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

export class WhiteBishop extends Bishop {
  constructor() {
    super("white");
  }
}

export class BlackBishop extends Bishop {
  constructor() {
    super("black");
  }
}
