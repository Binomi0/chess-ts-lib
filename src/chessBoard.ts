import Piece from "./piece";
import Bishop from "./pieces/bishop";
import King from "./pieces/king";
import Knight from "./pieces/knight";
import Pawn from "./pieces/pawn";
import Queen from "./pieces/queen";
import Rook from "./pieces/rook";

type BoardCell = Piece | undefined;

class ChessBoard {
  private board: BoardCell[][];

  constructor() {
    this.board = Array(8)
      .fill(undefined)
      .map(() => Array(8).fill(undefined));

    this.initializeBoard();
  }

  getBoard(): BoardCell[][] {
    return [...this.board];
  }

  private initializeBoard() {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        // Inserta las blancas en la fila 1
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
}

export default ChessBoard;
