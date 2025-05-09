import { PieceColor } from "../types";

abstract class Turn {
  abstract switchTurn(): void;
  abstract getCurrentTurn(): PieceColor;
  abstract resetTurn(): void;
  abstract isValidTurn(pieceColor: PieceColor): boolean;
}

class TurnManager implements Turn {
  private currentTurn: PieceColor = PieceColor.White;

  constructor() {}

  switchTurn(): void {
    if (this.currentTurn === PieceColor.White) {
      this.currentTurn = PieceColor.Black;
    } else {
      this.currentTurn = PieceColor.White;
    }
  }

  getCurrentTurn(): PieceColor {
    return this.currentTurn;
  }

  resetTurn(): void {
    this.currentTurn = PieceColor.White;
  }

  isValidTurn(pieceColor: PieceColor): boolean {
    return pieceColor === this.currentTurn;
  }
}
export default TurnManager;
