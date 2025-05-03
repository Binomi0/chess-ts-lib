import Game from "./game";
import Player from "./player";

const game = new Game();

const player1 = new Player("Alice");
const player2 = new Player("Bob");

Game.addPlayer(player1);
Game.addPlayer(player2);
Game.start();

const castleWhiteQueenSide = () => {
  if (Game.chessBoard) {
    console.log(Game.chessBoard.board);

    Game.chessBoard.handleMove([1, 0], [3, 0]); // white
    Game.chessBoard.handleMove([6, 0], [4, 0]); // black

    Game.chessBoard.handleMove([1, 1], [3, 1]); // white
    Game.chessBoard.handleMove([6, 1], [4, 1]); // black

    Game.chessBoard.handleMove([1, 2], [3, 2]); // white
    Game.chessBoard.handleMove([6, 2], [4, 2]); // black

    Game.chessBoard.handleMove([1, 3], [3, 3]); // white
    Game.chessBoard.handleMove([6, 3], [4, 3]); // black

    Game.chessBoard.handleMove([0, 3], [1, 3]); // white
    Game.chessBoard.handleMove([7, 3], [6, 3]); // black

    Game.chessBoard.handleMove([0, 1], [2, 0]); // white
    Game.chessBoard.handleMove([7, 1], [5, 0]); // black

    Game.chessBoard.handleMove([0, 2], [1, 1]); // white
    Game.chessBoard.handleMove([7, 2], [6, 1]); // black

    Game.chessBoard.castlingWhite("queen");

    console.log(Game.chessBoard.board);
    console.log(Game.chessBoard.players.get("white"));
    console.log(Game.chessBoard.players.get("black"));
  } else {
    console.error("Chess board is not initialized");
  }
};

const castleWhiteKingSide = () => {
  if (Game.chessBoard) {
    Game.chessBoard.handleMove([1, 6], [3, 6]); // white
    Game.chessBoard.nextTurn();
    Game.chessBoard.handleMove([0, 6], [2, 7]); // white
    Game.chessBoard.nextTurn();
    Game.chessBoard.handleMove([0, 5], [1, 6]); // white

    Game.chessBoard.castlingWhite("king");

    console.log(Game.chessBoard.board);
    console.log(Game.chessBoard.players.get("white"));
    console.log(Game.chessBoard.players.get("black"));
  }
};

castleWhiteKingSide();
