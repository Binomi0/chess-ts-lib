import ChessBoard, { BoardCell, Movement } from "../chessBoard";
import Piece, { PieceColor, Position } from "../piece";

class Knight extends Piece {
  private static readonly directions: [number, number][] = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ];

  constructor(color: PieceColor) {
    super(color, "Knight");
  }

  static validateMove(
    board: BoardCell[][],
    movement: Movement,
    isWhite: boolean
  ): boolean {
    const validMoves: Position[] = [];

    for (const [dx, dy] of this.directions) {
      const newRow = movement.from[0] + dx;
      const newCol = movement.from[1] + dy;

      if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        const target = board[newRow][newCol];
        const pieceColor = isWhite ? "white" : "black";

        // Movimiento válido si la casilla está vacía o tiene una pieza del color contrario
        if (!target || target.color !== pieceColor) {
          validMoves.push([newRow, newCol]);
        }
      }
    }

    return validMoves.some(
      (move) => move[0] === movement.to[0] && move[1] === movement.to[1]
    );
  }
}
export default Knight;

// class WhiteKnight extends Knight {
//   constructor() {
//     super("white");
//   }

//   validateMove(validMoves: Position[], movement: Movement): boolean {
//     return validMoves.some(
//       (move) => move[0] === movement.to[0] && move[1] === movement.to[1]
//     );
//   }
// }

// class BlackKnight extends Knight {
//   constructor() {
//     super("black");
//   }

//   validateMove(validMoves: Position[], movement: Movement): boolean {
//     return validMoves.some(
//       (move) => move[0] === movement.to[0] && move[1] === movement.to[1]
//     );
//   }
// }
