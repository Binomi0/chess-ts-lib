import { BoardCell, Position } from "../chessBoard";
import Piece, { PieceColor, PieceType } from "../piece";
import PieceFactory from "../pieces/factory";
import { createFreshBoard } from "../utils/helpers";

class BoardStateManager {
  private board: BoardCell[][];

  constructor() {
    this.board = createFreshBoard(); // o desde FEN
    this.initializeBoard();
  }

  initializeBoard() {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (row === 0) {
          if (col === 0) {
            this.placePiece(
              [row, col],
              PieceFactory.getPiece(PieceType.Rook, PieceColor.Black),
            );
          } else if (col === 1) {
            this.placePiece(
              [row, col],
              PieceFactory.getPiece(PieceType.Knight, PieceColor.Black),
            );
          } else if (col === 2) {
            this.placePiece(
              [row, col],
              PieceFactory.getPiece(PieceType.Bishop, PieceColor.Black),
            );
          } else if (col === 3) {
            this.placePiece(
              [row, col],
              PieceFactory.getPiece(PieceType.Queen, PieceColor.Black),
            );
          } else if (col === 4) {
            this.placePiece(
              [row, col],
              PieceFactory.getPiece(PieceType.King, PieceColor.Black),
            );
          } else if (col === 5) {
            this.placePiece(
              [row, col],
              PieceFactory.getPiece(PieceType.Bishop, PieceColor.Black),
            );
          } else if (col === 6) {
            this.placePiece(
              [row, col],
              PieceFactory.getPiece(PieceType.Knight, PieceColor.Black),
            );
          } else if (col === 7) {
            this.placePiece(
              [row, col],
              PieceFactory.getPiece(PieceType.Rook, PieceColor.Black),
            );
          }
        } else if (row === 1) {
          this.placePiece(
            [row, col],
            PieceFactory.getPiece(PieceType.Pawn, PieceColor.Black),
          );
        } else if (row === 6) {
          this.placePiece(
            [row, col],
            PieceFactory.getPiece(PieceType.Pawn, PieceColor.White),
          );
        } else if (row === 7) {
          if (col === 0) {
            this.placePiece(
              [row, col],
              PieceFactory.getPiece(PieceType.Rook, PieceColor.White),
            );
          } else if (col === 1) {
            this.placePiece(
              [row, col],
              PieceFactory.getPiece(PieceType.Knight, PieceColor.White),
            );
          } else if (col === 2) {
            this.placePiece(
              [row, col],
              PieceFactory.getPiece(PieceType.Bishop, PieceColor.White),
            );
          } else if (col === 3) {
            this.placePiece(
              [row, col],
              PieceFactory.getPiece(PieceType.Queen, PieceColor.White),
            );
          } else if (col === 4) {
            this.placePiece(
              [row, col],
              PieceFactory.getPiece(PieceType.King, PieceColor.White),
            );
          } else if (col === 5) {
            this.placePiece(
              [row, col],
              PieceFactory.getPiece(PieceType.Bishop, PieceColor.White),
            );
          } else if (col === 6) {
            this.placePiece(
              [row, col],
              PieceFactory.getPiece(PieceType.Knight, PieceColor.White),
            );
          } else if (col === 7) {
            this.placePiece(
              [row, col],
              PieceFactory.getPiece(PieceType.Rook, PieceColor.White),
            );
          }
        }
      }
    }
  }

  getCell(position: Position): BoardCell {
    const [row, col] = position;
    return this.board[row][col];
  }

  movePiece(from: Position, to: Position): void {
    const fromCell = this.getCell(from);
    if (!fromCell) throw new Error("Invalid move: source cell is empty");

    const toCell = this.getCell(to);
    if (toCell && toCell.color === fromCell.color) {
      throw new Error("Invalid move: target cell is occupied");
    }

    this.placePiece(to, fromCell);
    this.removePiece(from);
  }

  placePiece(position: Position, piece: Piece): void {
    const [row, col] = position;
    this.board[row][col] = piece;
  }

  removePiece(position: Position): void {
    const [row, col] = position;
    this.board[row][col] = undefined;
  }

  getBoardSnapshot(): BoardCell[][] {
    return [...this.board.map((row) => [...row])];
  }
}
export default BoardStateManager;
