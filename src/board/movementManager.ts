import {
  Position,
  CastlingType,
  PieceType,
  PieceColor,
  Movement,
  Castling,
  MoveManager,
} from "../types";
import BoardValidations from "./boardValidations";
import MultiMove from "./multiMove";
import SingleMove from "./singleMove";
import type StateManager from "./stateManager";
import TurnManager from "./turnManager";

class MovementManager implements MoveManager {
  private readonly multiMoves = [
    PieceType.Rook,
    PieceType.Queen,
    PieceType.Bishop,
  ];
  private readonly singleMoves = [
    PieceType.Knight,
    PieceType.King,
    PieceType.Pawn,
  ];

  constructor(
    private stateManager: StateManager,
    private turnManager: TurnManager,
  ) {}

  private getManager(type: PieceType) {
    if (this.multiMoves.includes(type)) {
      return MultiMove;
    }
    if (this.singleMoves.includes(type)) {
      return SingleMove;
    }

    throw new Error("Invalid piece type");
  }

  validateMove(from: Position, to: Position) {
    const piece = this.stateManager.getCell(from);
    if (!piece) {
      throw new Error("Missing piece at from location");
    }

    if (piece.color === this.turnManager.getCurrentTurn()) {
      if (BoardValidations.isValidMove(this.stateManager, from, to)) {
        this.stateManager.movePiece(from, to);
        return true;
      }
    }

    return false;
  }

  getAvailableMoves(from: Position): Position[] {
    const piece = this.stateManager.getCell(from);
    if (!piece) return [];

    const manager = this.getManager(piece.type);
    const movement: Movement = { from, piece, to: [0, 0] };

    return manager.getAvailableMoves(this.stateManager, movement);
  }

  isCastlingMove(from: Position, to: Position): CastlingType | undefined {
    const isWhiteQueenCastle: Position[] = [
      [7, 4],
      [7, 0],
    ];
    const isWhiteKingCastle: Position[] = [
      [7, 4],
      [7, 7],
    ];
    const isBlackQueenCastle: Position[] = [
      [0, 4],
      [0, 0],
    ];
    const isBlackKingCastle: Position[] = [
      [0, 4],
      [0, 7],
    ];

    const index = [
      isWhiteQueenCastle,
      isWhiteKingCastle,
      isBlackQueenCastle,
      isBlackKingCastle,
    ].findIndex(
      (castlingMove) =>
        castlingMove[0][0] === from[0] &&
        castlingMove[0][1] === from[1] &&
        castlingMove[1][0] === to[0] &&
        castlingMove[1][1] === to[1],
    );

    switch (index) {
      case 0:
        return [PieceColor.White, Castling.Queen];
      case 1:
        return [PieceColor.White, Castling.King];
      case 2:
        return [PieceColor.Black, Castling.Queen];
      case 3:
        return [PieceColor.Black, Castling.King];
      default:
        return undefined;
    }
  }

  isPromotion(to: Position, type: PieceType, color: PieceColor): boolean {
    if (type !== PieceType.Pawn) {
      return false;
    }

    const promotionRow = color === PieceColor.White ? 0 : 7;
    const [toRow] = to;

    return toRow === promotionRow;
  }
}

export default MovementManager;
