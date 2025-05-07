import { PieceColor } from "../piece";

class TurnManager {
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
