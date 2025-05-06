import Piece, { PieceColor, PieceType } from "./piece";
import ChessBoardValidations from "./chessBoardValidations";
import Player from "./player";
import { createFreshBoard, logMovement } from "./utils/helpers";
import PieceFactory from "./pieces/factory";
import CastlingManager from "./castlingManager";

export type Movement = {
  from: Position;
  to: Position;
  piece: Piece;
};
export type BoardCell = Piece | undefined;
export type Castling = "queen" | "king";
export type Position = [number, number];

class ChessBoard {
  board: BoardCell[][];
  turn: PieceColor = PieceColor.White;
  players: Map<PieceColor, Player> = new Map();
  lastTurn: Position | undefined;
  castling: { [key in Castling]: boolean } = {
    queen: true,
    king: true,
  };
  movements: Movement[] = [];
  validMoves: Position[][] = [];

  constructor() {
    // Define the initial positions of pieces on the board
    this.board = createFreshBoard();

    this.initializeBoard();
  }

  private initializeBoard() {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (row === 0) {
          if (col === 0) {
            this.board[row][col] = PieceFactory.getPiece(
              PieceType.Rook,
              PieceColor.Black
            );
          } else if (col === 1) {
            this.board[row][col] = PieceFactory.getPiece(
              PieceType.Knight,
              PieceColor.Black
            );
          } else if (col === 2) {
            this.board[row][col] = PieceFactory.getPiece(
              PieceType.Bishop,
              PieceColor.Black
            );
          } else if (col === 3) {
            this.board[row][col] = PieceFactory.getPiece(
              PieceType.Queen,
              PieceColor.Black
            );
          } else if (col === 4) {
            this.board[row][col] = PieceFactory.getPiece(
              PieceType.King,
              PieceColor.Black
            );
          } else if (col === 5) {
            this.board[row][col] = PieceFactory.getPiece(
              PieceType.Bishop,
              PieceColor.Black
            );
          } else if (col === 6) {
            this.board[row][col] = PieceFactory.getPiece(
              PieceType.Knight,
              PieceColor.Black
            );
          } else if (col === 7) {
            this.board[row][col] = PieceFactory.getPiece(
              PieceType.Rook,
              PieceColor.Black
            );
          }
        } else if (row === 1) {
          this.board[row][col] = PieceFactory.getPiece(
            PieceType.Pawn,
            PieceColor.Black
          );
        } else if (row === 6) {
          this.board[row][col] = PieceFactory.getPiece(
            PieceType.Pawn,
            PieceColor.White
          );
        } else if (row === 7) {
          if (col === 0) {
            this.board[row][col] = PieceFactory.getPiece(
              PieceType.Rook,
              PieceColor.White
            );
          } else if (col === 1) {
            this.board[row][col] = PieceFactory.getPiece(
              PieceType.Knight,
              PieceColor.White
            );
          } else if (col === 2) {
            this.board[row][col] = PieceFactory.getPiece(
              PieceType.Bishop,
              PieceColor.White
            );
          } else if (col === 3) {
            this.board[row][col] = PieceFactory.getPiece(
              PieceType.Queen,
              PieceColor.White
            );
          } else if (col === 4) {
            this.board[row][col] = PieceFactory.getPiece(
              PieceType.King,
              PieceColor.White
            );
          } else if (col === 5) {
            this.board[row][col] = PieceFactory.getPiece(
              PieceType.Bishop,
              PieceColor.White
            );
          } else if (col === 6) {
            this.board[row][col] = PieceFactory.getPiece(
              PieceType.Knight,
              PieceColor.White
            );
          } else if (col === 7) {
            this.board[row][col] = PieceFactory.getPiece(
              PieceType.Rook,
              PieceColor.White
            );
          }
        }
      }
    }
  }

  // TODO: Set to private when ready
  nextTurn() {
    if (this.turn === PieceColor.White) {
      this.players.get(PieceColor.White)?.addMovement();
      this.turn = PieceColor.Black;
    } else {
      this.players.get(PieceColor.Black)?.addMovement();
      this.turn = PieceColor.White;
    }
  }

  isKingInCheck() {
    const result = ChessBoardValidations.isKingInCheck(this.board, this.turn);
    if (result) {
      console.log("Check!");
    }

    return result;
  }

  isCheckMate() {
    const result = ChessBoardValidations.isCheckMate(this.board, this.turn);
    if (result) {
      console.log("Checkmate!");
    }

    return result;
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
      ChessBoardValidations.isValidMove(this.board, from, to);
    } catch (error) {
      console.error(error);
      throw error;
    }

    this.executeMovement(from, to);

    if (this.isKingInCheck()) {
      console.log("Check!");
      this.executeMovement(to, from);
    }

    this.nextTurn();
  }

  executeMovement(from: Position, to: Position) {
    try {
      const [fromRow, fromCol] = from;
      const [toRow, toCol] = to;
      const pieceToMove = this.board[fromRow][fromCol];

      this.board[toRow][toCol] = pieceToMove;
      this.board[fromRow][fromCol] = undefined;

      logMovement(from, to, pieceToMove);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  castlingWhite(type: Castling) {
    const whiteKing = PieceFactory.getPiece(PieceType.King, PieceColor.White);
    CastlingManager.castle(this.board, whiteKing, type);

    this.nextTurn();
  }

  castlingBlack(type: Castling) {
    const blackKing = PieceFactory.getPiece(PieceType.King, PieceColor.Black);
    CastlingManager.castle(this.board, blackKing, type);

    this.nextTurn();
  }
}

export default ChessBoard;
