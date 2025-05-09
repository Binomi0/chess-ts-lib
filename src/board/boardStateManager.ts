import { BoardCell, Position } from "../chessBoard";
import Piece, { PieceColor } from "../piece";
import {
  blackBishop,
  blackKing,
  blackKnight,
  blackPawn,
  blackQueen,
  blackRook,
  whiteBishop,
  whiteKing,
  whiteKnight,
  whitePawn,
  whiteQueen,
  whiteRook,
} from "../pieces/constants";
import { createFreshBoard } from "../utils/helpers";

class BoardStateManager {
  private board: BoardCell[][];

  constructor() {
    this.board = createFreshBoard();
    this.initializeBoard();
  }

  setEmptyBoard() {
    this.board = createFreshBoard();
  }

  initializeBoard() {
    // Set up pawns
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (row === 1) {
          this.placePiece([row, col], blackPawn);
        } else if (row === 6) {
          this.placePiece([row, col], whitePawn);
        }
      }
    }

    // Black pieces
    this.placePiece([0, 0], blackRook);
    this.placePiece([0, 1], blackKnight);
    this.placePiece([0, 2], blackBishop);
    this.placePiece([0, 3], blackQueen);
    this.placePiece([0, 4], blackKing);
    this.placePiece([0, 5], blackBishop);
    this.placePiece([0, 6], blackKnight);
    this.placePiece([0, 7], blackRook);

    // White pieces
    this.placePiece([7, 0], whiteRook);
    this.placePiece([7, 1], whiteKnight);
    this.placePiece([7, 2], whiteBishop);
    this.placePiece([7, 3], whiteQueen);
    this.placePiece([7, 4], whiteKing);
    this.placePiece([7, 5], whiteBishop);
    this.placePiece([7, 6], whiteKnight);
    this.placePiece([7, 7], whiteRook);
  }

  getCell(position: Position): BoardCell {
    const [row, col] = position;
    return this.board[row][col];
  }

  movePiece(from: Position, to: Position): void {
    const fromCell = this.getCell(from);
    if (!fromCell) {
      throw new Error("Invalid move: source cell is empty");
    }
    const toCell = this.getCell(to);
    if (toCell && toCell.color === fromCell.color) {
      throw new Error("Invalid move: target cell is occupied");
    }

    fromCell.validateMove(this, { from, to, piece: fromCell });

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

  findKing(turn: PieceColor): Position | null {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (
          this.board[row][col]?.color === turn &&
          this.board[row][col]?.type === "King"
        ) {
          return [row, col];
        }
      }
    }
    return null;
  }
}
export default BoardStateManager;
