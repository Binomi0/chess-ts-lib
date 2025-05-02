export type Players = {
  white: Player;
  black: Player;
};

class Player {
  name: string;
  movements: number = 0;

  constructor(name: string) {
    this.name = name;
  }

  addMovement() {
    this.movements++;
  }
}

export default Player;
