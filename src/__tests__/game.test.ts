import Game from "../game";
import { PieceColor } from "../piece";
import Player from "../player";

describe("Game", () => {
  it("should be defined", () => {
    expect(Game).toBeDefined();
  });

  it("should create a new game instance", () => {
    const game = new Game();
    expect(game).toBeInstanceOf(Game);
  });

  it("should start the game with two players", () => {
    const game = new Game();
    game.manager.addPlayer(new Player("Player 1"));
    game.manager.addPlayer(new Player("Player 2"));
    expect(game.manager.players.size).toBe(2);
    expect(game.arePlayersReady).toBe(true);
  });

  it("should switch turns between players", () => {
    const game = new Game();
    game.manager.addPlayer(new Player("Player 1"));
    game.manager.addPlayer(new Player("Player 2"));
    game.start();
    expect(game.chessBoard.turn).toBe(PieceColor.White);
    game.chessBoard.nextTurn();
    expect(game.chessBoard.turn).toBe(PieceColor.Black);
  });

  it("should throw an error if missing any or both players", () => {
    const game = new Game();
    try {
      game.start();
      expect(false).toBeTruthy();
    } catch (error) {
      expect((error as Error).message).toBe(
        "Please add both players before starting the game.",
      );
    }
  });

  it("should throw an error if game is already started", () => {
    const game = new Game();
    game.manager.addPlayer(new Player("Player 1"));
    game.manager.addPlayer(new Player("Player 2"));
    game.start();
    try {
      game.start();
      expect(false).toBeTruthy();
    } catch (error) {
      expect((error as Error).message).toBe("Game has already started.");
    }
  });

  it("should throw an error if chess board is not initialized", () => {
    const game = new Game();
    // @ts-expect-error test
    game.chessBoard = undefined; // Simulate chess board not being initialized
    try {
      if (game.arePlayersReady) {
        expect(false).toBeTruthy();
      }
    } catch (error) {
      expect((error as Error).message).toBe("Chess board is not initialized");
    }
  });

  it("should throw an error if both players are ready and try to add a player", () => {
    const game = new Game();
    try {
      game.manager.addPlayer(new Player("Player 1"));
      game.manager.addPlayer(new Player("Player 2"));
      game.manager.addPlayer(new Player("Player 3"));
      expect(false).toBeTruthy();
    } catch (error) {
      expect((error as Error).message).toBe(
        "Cannot add more than two players.",
      );
    }
  });

  it("should send game start notification", () => {
    const mockNotifier = jest.fn();
    const game = new Game(mockNotifier);
    game.manager.addPlayer(new Player("Player 1"));
    game.manager.addPlayer(new Player("Player 2"));
    game.start();
    expect(mockNotifier).toHaveBeenCalled();
    expect(mockNotifier).toHaveBeenCalledWith("Game started!");
  });

  it("should proxy a movement to chessboard", () => {
    const game = new Game();
    const player1 = new Player("Player 1");
    const player2 = new Player("Player 2");
    game.manager.addPlayer(player1);
    game.manager.addPlayer(player2);
    game.start();

    game.move([6, 0], [5, 0]);

    expect(game.chessBoard.getPosition([5, 0])).toHaveProperty("type", "Pawn");
    expect(game.chessBoard.getPosition([6, 0])).toBeUndefined();
  });

  it("should fail to proxy a movement if players are not ready", () => {
    const game = new Game();
    const player1 = new Player("Player 1");
    game.manager.addPlayer(player1);

    try {
      game.move([6, 0], [5, 0]);
      expect(false).toBe(true);
    } catch (error) {
      expect((error as Error).message).toBe(
        "Please add both players before starting the game.",
      );
    }
  });

  it("should fail to proxy a movement if game is ended", () => {
    const game = new Game();
    // @ts-expect-error error
    game.manager.winner = true;
    const player1 = new Player("Player 1");
    const player2 = new Player("Player 2");
    game.manager.addPlayer(player1);
    game.manager.addPlayer(player2);
    game.start();

    try {
      game.move([6, 0], [5, 0]);
      expect(false).toBe(true);
    } catch (error) {
      expect((error as Error).message).toBe("Game has already ended.");
    }
  });
});
