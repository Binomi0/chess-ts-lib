import { Castling } from "./chessBoard";
import { PieceColor } from "./piece";

export type Players = {
  white: Player;
  black: Player;
};

class Player {
  name: string;
  movements: number = 0;
  color: PieceColor | undefined;
  private castled = "";

  constructor(name: string) {
    this.name = name;
  }

  addMovement() {
    this.movements++;
  }

  addSide(color: PieceColor) {
    this.color = color;
  }

  setCastled(castle: Castling) {
    this.castled = castle;
  }

  canCastle() {
    return !this.castled;
  }
}

export default Player;
