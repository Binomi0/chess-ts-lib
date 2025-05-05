import { BoardCell, Castling, Movement, Position } from "../chessBoard";
import Piece, { PieceColor } from "../piece";
import PieceDirections from "../PieceDirections";
import { isCellCaptured, isCellEmpty, isInBounds } from "../utils/helpers";
import { WhiteRook } from "./rook";

export class King extends Piece {
  protected readonly directions: Position[] = PieceDirections.king;

  constructor(color: PieceColor) {
    super(color, "King");
  }

  validateMove(board: BoardCell[][], movement: Movement): boolean {
    return this.validateSingleMove(board, this.directions, movement);
  }
}

export class BlackKing extends King {
  castlingRights = true;

  constructor() {
    super("black");
  }

  getAllAvailableMoves(board: BoardCell[][], from: Position) {
    super.getAllAvailableMoves(board, from, this.directions);
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
}

export class WhiteKing extends King {
  castlingRights = true;

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
    board[7][0] = undefined;
    board[7][4] = undefined;

    board[7][2] = new WhiteRook();
    board[7][1] = new WhiteKing();

    this.castlingRights = false;
  }

  castleKingSide(board: BoardCell[][]) {
    board[7][7] = undefined;
    board[7][4] = undefined;

    board[7][5] = new WhiteRook();
    board[7][6] = new WhiteKing();

    this.castlingRights = false;
  }
}
