import { PieceColor } from "./piece";

class Player {
  name: string;
  movements: number = 0;
  color: PieceColor | undefined;
  timeElapsed: number = 0;

  constructor(name: string) {
    this.name = name;
  }

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
