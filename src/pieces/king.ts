import { BoardCell, Movement } from "../chessBoard";
import Piece, { PieceColor, Position } from "../piece";
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

      if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        const target = board[newRow][newCol];

        if (target === undefined || target.color !== movement.piece.color) {
          validMoves.push([newRow, newCol]);
        }
      }
    }

    return validMoves.some(
      (move) => move[0] === movement.to[0] && move[1] === movement.to[1]
    );
  }
}

export class WhiteKing extends King {
  private castlingRights = true;

  constructor() {
    super("white");
  }

  canCastling(board: BoardCell[][], side: "queen" | "king") {
    const hasRights = this.castlingRights;
    if (!hasRights) return false;

    if (side === "king") {
      const bishop = board[0][5];
      const knight = board[0][6];
      if (bishop !== undefined || knight !== undefined) return false;

      const whiteKing = board[0][4];
      const whiteRook = board[0][7];
      if (whiteKing?.type === "King" && whiteRook?.type === "Rook") {
        return true;
      }

      return false;
    } else if (side === "queen") {
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

      return false;
    }
  }

  castling(board: BoardCell[][], side: "queen" | "king") {
    if (this.canCastling(board, side)) {
      if (side === "king") {
        return this.kingCastling(board);
      } else if (side === "queen") {
        return this.queenCastling(board);
      }

      throw new Error("`side` should be defined");
    }

    throw new Error("Cannot castle");
  }

  queenCastling(board: BoardCell[][]) {
    board[0][0] = undefined;
    board[0][5] = undefined;

    board[0][1] = new WhiteRook();
    board[0][2] = new WhiteKing();

    this.castlingRights = false;
  }

  kingCastling(board: BoardCell[][]) {
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

  castling(board: BoardCell[][], side: "queen" | "king") {
    if (this.canCastling(board, side)) {
      if (side === "king") {
        this.kingCastling(board);
        return true;
      } else if (side === "queen") {
        this.queenCastling(board);
        return true;
      }
      throw new Error("Invalid castling side");
    }

    throw new Error("Cannot castle");
  }
  canCastling(board: BoardCell[][], side: "queen" | "king") {
    const hasRights = this.castlingRights;
    if (!hasRights) return false;

    if (side === "king") {
      const bishop = board[7][6];
      const knight = board[7][5];
      if (bishop !== undefined || knight !== undefined) return false;

      const blackKing = board[7][4];
      const blackRook = board[7][7];
      if (blackKing?.type === "King" && blackRook?.type === "Rook") {
        return true;
      }

      return false;
    } else if (side === "queen") {
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

      return false;
    }
  }

  queenCastling(board: BoardCell[][]) {
    board[7][7] = undefined;
    board[7][4] = undefined;

    board[7][6] = new WhiteRook();
    board[7][5] = new WhiteKing();

    this.castlingRights = false;
  }

  kingCastling(board: BoardCell[][]) {
    board[7][0] = undefined;
    board[7][4] = undefined;

    board[7][1] = new WhiteRook();
    board[7][2] = new WhiteKing();

    this.castlingRights = false;
  }
}
