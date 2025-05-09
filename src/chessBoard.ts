import Piece, { PieceColor } from "./piece";
import ChessBoardValidations from "./board/boardValidations";
import CastlingManager from "./castlingManager";
import TurnManager from "./board/turnManager";
import StateManager from "./board/stateManager";
import GameManager from "./gameManager";
import MovementManager from "./board/movementManager";

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
  public stateManager: StateManager;
  public moveManager: MovementManager;

  constructor(
    public gameManager: GameManager,
    public turnManager: TurnManager,
  ) {
    this.stateManager = new StateManager();
    this.moveManager = new MovementManager(this.stateManager);
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
      this.stateManager,
      this.stateManager.getBoardSnapshot(),
      this.turn,
    );
  }

  isCheckMate() {
    return ChessBoardValidations.isCheckMate(this.stateManager, this.turn);
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
      const castlingMove = this.moveManager.isCastlingMove(from, to);

      if (castlingMove) {
        const [color, side] = castlingMove;
        CastlingManager.castle(this.stateManager, color, side);
      } else {
        ChessBoardValidations.isValidMove(this.stateManager, from, to);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }

    this.stateManager.movePiece(from, to);

    if (this.isKingInCheck()) {
      this.stateManager.movePiece(from, to);
    } else {
      this.turnManager.switchTurn();
    }
  }

  castling(type: Castling, color: PieceColor) {
    CastlingManager.castle(this.stateManager, color, type);

    this.turnManager.switchTurn();
  }
}

export default ChessBoard;
