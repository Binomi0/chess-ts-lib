import { Movement } from "../chessBoard";
import Piece, { PieceColor, Position } from "../piece";

export function isInBounds([x, y]: [number, number]) {
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

export function isCellCaptured(target?: Piece, movement?: Movement): boolean {
  try {
    if (!target || !movement) {
      throw new Error("Invalid movement or target");
    }
    return target?.color !== movement?.piece.color;
  } catch (error) {
    throw error;
  }
}

export function isValidDestination(moves: Position[], target: Position) {
  return moves.some(([row, col]) => row === target[0] && col === target[1]);
}
