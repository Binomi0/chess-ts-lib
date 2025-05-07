import Piece, { PieceColor, PieceType } from "./piece";
import ChessBoardValidations from "./chessBoardValidations";
import { createFreshBoard, logMovement } from "./utils/helpers";
import PieceFactory from "./pieces/factory";
import CastlingManager from "./castlingManager";
import BoardMovements from "./board/boardMovements";
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
  board: BoardCell[][];
  lastTurn: Position | undefined;
  boardMovements: BoardMovements;
  movements: Movement[] = [];
  turnManager: TurnManager = new TurnManager();
  stateManager: BoardStateManager = new BoardStateManager();

  constructor(private manager: GameManager) {
    // Define the initial positions of pieces on the board
    this.board = createFreshBoard();
    this.initializeBoard();
    this.boardMovements = new BoardMovements(this.board);
  }

  get turn() {
    return this.turnManager.getCurrentTurn();
  }

  private initializeBoard() {
    this.stateManager.initializeBoard();
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (row === 0) {
          if (col === 0) {
            this.board[row][col] = PieceFactory.getPiece(
              PieceType.Rook,
              PieceColor.Black,
            );
          } else if (col === 1) {
            this.board[row][col] = PieceFactory.getPiece(
              PieceType.Knight,
              PieceColor.Black,
            );
          } else if (col === 2) {
            this.board[row][col] = PieceFactory.getPiece(
              PieceType.Bishop,
              PieceColor.Black,
            );
          } else if (col === 3) {
            this.board[row][col] = PieceFactory.getPiece(
              PieceType.Queen,
              PieceColor.Black,
            );
          } else if (col === 4) {
            this.board[row][col] = PieceFactory.getPiece(
              PieceType.King,
              PieceColor.Black,
            );
          } else if (col === 5) {
            this.board[row][col] = PieceFactory.getPiece(
              PieceType.Bishop,
              PieceColor.Black,
            );
          } else if (col === 6) {
            this.board[row][col] = PieceFactory.getPiece(
              PieceType.Knight,
              PieceColor.Black,
            );
          } else if (col === 7) {
            this.board[row][col] = PieceFactory.getPiece(
              PieceType.Rook,
              PieceColor.Black,
            );
          }
        } else if (row === 1) {
          this.board[row][col] = PieceFactory.getPiece(
            PieceType.Pawn,
            PieceColor.Black,
          );
        } else if (row === 6) {
          this.board[row][col] = PieceFactory.getPiece(
            PieceType.Pawn,
            PieceColor.White,
          );
        } else if (row === 7) {
          if (col === 0) {
            this.board[row][col] = PieceFactory.getPiece(
              PieceType.Rook,
              PieceColor.White,
            );
          } else if (col === 1) {
            this.board[row][col] = PieceFactory.getPiece(
              PieceType.Knight,
              PieceColor.White,
            );
          } else if (col === 2) {
            this.board[row][col] = PieceFactory.getPiece(
              PieceType.Bishop,
              PieceColor.White,
            );
          } else if (col === 3) {
            this.board[row][col] = PieceFactory.getPiece(
              PieceType.Queen,
              PieceColor.White,
            );
          } else if (col === 4) {
            this.board[row][col] = PieceFactory.getPiece(
              PieceType.King,
              PieceColor.White,
            );
          } else if (col === 5) {
            this.board[row][col] = PieceFactory.getPiece(
              PieceType.Bishop,
              PieceColor.White,
            );
          } else if (col === 6) {
            this.board[row][col] = PieceFactory.getPiece(
              PieceType.Knight,
              PieceColor.White,
            );
          } else if (col === 7) {
            this.board[row][col] = PieceFactory.getPiece(
              PieceType.Rook,
              PieceColor.White,
            );
          }
        }
      }
    }
  }

  // TODO: Set to private when ready
  nextTurn() {
    this.turnManager.switchTurn();
  }

  isKingInCheck() {
    return ChessBoardValidations.isKingInCheck(this.board, this.turn);
  }

  isCheckMate() {
    return ChessBoardValidations.isCheckMate(this.board, this.turn);
  }

  getBoard(): BoardCell[][] {
    return this.board;
  }

  getPosition(coords: Position) {
    return this.board[coords[0]][coords[1]];
  }

  handleMove(from: Position, to: Position) {
    try {
      ChessBoardValidations.isValidTurn(this.board, from, this.turn);
      const castlingMove = this.boardMovements.isCastlingMove(from, to);

      if (castlingMove) {
        const [color, side] = castlingMove;
        CastlingManager.castle(this.board, color, side);
      } else {
        ChessBoardValidations.isValidMove(this.board, from, to);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }

    this.executeMovement(from, to);

    if (this.isKingInCheck()) {
      this.executeMovement(to, from);
    } else {
      this.nextTurn();
    }
  }

  private executeMovement(from: Position, to: Position) {
    try {
      const [fromRow, fromCol] = from;
      const [toRow, toCol] = to;
      const pieceToMove = this.board[fromRow][fromCol];

      this.board[toRow][toCol] = pieceToMove;
      this.board[fromRow][fromCol] = undefined;

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
    CastlingManager.castle(this.board, color, type);

    this.nextTurn();
  }
}

export default ChessBoard;
