import Piece, { PieceColor } from "./piece";
import { BlackBishop, WhiteBishop } from "./pieces/bishop";
import { BlackKing, King, WhiteKing } from "./pieces/king";
import { BlackKnight, WhiteKnight } from "./pieces/knight";
import { BlackPawn, WhitePawn } from "./pieces/pawn";
import { BlackRook, WhiteRook } from "./pieces/rook";
import { BlackQueen, WhiteQueen } from "./pieces/queen";
import ChessBoardValidations from "./chessBoardValidations";
import Player from "./player";
import { logMovement } from "./utils/helpers";

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

  constructor() {
    // Define the initial positions of pieces on the board
    this.board = Array(8)
      .fill(undefined)
      .map(() => Array(8).fill(undefined));

    this.initializeBoard();
  }

  private initializeBoard() {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (row === 0) {
          if (col === 0) {
            this.board[row][col] = new BlackRook();
          } else if (col === 1) {
            this.board[row][col] = new BlackKnight();
          } else if (col === 2) {
            this.board[row][col] = new BlackBishop();
          } else if (col === 3) {
            this.board[row][col] = new BlackQueen();
          } else if (col === 4) {
            this.board[row][col] = new BlackKing();
          } else if (col === 5) {
            this.board[row][col] = new BlackBishop();
          } else if (col === 6) {
            this.board[row][col] = new BlackKnight();
          } else if (col === 7) {
            this.board[row][col] = new BlackRook();
          }
        } else if (row === 1) {
          this.board[row][col] = new BlackPawn();
        } else if (row === 6) {
          this.board[row][col] = new WhitePawn();
        } else if (row === 7) {
          if (col === 0) {
            this.board[row][col] = new WhiteRook();
          } else if (col === 1) {
            this.board[row][col] = new WhiteKnight();
          } else if (col === 2) {
            this.board[row][col] = new WhiteBishop();
          } else if (col === 3) {
            this.board[row][col] = new WhiteQueen();
          } else if (col === 4) {
            this.board[row][col] = new WhiteKing();
          } else if (col === 5) {
            this.board[row][col] = new WhiteBishop();
          } else if (col === 6) {
            this.board[row][col] = new WhiteKnight();
          } else if (col === 7) {
            this.board[row][col] = new WhiteRook();
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

  isCheck() {
    const result = ChessBoardValidations.isCheck(this.board, this.turn);
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
  }

  getBoard(): BoardCell[][] {
    return this.board;
  }

  getPosition(coords: Position) {
    return this.board[coords[0]][coords[1]];
  }

  handleMove(from: Position, to: Position) {
    this.isCheck();

    try {
      ChessBoardValidations.isValidTurn(this.board, from, this.turn);
      ChessBoardValidations.isValidMove(this.board, from, to);
    } catch (error) {
      console.error(error);
      throw error;
    }

    this.executeMovement(from, to);
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
    const whiteKing = new WhiteKing();
    whiteKing.castling(this.board, type);

    this.players.get("white")?.setCastled(type);
    this.nextTurn();
  }

  castlingBlack(type: Castling) {
    const blackKing = new BlackKing();
    blackKing.castling(this.board, type);

    this.players.get("black")?.setCastled(type);
    this.nextTurn();
  }
}

export default ChessBoard;
