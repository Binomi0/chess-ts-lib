import ChessBoardValidations from "./board/boardValidations";
import CastlingManager from "./castlingManager";
import StateManager from "./board/stateManager";
import GameManager from "./gameManager";
import MovementManager from "./board/movementManager";
import {
  BoardCell,
  Position,
  PieceColor,
  Castling,
  IChessBoard,
} from "./types";

class ChessBoard implements IChessBoard {
  public stateManager: StateManager;
  public moveManager: MovementManager;

  constructor(public gameManager: GameManager) {
    this.stateManager = new StateManager();
    this.moveManager = new MovementManager(this.stateManager);
  }

  get turn() {
    return this.gameManager.turnManager.getCurrentTurn();
  }

  // TODO: Set to private when ready
  nextTurn() {
    this.gameManager.turnManager.switchTurn();
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
      if (!this.gameManager.turnManager.isValidTurn(piece.color)) {
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
      this.gameManager.turnManager.switchTurn();
    }
  }

  castling(type: Castling, color: PieceColor) {
    CastlingManager.castle(this.stateManager, color, type);

    this.gameManager.turnManager.switchTurn();
  }
}

export default ChessBoard;
