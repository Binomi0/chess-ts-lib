import { King } from "../model/king";
import { Position, PieceColor, Castling, BoardCell, PieceType } from "../types";
import StateManager from "./stateManager";

type CastlingData = [Position, Position[], Position, Position];

class CastlingManager {
  static castlingRights: Record<PieceColor, boolean> = {
    [PieceColor.White]: true,
    [PieceColor.Black]: true,
  };

  static castle(stateManager: StateManager, color: PieceColor, side: Castling) {
    if (!this.castlingRights[color]) return false;

    if (this.canCastle(stateManager, color, side)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [rookPos, _, newKingPos, newRookPos] = this.getCastlingData(
        color,
        side,
      );

      this.execCastling(stateManager, color, rookPos, newKingPos, newRookPos);
      this.setCastlingLocked(color);

      return true;
    }

    throw new Error("Invalid castling move");
  }

  static canCastle(
    stateManager: StateManager,
    color: PieceColor,
    side: Castling,
  ) {
    if (!this.castlingRights[color]) return false;

    const [rookPos, emptySquares] = this.getCastlingData(color, side);

    return this.validateConditions(
      stateManager.getBoardSnapshot(),
      color,
      rookPos,
      emptySquares,
    );
  }

  private static getCastlingData(
    color: PieceColor,
    side: Castling,
  ): CastlingData {
    const isWhite = color === PieceColor.White;
    const backRank = isWhite ? 7 : 0;

    if (side === "king") {
      return this.getKingSideData(backRank);
    } else if (side === "queen") {
      return this.getQueenSideData(backRank);
    }

    throw new Error("Wrong side for castling");
  }

  private static getKingSideData(backRank: number): CastlingData {
    return [
      [backRank, 7], // Rook position
      [
        [backRank, 5],
        [backRank, 6],
      ], // Squares that must be empty
      [backRank, 6], // New king position
      [backRank, 5], // New rook position
    ];
  }

  private static getQueenSideData(backRank: number): CastlingData {
    return [
      [backRank, 0],
      [
        [backRank, 1],
        [backRank, 2],
        [backRank, 3],
      ],
      [backRank, 2],
      [backRank, 3],
    ];
  }

  private static validateConditions(
    board: BoardCell[][],
    color: PieceColor,
    rookPos: Position,
    emptySquares: Position[],
  ): boolean {
    const [rookRow, rookCol] = rookPos;
    const rook = board[rookRow][rookCol];

    // Verificar que la torre exista y sea del mismo color
    if (!rook || rook.type !== PieceType.Rook || rook.color !== color) {
      return false;
    }
    // Verificar que las casillas intermedias estén vacías
    const isWayFree = emptySquares.every(([row, col]) => {
      const piece = board[row][col];
      return piece === undefined;
    });

    return isWayFree;
  }

  private static execCastling(
    stateManager: StateManager,
    color: PieceColor,
    rookPos: Position,
    newKingPos: Position,
    newRookPos: Position,
  ): void {
    if (color === PieceColor.White) {
      stateManager.removePiece([7, 4]);
    } else if (color === PieceColor.Black) {
      stateManager.removePiece([0, 4]);
    }

    const rook = stateManager.getCell([rookPos[0], rookPos[1]]);
    if (!rook) {
      throw new Error("Missing rook");
    }
    stateManager.removePiece([rookPos[0], rookPos[1]]);
    stateManager.placePiece([newRookPos[0], newRookPos[1]], rook);
    stateManager.placePiece([newKingPos[0], newKingPos[1]], new King(color));
  }

  private static setCastlingLocked(color: PieceColor): void {
    this.castlingRights[color] = false;
  }
}

export default CastlingManager;
