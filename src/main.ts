import Game from "./game";
import { BlackPawn, WhitePawn } from "./pieces/pawn";
import Player from "./player";

const game = new Game();

game.addPlayer(new Player("Adolfo"));
game.addPlayer(new Player("Cristian"));

game.chessBoard.nextTurn();
game.chessBoard.board[6][0] = undefined;
game.chessBoard.board[5][0] = new WhitePawn();

game.chessBoard.handleMove([7, 0], [4, 0]);

console.log(game.chessBoard.getPosition([4, 0])?.color);
console.log(game.chessBoard.getPosition([4, 0])?.type);
console.log(game.chessBoard.getPosition([5, 0])?.color);
console.log(game.chessBoard.getPosition([5, 0])?.type);
