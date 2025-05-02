import Game from "./game";
import { BlackKing, WhiteKing } from "./pieces/king";
import Player from "./player";

const game = new Game();

const adolfo = new Player("Adolfo");
const cristian = new Player("Cristian");

game.addPlayer(adolfo);
game.addPlayer(cristian);

game.chessBoard.board[0][1] = undefined;
game.chessBoard.board[0][2] = undefined;
game.chessBoard.board[0][3] = undefined;

const whiteKing = new WhiteKing();
const castling = whiteKing.canCastling(game.chessBoard.board, "queen");
if (castling) {
  whiteKing.castling(game.chessBoard.board, "queen");
  console.log(game.chessBoard.getPosition([0, 1]));
  console.log(game.chessBoard.getPosition([0, 2]));
} else {
  console.log("White King cannot castle.");
}
