import { BoardCell, Movement, Position } from "../chessBoard";
import Piece, { PieceColor, PieceType } from "../piece";
import SingleMoveValidator from "../board/singleMoveValidator";
import { isCellEmpty, isCellCaptured } from "../utils/helpers";

export class Pawn extends Piece {
  readonly symbol: string;
  protected readonly directions: Position[] = [
    [1, 0],
    [1, 1],
    [1, -1],
  ];
  private readonly pawnSymbols = {
    [PieceColor.White]: "♙",
    [PieceColor.Black]: "♟",
  };

  constructor(color: PieceColor) {
    super(color, PieceType.Pawn);
    this.symbol = this.pawnSymbols[color];
  }

  getAllAvailableMoves(board: BoardCell[][], from: Position) {
    return SingleMoveValidator.getAvailableMoves(board, this.directions, from);
  }

  validateMove(board: BoardCell[][], movement: Movement): boolean {
    const [fromRow, fromCol] = movement.from;
    const [toRow, toCol] = movement.to;
    const deltaRow = toRow - fromRow;
    const deltaCol = toCol - fromCol;

    const direction = this.color === PieceColor.White ? -1 : 1;
    const startRow = this.color === PieceColor.White ? 6 : 1;

    // Movimiento hacia delante
    if (deltaCol === 0) {
      if (deltaRow === direction && isCellEmpty(board[toRow][toCol])) {
        return true;
      }

      if (
        fromRow === startRow &&
        deltaRow === 2 * direction &&
        isCellEmpty(board[fromRow + direction][toCol]) &&
        isCellEmpty(board[toRow][toCol])
      ) {
        return true;
      }
    }

    // Captura en diagonal
    if (
      Math.abs(deltaCol) === 1 &&
      deltaRow === direction &&
      !isCellEmpty(board[toRow][toCol]) &&
      isCellCaptured(board[toRow][toCol], movement.piece.color)
    ) {
      return true;
    }

    throw new Error("Invalid movement for pawn");
  }
}
