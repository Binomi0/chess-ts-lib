import Piece, { PieceColor, Position } from "./piece";
import { Bishop } from "./pieces/bishop";
import { BlackKing, King, WhiteKing } from "./pieces/king";
import { Knight } from "./pieces/knight";
import { Pawn } from "./pieces/pawn";
import { Rook } from "./pieces/rook";
import { Queen, WhiteQueen } from "./pieces/queen";

export type Movement = {
  from: Position;
  to: Position;
  piece: Piece;
};
export type BoardCell = Piece | undefined;

class ChessBoard {
  board: BoardCell[][];
  turn: PieceColor = "white";

  constructor() {
    // Define the initial positions of pieces on the board
    this.board = Array(8)
      .fill(undefined)
      .map(() => Array(8).fill(undefined));

    this.initializeBoard();
  }

  // Set to private when ready
  nextTurn() {
    if (this.turn === "white") {
      this.turn = "black";
    } else {
      this.turn = "white";
    }
  }

  getBoard(): BoardCell[][] {
    return [...this.board];
  }

  getPosition(coords: Position) {
    return this.board[coords[0]][coords[1]];
  }

  handleMove(from: Position, to: Position) {
    if (!this.isValidTurn(from)) {
      throw new Error("Invalid turn");
    }

    if (!this.isValidMove(from, to)) {
      throw new Error("Invalid move");
    }

    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;
    const pieceToMove = this.board[fromRow][fromCol];

    // Execute movement
    this.board[toRow][toCol] = pieceToMove;
    this.board[fromRow][fromCol] = undefined;

    console.log(
      `Moved ${pieceToMove?.type} from ${from[0]},${from[1]} to ${to[0]},${to[1]}`
    );
    this.nextTurn();
  }

  private isValidTurn(from: Position): boolean {
    const currentPiece = this.board[from[0]][from[1]];

    if (
      (this.turn === "white" && currentPiece?.color === "white") ||
      (this.turn === "black" && currentPiece?.color === "black")
    ) {
      return true;
    }

    return false;
  }

  private isValidMove(from: [number, number], to: [number, number]): boolean {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;

    // La ficha no existe en esa posición
    if (this.board[fromRow][fromCol] === undefined) {
      console.log("No piece at that position");
      return false;
    }

    const piece = this.board[fromRow][fromCol];
    const destinationPiece = this.board[toRow][toCol];

    if (destinationPiece && destinationPiece.color === piece.color) {
      console.log("Can't capture own piece");
      return false;
    }

    if (!this.isInBounds(from) || !this.isInBounds(to)) {
      console.log("Out of bounds");
      return false;
    }

    const isWhite = piece.color === "white";
    const movement = { from, to, piece };

    switch (piece.type) {
      case "Pawn": // Peón
        return Pawn.validateMove(this.board, movement, isWhite);
      case "Rook": // Torre
        return Rook.validateMove(this.board, movement, isWhite);
      case "Knight": // Caballo
        return Knight.validateMove(this.board, movement, isWhite);
      case "Bishop": // Bispo
        return Bishop.validateMove(this.board, movement);
      case "Queen": // Reina
        return Queen.validateMove(this.board, movement);
      case "King": // Rey
        return King.validateMove(this.board, movement);
      default:
        console.error("Invalid piece type");
        return false;
    }
  }

  isInBounds([x, y]: [number, number]) {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
  }

  private initializeBoard() {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (row === 0) {
          if (col === 0) {
            this.board[row][col] = new Rook("white");
          } else if (col === 1) {
            this.board[row][col] = new Knight("white");
          } else if (col === 2) {
            this.board[row][col] = new Bishop("white");
          } else if (col === 3) {
            this.board[row][col] = new Queen("white");
          } else if (col === 4) {
            this.board[row][col] = new King("white");
          } else if (col === 5) {
            this.board[row][col] = new Bishop("white");
          } else if (col === 6) {
            this.board[row][col] = new Knight("white");
          } else if (col === 7) {
            this.board[row][col] = new Rook("white");
          }
        } else if (row === 1) {
          this.board[row][col] = new Pawn("white");
        } else if (row === 6) {
          this.board[row][col] = new Pawn("black");
        } else if (row === 7) {
          if (col === 0) {
            this.board[row][col] = new Rook("black");
          } else if (col === 1) {
            this.board[row][col] = new Knight("black");
          } else if (col === 2) {
            this.board[row][col] = new Bishop("black");
          } else if (col === 3) {
            this.board[row][col] = new Queen("black");
          } else if (col === 4) {
            this.board[row][col] = new King("black");
          } else if (col === 5) {
            this.board[row][col] = new Bishop("black");
          } else if (col === 6) {
            this.board[row][col] = new Knight("black");
          } else if (col === 7) {
            this.board[row][col] = new Rook("black");
          }
        }
      }
    }
  }

  castling(color: PieceColor, type: "queen" | "king") {
    if (color === "white") {
      if (type === "queen") {
        return new WhiteKing().castling(this.board, "queen");
      } else if (type === "king") {
        return new WhiteKing().castling(this.board, "king");
      }

      throw new Error("Invalid castling type for white king");
    } else if (color === "black") {
      if (type === "queen") {
        return new BlackKing().castling(this.board, "queen");
      } else if (type === "king") {
        return new BlackKing().castling(this.board, "king");
      }

      throw new Error("Invalid castling type for black king");
    }

    throw new Error("Invalid color for king castling");
  }
}

export default ChessBoard;
