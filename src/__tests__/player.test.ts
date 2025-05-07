import { PieceColor } from "../piece";
import Player from "../player";

describe("Player", () => {
  it("should create a new player with a name", () => {
    const player = new Player("John");
    expect(player.name).toBe("John");
  });
  it("should add time elapsed to the player", () => {
    const player = new Player("John");
    player.addTimeElapsed(10);
    expect(player.timeElapsed).toBe(10);
  });
  it("should add a movement to the player", () => {
    const player = new Player("John");
    player.addMovement();
    expect(player.movements).toBe(1);
  });
  it("should add a side color to the player", () => {
    const player = new Player("John");
    player.addSide(PieceColor.White);
    expect(player.color).toBe(PieceColor.White);
  });
});
