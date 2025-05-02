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
  ): boolean {
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
    const targetCell = board[toRow][toCol];

    // White Pawn cannot go backwards
    if (toRow < fromRow) {
      return false;
    }

    const isTargetEmpty = this.checkTargetFree(board, movement);
    const isWayCleared = this.checkWayCleared(board, movement);
    const isTryingToCapture = toRow === fromRow + 1 && fromCol !== toCol;

    if (isTargetEmpty) {
      return true;
    }
    if (isWayCleared) {
      return true;
    }
    if (isTryingToCapture) {
      return this.checkCapture(targetCell);
    }

    return false;
  }

  static checkTargetFree(board: BoardCell[][], movement: Movement) {
    const [fromRow, fromCol] = movement.from;
    const [toRow, toCol] = movement.to;

    return (
      toRow === fromRow + 1 && // Pawn can move one square forward
      toCol === fromCol && // Only move vertical
      board[toRow][toCol] === undefined // target cell is empty
    );
  }

  static checkWayCleared(board: BoardCell[][], movement: Movement): boolean {
    const [fromRow, fromCol] = movement.from;
    const [toRow, toCol] = movement.to;

    return (
      toRow === fromRow + 2 &&
      fromCol === toCol &&
      fromRow === 1 &&
      board[toRow][toCol] === undefined &&
      board[toRow - 1][toCol] === undefined
    );
  }

  static checkCapture(targetCell: BoardCell) {
    if (targetCell !== undefined) {
      if (targetCell?.color === "black") {
        console.log("Me como la ficha", targetCell.type);
        return true;
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
