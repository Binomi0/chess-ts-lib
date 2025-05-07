import { PieceColor } from "./piece";

class Player {
  movements: number = 0;
  color: PieceColor | undefined;
  timeElapsed: number = 0;

  constructor(public name: string) {}

  addTimeElapsed(time: number) {
    this.timeElapsed += time;
  }

  addMovement() {
    this.movements++;
  }

  addSide(color: PieceColor) {
    this.color = color;
  }
}

export default Player;
