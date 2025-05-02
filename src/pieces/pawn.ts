import { BoardCell, Movement } from "../chessBoard";
import Piece, { type PieceColor } from "../piece";

export class Pawn extends Piece {
  // protected static readonly movement: Position = [1, 1];
  // protected static readonly moveBackward = false;

  constructor(color: PieceColor) {
    super(color, "Pawn");
  }

  static validateMove(
    board: BoardCell[][],
    movement: Movement,
    isWhite: boolean
  ) {
    if (isWhite) {
      return WhitePawn.validateMove(board, movement);
    }
    return BlackPawn.validateMove(board, movement);
  }
}

export class WhitePawn extends Pawn {
  constructor() {
    super("white");
  }

  static validateMove(board: BoardCell[][], movement: Movement) {
    const [fromRow, fromCol] = movement.from;
    const [toRow, toCol] = movement.to;

    if (toRow < fromRow) {
      return false;
    }

    if (
      toRow === fromRow + 1 &&
      toCol === fromCol &&
      board[toRow][toCol] === undefined
    ) {
      return true;
    } else if (
      (toRow === fromRow + 2 &&
        fromCol === toCol &&
        fromRow === 1 &&
        board[toRow][toCol] === undefined,
      board[toRow - 1][toCol] === undefined)
    ) {
      return true;
    } else if (toRow === fromRow + 1 && fromCol !== toCol) {
      if (board[toRow][toCol] !== undefined) {
        if (board[toRow][toCol]?.color === "black") {
          console.log("Me como la ficha", board[toRow][toCol].type);
          return true;
        }
      }
    }

    return false;
  }
}

export class BlackPawn extends Pawn {
  constructor() {
    super("black");
  }

  static validateMove(board: BoardCell[][], movement: Movement) {
    const [fromRow, fromCol] = movement.from;
    const [toRow, toCol] = movement.to;

    // Cannot go backwards
    if (toRow > fromRow) {
      return false;
    }

    // Target cell is empty
    if (
      toRow === fromRow - 1 &&
      toCol === fromCol &&
      board[toRow][toCol] === undefined
    ) {
      return true;

      // Target cell is clear of obstacles
    } else if (
      toRow === fromRow - 2 &&
      toCol === fromCol &&
      fromRow === 6 &&
      board[toRow][toCol] === undefined &&
      board[toRow + 1][toCol] === undefined
    ) {
      return true;
    } else if (toRow === fromRow - 1 && fromCol !== toCol) {
      // Target cell is occupied by an opponent's piece
      if (
        board[toRow][toCol] !== undefined &&
        board[toRow][toCol].color === "white"
      ) {
        return true;
      }
    }

    return false;
  }
}
