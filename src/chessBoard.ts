import Piece, { PieceColor } from "./piece";
import { BlackBishop, WhiteBishop } from "./pieces/bishop";
import { BlackKing, King, WhiteKing } from "./pieces/king";
import { BlackKnight, WhiteKnight } from "./pieces/knight";
import { BlackPawn, WhitePawn } from "./pieces/pawn";
import { BlackRook, WhiteRook } from "./pieces/rook";
import { BlackQueen, WhiteQueen } from "./pieces/queen";
import ChessBoardValidations from "./chessBoardValidations";
import Player from "./player";
import { createFreshBoard, logMovement } from "./utils/helpers";
import PieceFactory from "./pieces/factory";
import CastlingManager from "./castlingManager";
import { PieceType } from "./constants";

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
  turn: PieceColor = "white";
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
            this.board[row][col] = PieceFactory.getPiece("Rook", "black");
          } else if (col === 1) {
            this.board[row][col] = PieceFactory.getPiece("Knight", "black");
          } else if (col === 2) {
            this.board[row][col] = PieceFactory.getPiece("Bishop", "black");
          } else if (col === 3) {
            this.board[row][col] = PieceFactory.getPiece("Queen", "black");
          } else if (col === 4) {
            this.board[row][col] = PieceFactory.getPiece("King", "black");
          } else if (col === 5) {
            this.board[row][col] = PieceFactory.getPiece("Bishop", "black");
          } else if (col === 6) {
            this.board[row][col] = PieceFactory.getPiece("Knight", "black");
          } else if (col === 7) {
            this.board[row][col] = PieceFactory.getPiece("Rook", "black");
          }
        } else if (row === 1) {
          this.board[row][col] = PieceFactory.getPiece("Pawn", "black");
        } else if (row === 6) {
          this.board[row][col] = PieceFactory.getPiece("Pawn", "white");
        } else if (row === 7) {
          if (col === 0) {
            this.board[row][col] = PieceFactory.getPiece("Rook", "white");
          } else if (col === 1) {
            this.board[row][col] = PieceFactory.getPiece("Knight", "white");
          } else if (col === 2) {
            this.board[row][col] = PieceFactory.getPiece("Bishop", "white");
          } else if (col === 3) {
            this.board[row][col] = PieceFactory.getPiece("Queen", "white");
          } else if (col === 4) {
            this.board[row][col] = PieceFactory.getPiece("King", "white");
          } else if (col === 5) {
            this.board[row][col] = PieceFactory.getPiece("Bishop", "white");
          } else if (col === 6) {
            this.board[row][col] = PieceFactory.getPiece("Knight", "white");
          } else if (col === 7) {
            this.board[row][col] = PieceFactory.getPiece("Rook", "white");
          }
        }
      }
    }
  }

  // Set to private when ready
  nextTurn() {
    if (this.turn === "white") {
      this.players.get("white")?.addMovement();
      this.turn = "black";
    } else {
      this.players.get("black")?.addMovement();
      this.turn = "white";
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
    const whiteKing = PieceFactory.getPiece(PieceType.King, "white");
    CastlingManager.castle(this.board, whiteKing as WhiteKing, type);

    this.players.get("white")?.setCastled(type);
    this.nextTurn();
  }

  castlingBlack(type: Castling) {
    const blackKing = PieceFactory.getPiece(PieceType.King, "black");
    CastlingManager.castle(this.board, blackKing as BlackKing, type);

    this.players.get("black")?.setCastled(type);
    this.nextTurn();
  }
}

export default ChessBoard;
