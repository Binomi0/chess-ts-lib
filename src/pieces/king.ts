import { BoardCell, Castling, Movement } from "../chessBoard";
import Piece, { PieceColor, Position } from "../piece";
import {
  isCellEmpty,
  isCellCaptured,
  isInBounds,
  isValidDestination,
} from "../utils/helpers";
import { WhiteRook } from "./rook";

export class King extends Piece {
  private static readonly directions: Position[] = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  constructor(color: PieceColor) {
    super(color, "King");
  }

  static validateMove(board: BoardCell[][], movement: Movement): boolean {
    const validMoves: Position[] = [];

    for (const [dx, dy] of this.directions) {
      const newRow = movement.from[0] + dx;
      const newCol = movement.from[1] + dy;

      if (isInBounds([newRow, newCol])) {
        const target = board[newRow][newCol];

        if (isCellEmpty(target) || isCellCaptured(target, movement)) {
          validMoves.push([newRow, newCol]);
        }
      }
    }

    if (isValidDestination(validMoves, movement.to)) {
      return true;
    }

    throw new Error(
      `Invalid move for ${movement.piece.type} from ${movement.from} to ${movement.to}`
    );
  }
}

export class WhiteKing extends King {
  private castlingRights = true;

  constructor() {
    super("white");
  }

  castling(board: BoardCell[][], side: Castling) {
    if (!this.canCastle(board, side)) {
      throw new Error("Cannot castle");
    }

    if (side === "king") {
      return this.castleKingSide(board);
    }

    if (side === "queen") {
      return this.castleQueenSide(board);
    }

    throw new Error("Invalid side for castling");
  }

  canCastle(board: BoardCell[][], side: Castling) {
    const hasRights = this.castlingRights;
    if (!hasRights) return false;

    if (side === "king") {
      return this.canCastleKingSide(board);
    }

    if (side === "queen") {
      return this.canCastleQueenSide(board);
    }

    throw new Error("Invalid side for castling");
  }

  canCastleKingSide(board: BoardCell[][]) {
    const bishop = board[0][5];
    const knight = board[0][6];

    if (bishop !== undefined || knight !== undefined) return false;

    const whiteKing = board[0][4];
    const whiteRook = board[0][7];
    if (whiteKing?.type === "King" && whiteRook?.type === "Rook") {
      return true;
    }

    throw new Error("Invalid castling rights for king");
  }

  canCastleQueenSide(board: BoardCell[][]) {
    const knight = board[0][1];
    const bishop = board[0][2];
    const queen = board[0][3];

    if (bishop !== undefined || knight !== undefined || queen !== undefined) {
      return false;
    }

    const whiteKing = board[0][4];
    const whiteRook = board[0][0];
    if (whiteKing?.type === "King" && whiteRook?.type === "Rook") {
      return true;
    }

    throw new Error("Invalid castling rights for queen");
  }

  castleQueenSide(board: BoardCell[][]) {
    board[0][0] = undefined;
    board[0][4] = undefined;

    board[0][1] = new WhiteRook();
    board[0][2] = new WhiteKing();

    this.castlingRights = false;
  }

  castleKingSide(board: BoardCell[][]) {
    board[0][7] = undefined;
    board[0][4] = undefined;

    board[0][6] = new WhiteRook();
    board[0][5] = new WhiteKing();

    this.castlingRights = false;
  }
}

export class BlackKing extends King {
  protected castlingRights = true;

  constructor() {
    super("black");
  }

  castling(board: BoardCell[][], side: Castling) {
    if (!this.canCastle(board, side)) {
      throw new Error("Cannot castle");
    }

    if (side === "king") {
      return this.castleKingSide(board);
    }

    if (side === "queen") {
      return this.castleQueenSide(board);
    }

    throw new Error("[castling] Invalid side");
  }

  canCastle(board: BoardCell[][], side: Castling) {
    const hasRights = this.castlingRights;
    if (!hasRights) return false;

    if (side === "king") {
      return this.canCastleKingSide(board);
    }

    if (side === "queen") {
      return this.canCastleQueenSide(board);
    }

    throw new Error("[canCastle] Invalid side");
  }

  canCastleKingSide(board: BoardCell[][]) {
    const bishop = board[7][6];
    const knight = board[7][5];
    if (bishop !== undefined || knight !== undefined) return false;

    const blackKing = board[7][4];
    const blackRook = board[7][7];
    if (blackKing?.type === "King" && blackRook?.type === "Rook") {
      return true;
    }

    throw new Error("[canCastleKingSide] Invalid castling rights");
  }

  canCastleQueenSide(board: BoardCell[][]) {
    const knight = board[7][1];
    const bishop = board[7][2];
    const queen = board[7][3];

    if (bishop !== undefined || knight !== undefined || queen !== undefined) {
      return false;
    }

    const blackKing = board[7][4];
    const blackRook = board[7][0];
    if (blackKing?.type === "King" && blackRook?.type === "Rook") {
      return true;
    }

    throw new Error("[canCastleQueenSide] Invalid castling rights");
  }

  castleQueenSide(board: BoardCell[][]) {
    board[7][7] = undefined;
    board[7][4] = undefined;

    board[7][6] = new WhiteRook();
    board[7][5] = new WhiteKing();

    this.castlingRights = false;
  }

  castleKingSide(board: BoardCell[][]) {
    board[7][0] = undefined;
    board[7][4] = undefined;

    board[7][1] = new WhiteRook();
    board[7][2] = new WhiteKing();

    this.castlingRights = false;
  }
}
