import type MovementManager from "../board/movementManager";
import type StateManager from "../board/stateManager";
import type TurnManager from "../board/turnManager";
import type Piece from "../model/piece";
import type Player from "../player";

export enum Castling {
  Queen = "queen",
  King = "king",
}
export type CastlingType = [PieceColor, Castling];
export type MovementType = "multi" | "single";
export type Movement = {
  from: Position;
  to: Position;
  piece: Piece;
};

export enum PieceType {
  King = "King",
  Queen = "Queen",
  Rook = "Rook",
  Bishop = "Bishop",
  Knight = "Knight",
  Pawn = "Pawn",
}

export enum PieceColor {
  White = "white",
  Black = "black",
}

export type BoardCell = Piece | undefined;
export type Position = [number, number];

export interface IGame {
  start(): void;
  addPlayer(player: Player): void;
  move(from: Position, to: Position): void;
  arePlayersReady: boolean;
}

export interface IChessBoard {
  stateManager: StateManager;
  moveManager: MovementManager;
  turn: PieceColor;
  nextTurn(): void;
  isKingInCheck(): boolean;
  isCheckMate(): boolean;
  getBoard(): BoardCell[][];
  getPosition(position: Position): BoardCell;
  handleMove(from: Position, to: Position): void;
  castling(type: Castling, color: PieceColor): void;
}

export interface IGameManager {
  started: boolean;
  timeElapsed: number;
  winner: PieceColor | undefined;
  players: Map<PieceColor, Player>;
  turnManager: TurnManager;
  startGame(): void;
  addPlayer(player: Player): void;
  arePlayersReady: boolean;
}

export abstract class State {
  abstract initializeBoard(): void;
  abstract setEmptyBoard(): void;
  abstract placePiece(position: Position, piece: Piece): void;
  abstract getCell(position: Position): BoardCell;
  abstract movePiece(from: Position, to: Position): void;
  abstract getBoardSnapshot(): void;
  abstract removePiece(position: Position): void;
  abstract findKing(color: PieceColor): Position | null;
}

export abstract class MoveManager {
  abstract getAvailableMoves(from: Position): Position[];
  abstract isCastlingMove(
    from: Position,
    to: Position,
  ): CastlingType | undefined;
  abstract isPromotion(
    to: Position,
    type: PieceType,
    color: PieceColor,
  ): boolean;
}
