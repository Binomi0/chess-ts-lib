import Game from "./game";
import Player from "./player";

const game = new Game();

const player1 = new Player("Alice");
const player2 = new Player("Bob");

game.addPlayer(player1);
game.addPlayer(player2);
game.start();

const castleWhiteQueenSide = () => {
  if (game.chessBoard) {
    console.log(game.chessBoard.board);

    game.chessBoard.handleMove([1, 0], [3, 0]); // white
    game.chessBoard.handleMove([6, 0], [4, 0]); // black

    game.chessBoard.handleMove([1, 1], [3, 1]); // white
    game.chessBoard.handleMove([6, 1], [4, 1]); // black

    game.chessBoard.handleMove([1, 2], [3, 2]); // white
    game.chessBoard.handleMove([6, 2], [4, 2]); // black

    game.chessBoard.handleMove([1, 3], [3, 3]); // white
    game.chessBoard.handleMove([6, 3], [4, 3]); // black

    game.chessBoard.handleMove([0, 3], [1, 3]); // white
    game.chessBoard.handleMove([7, 3], [6, 3]); // black

    game.chessBoard.handleMove([0, 1], [2, 0]); // white
    game.chessBoard.handleMove([7, 1], [5, 0]); // black

    game.chessBoard.handleMove([0, 2], [1, 1]); // white
    game.chessBoard.handleMove([7, 2], [6, 1]); // black

    game.chessBoard.castlingWhite("queen");

    console.log(game.chessBoard.board);
    console.log(game.chessBoard.players.get("white"));
    console.log(game.chessBoard.players.get("black"));
  } else {
    console.error("Chess board is not initialized");
  }
};

const castleWhiteKingSide = () => {
  if (game.chessBoard) {
    game.chessBoard.handleMove([1, 6], [3, 6]); // white
    game.chessBoard.nextTurn();
    game.chessBoard.handleMove([0, 6], [2, 7]); // white
    game.chessBoard.nextTurn();
    game.chessBoard.handleMove([0, 5], [1, 6]); // white

    game.chessBoard.castlingWhite("king");

    console.log(game.chessBoard.board);
    console.log(game.chessBoard.players.get("white"));
    console.log(game.chessBoard.players.get("black"));
  }
};

castleWhiteKingSide();
