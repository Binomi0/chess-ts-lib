import ChessBoard, { BoardCell, Movement } from "../chessBoard";
import Piece, { type PieceColor } from "../piece";

type MovementVerticalParam = {
  board: BoardCell[][];
  steps: Array<undefined>;
  fromRow: number;
  colIndex: number;
  ownColor: PieceColor;
  enemyColor: PieceColor;
};

type MovementHorizontalParam = {
  board: BoardCell[][];
  steps: Array<undefined>;
  fromCol: number;
  rowIndex: number;
  ownColor: PieceColor;
  enemyColor: PieceColor;
};

export class Rook extends Piece {
  constructor(color: PieceColor) {
    super(color, "Rook");
  }

  static validateMove(
    board: BoardCell[][],
    movement: Movement,
    isWhite: boolean
  ): boolean {
    if (isWhite) {
      return new WhiteRook().validateMove(board, movement);
    }

    return new BlackRook().validateMove(board, movement);
  }

  getSteps(range: number) {
    if (range > 0 || range < 0) {
      return new Array(Math.abs(range)).fill(undefined);
    }
    return [];
  }

  checkVertical(
    board: BoardCell[][],
    movement: Movement,
    isWhite: boolean
  ): boolean {
    const [fromRow, fromCol] = movement.from;
    const [toRow] = movement.to;
    const range = fromRow - toRow;

    const currentMovement: MovementVerticalParam = {
      board,
      fromRow,
      colIndex: fromCol,
      steps: this.getSteps(range),
      ownColor: isWhite ? "white" : "black",
      enemyColor: isWhite ? "black" : "white",
    };

    const isUpward = fromRow < toRow;
    const isDownward = fromRow > toRow;
    if (isUpward) {
      return this.canMoveUpward(currentMovement);
    }

    if (isDownward) {
      return this.canMoveDownward(currentMovement);
    }

    return false;
  }

  checkHorizontal(
    board: BoardCell[][],
    movement: Movement,
    isWhite: boolean
  ): boolean {
    const [fromRow, fromCol] = movement.from;
    const [, toCol] = movement.to;
    const range = fromCol - toCol;

    const currentMovement: MovementHorizontalParam = {
      board,
      fromCol,
      rowIndex: fromRow,
      steps: this.getSteps(range),
      ownColor: isWhite ? "white" : "black",
      enemyColor: isWhite ? "black" : "white",
    };

    const isForward = range < 0;
    if (isForward) {
      return this.canMoveForward(currentMovement);
    }

    const isBackward = range > 0;
    if (isBackward) {
      return this.canMoveBackward(currentMovement);
    }

    return false;
  }

  canMoveUpward(movement: MovementVerticalParam) {
    const rowIndex = movement.fromRow + 1;

    return movement.steps.every((_, i) => {
      const cellPiece = movement.board[rowIndex + i][movement.colIndex];

      if (cellPiece?.color === movement.ownColor) {
        return false;
      } else if (cellPiece?.color === movement.enemyColor) {
        const isTarget = movement.steps.length - 1 === i;

        return isTarget;
      }
      return true;
    });
  }

  canMoveDownward(movement: MovementVerticalParam) {
    const rowIndex = movement.fromRow - 1;

    return movement.steps.every((_, i) => {
      const cellPiece = movement.board[rowIndex - i][movement.colIndex];

      if (cellPiece?.color === movement.ownColor) {
        return false;
      } else if (cellPiece?.color === movement.enemyColor) {
        const isTarget = movement.steps.length - 1 === i;

        return isTarget;
      }
      return true;
    });
  }

  canMoveForward(movement: MovementHorizontalParam) {
    const colIndex = movement.fromCol + 1;

    return movement.steps.every((_, i) => {
      const cellPiece = movement.board[movement.rowIndex][colIndex + i];

      if (cellPiece?.color === movement.ownColor) {
        return false;
      } else if (cellPiece?.color === movement.enemyColor) {
        const isTarget = movement.steps.length - 1 === i;

        return isTarget;
      }
      return true;
    });
  }

  canMoveBackward(movement: MovementHorizontalParam) {
    const colIndex = movement.fromCol - 1;

    return movement.steps.every((_, i) => {
      const cellPiece = movement.board[movement.rowIndex][colIndex - i];

      if (cellPiece?.color === movement.ownColor) {
        return false;
      } else if (cellPiece?.color === movement.enemyColor) {
        const isTarget = movement.steps.length - 1 === i;

        return isTarget;
      }
      return true;
    });
  }
}

export class WhiteRook extends Rook {
  constructor() {
    super("white");
  }

  validateMove(board: ChessBoard["board"], movement: Movement): boolean {
    const [fromRow, fromCol] = movement.from;
    const [toRow, toCol] = movement.to;

    const isHorizontal = fromRow === toRow && fromCol !== toCol;
    const isVertical = fromCol === toCol && fromRow !== toRow;

    if (isHorizontal) {
      return this.checkHorizontal(board, movement, true);
    }

    if (isVertical) {
      return this.checkVertical(board, movement, true);
    }

    return false;
  }
}

export class BlackRook extends Rook {
  constructor() {
    super("black");
  }

  validateMove(board: ChessBoard["board"], movement: Movement): boolean {
    const [fromRow, fromCol] = movement.from;
    const [toRow, toCol] = movement.to;

    const isHorizontal = fromRow === toRow && fromCol !== toCol;
    const isVertical = fromCol === toCol && fromRow !== toRow;

    if (isHorizontal) {
      return this.checkHorizontal(board, movement, false);
    }

    if (isVertical) {
      return this.checkVertical(board, movement, false);
    }

    return false;
  }
}
