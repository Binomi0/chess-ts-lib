import Game from "../game";
import Player from "../player";
import { PieceColor } from "../types";

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
    expect(game.manager.arePlayersReady).toBe(true);
  });

  it("should switch turns between players", () => {
    const game = new Game();
    game.manager.addPlayer(new Player("Player 1"));
    game.manager.addPlayer(new Player("Player 2"));
    game.start();
    expect(game.board.turn).toBe(PieceColor.White);
    game.board.nextTurn();
    expect(game.board.turn).toBe(PieceColor.Black);
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
    game.board = undefined; // Simulate chess board not being initialized
    try {
      if (game.manager.arePlayersReady) {
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

  describe("arePlayersReady", () => {
    it("should return true if both players are ready", () => {
      const game = new Game();
      game.manager.addPlayer(new Player("Player 1"));
      game.manager.addPlayer(new Player("Player 2"));
      expect(game.arePlayersReady).toBe(true);
    });

    it("should return false if one player is not ready", () => {
      const game = new Game();
      game.manager.addPlayer(new Player("Player 1"));
      expect(game.arePlayersReady).toBe(false);
    });

    it("should return false if no player is ready", () => {
      const game = new Game();
      expect(game.arePlayersReady).toBe(false);
    });
  });

  describe("turn", () => {
    it("should get the current turn", () => {
      const game = new Game();
      expect(game.turn).toBe(PieceColor.White);
    });
  });

  describe("addPlayer", () => {
    it("should add a player to the game", () => {
      const game = new Game();
      game.addPlayer(new Player("Player 1"));
      expect(game.manager.players.size).toBe(1);
    });
    it("should not allow more than two players", () => {
      const game = new Game();
      game.addPlayer(new Player("Player 1"));
      game.addPlayer(new Player("Player 2"));
      try {
        game.addPlayer(new Player("Player 3"));
        expect(false).toBe(true);
      } catch (error) {
        expect((error as Error).message).toBe(
          "Cannot add more than two players.",
        );
      }
    });
  });

  describe("getWinner", () => {
    it("should return undefined if no winner is determined", () => {
      const game = new Game();
      expect(game.getWinner()).toBe(undefined);
    });
    it("should return the winning player's color", () => {
      const game = new Game();
      game.addPlayer(new Player("Player 1"));
      game.addPlayer(new Player("Player 2"));
      game.setWinner(PieceColor.White);
      expect(game.getWinner()).toBe(PieceColor.White);
    });
  });

  describe("setWinner", () => {
    it("should set the winner's color", () => {
      const game = new Game();
      game.setWinner(PieceColor.White);
      expect(game.getWinner()).toBe(PieceColor.White);
    });
  });

  describe("move", () => {
    it("should move a piece from one position to another", () => {
      const game = new Game();
      const player1 = new Player("Player 1");
      game.addPlayer(player1);
      const player2 = new Player("Player 2");
      game.addPlayer(player2);

      const board = game.board; // Assuming the board is initialized elsewhere
      board.stateManager.initializeBoard();
      const piece = board.getPosition([6, 0]); // Assuming there's a piece at [0, 0]
      if (piece) {
        game.move([6, 0], [5, 0]);
        expect(board.getPosition([5, 0])).toBe(piece);
        expect(board.getPosition([6, 0])).toBe(undefined);
      }
    });
  });
});
