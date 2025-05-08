import Piece, { PieceColor } from "./piece";
import ChessBoardValidations from "./board/boardValidations";
import { logMovement } from "./utils/helpers";
import CastlingManager from "./castlingManager";
import BoardMovements from "./board/movementManager";
import TurnManager from "./board/turnManager";
import BoardStateManager from "./board/boardStateManager";
import GameManager from "./gameManager";

export type Movement = {
  from: Position;
  to: Position;
  piece: Piece;
};
export enum Castling {
  Queen = "queen",
  King = "king",
}
export type BoardCell = Piece | undefined;
export type Position = [number, number];

class ChessBoard {
  boardMovements: BoardMovements;
  turnManager: TurnManager = new TurnManager();
  stateManager: BoardStateManager = new BoardStateManager();

  constructor(private manager: GameManager) {
    this.boardMovements = new BoardMovements(this.stateManager);
  }

  get turn() {
    return this.turnManager.getCurrentTurn();
  }

  // TODO: Set to private when ready
  nextTurn() {
    this.turnManager.switchTurn();
  }

  isKingInCheck() {
    return ChessBoardValidations.isKingInCheck(
      this.stateManager.getBoardSnapshot(),
      this.turn,
    );
  }

  isCheckMate() {
    return ChessBoardValidations.isCheckMate(
      this.stateManager.getBoardSnapshot(),
      this.turn,
    );
  }

  getBoard(): BoardCell[][] {
    return this.stateManager.getBoardSnapshot();
  }

  getPosition(coords: Position) {
    return this.stateManager.getCell(coords);
  }

  handleMove(from: Position, to: Position) {
    try {
      const piece = this.stateManager.getCell(from);
      if (!piece) {
        throw new Error("Invalid move: No piece at the source position");
      }
      if (!this.turnManager.isValidTurn(piece.color)) {
        throw new Error("Invalid Turn");
      }
      const castlingMove = this.boardMovements.isCastlingMove(from, to);

      const board = this.stateManager.getBoardSnapshot();
      if (castlingMove) {
        const [color, side] = castlingMove;
        CastlingManager.castle(this.stateManager, color, side);
      } else {
        ChessBoardValidations.isValidMove(board, from, to);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }

    // this.executeMovement(from, to);
    this.stateManager.movePiece(from, to);

    if (this.isKingInCheck()) {
      // this.executeMovement(to, from);
      this.stateManager.movePiece(from, to);
    } else {
      this.nextTurn();
    }
  }

  private executeMovement(from: Position, to: Position) {
    try {
      const [fromRow, fromCol] = from;
      const [toRow, toCol] = to;
      const pieceToMove = this.stateManager.getCell([fromRow, fromCol]);

      this.stateManager.placePiece([toRow, toCol], pieceToMove!);
      this.stateManager.removePiece([fromRow, fromCol]);

      if (this.isCheckMate()) {
        this.manager.winner = pieceToMove?.color;
      }

      logMovement(from, to, pieceToMove);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  castling(type: Castling, color: PieceColor) {
    CastlingManager.castle(this.stateManager, color, type);

    this.nextTurn();
  }
}

export default ChessBoard;
