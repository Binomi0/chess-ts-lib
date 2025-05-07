import { BoardCell, Movement, Position } from "../chessBoard";
import ChessBoardValidations from "../chessBoardValidations";
import Piece, { PieceColor, PieceType } from "../piece";
import SingleMoveValidator from "../singleMoveValidator";
import { cloneBoard } from "../utils/helpers";
import PieceDirections from "./directions";

export class King extends Piece {
  readonly symbol: string;
  protected readonly directions: Position[] = PieceDirections.King;

  constructor(color: PieceColor) {
    super(color, PieceType.King);
    this.symbol = color === PieceColor.White ? "♔" : "♚";
  }

  getAllAvailableMoves(board: BoardCell[][], from: Position) {
    const moves = super.getAllAvailableMoves(board, from, this.directions);

    const tempBoard = cloneBoard(board);

    return moves.filter((move) => {
      tempBoard[move[0]][move[1]] = this;
      tempBoard[from[0]][from[1]] = undefined;

      return ChessBoardValidations.isKingInCheck(tempBoard, this.color);
    });
  }

  validateMove(board: BoardCell[][], movement: Movement): boolean {
    return SingleMoveValidator.validateMove(board, this.directions, movement);
  }
}
