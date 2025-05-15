import type Piece from "../model/piece";
import type { Position, Movement, BoardCell, PieceColor } from "../types";

export function isInBounds([x, y]: Position) {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}

export function logMovement(from: Position, to: Position, pieceToMove?: Piece) {
  console.log(
    `Moved ${pieceToMove?.color}-${pieceToMove?.type} from ${from[0]},${from[1]} to ${to[0]},${to[1]}`,
  );
}

export function isCellEmpty(cell: Piece | undefined): boolean {
  return cell === undefined;
}

export function isCellBlocked(target?: Piece, movement?: Movement) {
  return target?.color === movement?.piece.color;
}

export function isCellCaptured(target?: Piece, color?: PieceColor): boolean {
  return target?.color !== color;
}

export function isValidDestination(moves: Position[], target: Position) {
  if (!moves || !target) {
    throw new Error("Invalid moves or target");
  }

  const [tRow, tCol] = target;
  return moves.some(([r, c]) => r === tRow && c === tCol);
}

export function createFreshBoard(): BoardCell[][] {
  return Array.from({ length: 8 }, () => Array(8).fill(undefined));
}

export function cloneBoard(board: BoardCell[][]): BoardCell[][] {
  return board.map((row) => [...row]);
}

export function isSamePosition(a: Position, b: Position): boolean {
  return a[0] === b[0] && a[1] === b[1];
}
