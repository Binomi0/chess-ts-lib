import CastlingManager from "../castlingManager";
import { Castling, Position } from "../chessBoard";
import { PieceType } from "../piece";
import PieceFactory from "../pieces/factory";
import { King } from "../pieces/king";
import { Pawn } from "../pieces/pawn";
import BoardStateManager from "./boardStateManager";

class MovementExecutor {
  private boardStateManager: BoardStateManager;

  constructor(boardStateManager: BoardStateManager) {
    this.boardStateManager = boardStateManager;
  }

  executeMove(from: Position, to: Position): void {
    return this.boardStateManager.movePiece(from, to);
  }

  executeCastling(king: King, side: Castling) {
    return CastlingManager.castle(
      this.boardStateManager.getBoardSnapshot(),
      king.color,
      side,
    );
  }

  executeEnPassant(from: Position, to: Position): void {
    // Implement en passant logic here
  }

  executePromotion(piece: Pawn, position: Position): void {
    this.boardStateManager.removePiece(position);
    this.boardStateManager.placePiece(
      position,
      PieceFactory.getPiece(PieceType.Queen, piece.color),
    );
  }
}
export default MovementExecutor;
