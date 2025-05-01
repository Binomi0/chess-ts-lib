import Game from "./game";
import Player from "./player";

const game = new Game();

game.addPlayer(new Player("Adolfo"));
game.addPlayer(new Player("Cristian"));

game.chessBoard.handleMove([1, 0], [3, 0]);

console.log(game.chessBoard);
