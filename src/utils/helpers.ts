import type { Movement, Position } from "../chessBoard";
import type Piece from "../piece";
import { PieceColor } from "../piece";

export function isInBounds([x, y]: Position) {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}

export function logMovement(from: Position, to: Position, pieceToMove?: Piece) {
  console.log(
    `Moved ${pieceToMove?.color}-${pieceToMove?.type} from ${from[0]},${from[1]} to ${to[0]},${to[1]}`
  );
}

export function isCellEmpty(cell: Piece | undefined): boolean {
  return cell === undefined;
}

export function isCellBlocked(target?: Piece, movement?: Movement) {
  try {
    if (!target || !movement) {
      throw new Error("Invalid movement or target");
    }
    return target?.color === movement?.piece.color;
  } catch (error) {
    throw error;
  }
}

export function isCellCaptured(target?: Piece, color?: PieceColor): boolean {
  try {
    if (!target || !color) {
      throw new Error("Invalid movement or target");
    }
    return target?.color !== color;
  } catch (error) {
    throw error;
  }
}

export function isValidDestination(moves: Position[], target: Position) {
  if (!moves || !target) {
    throw new Error("Invalid moves or target");
  }

  const [tRow, tCol] = target;
  return moves.some(([r, c]) => r === tRow && c === tCol);
}
