import Game from "./game";
import Player from "./player";

const game = new Game();

const adolfo = new Player("Adolfo");
const cristian = new Player("Cristian");

game.addPlayer(adolfo);
game.addPlayer(cristian);
