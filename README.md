# ♟️ chess-ts-lib

**chess-ts-lib** is a TypeScript-based library that provides a complete object-oriented architecture to manage a chess game, including players, board state, piece logic, movements, turns, castling, promotion, check and checkmate validations, and more.

---

## 📦 Installation

`npm`

```bash
npm install chess-ts-lib
```

`pnpm`

```bash
pnpm add chess-ts-lib
```

---

## 🧠 Features

- Full object-oriented architecture in TypeScript
- Individual classes for each chess piece
- Move validation and listing of available moves
- Turn manager
- Castling support
- Pawn promotion
- Check and checkmate validation
- Player and game management
- Board state tracking and cloning
- Helper functions to support logic

---

## 🧱 Structure

- `Piece` (abstract class): Base class for all pieces. Each piece implements its own movement logic.
- `ChessBoard`: Main class that handles piece movement, turn changes, checkmate detection, and game logic.
- `Game`: High-level class for starting the game and managing players.
- `BoardMovements`, `BoardStateManager`, `TurnManager`: Utility classes for managing movements, board state, and player turns.
- `CastlingManager`: Manages castling permissions and execution.
- `BoardValidations`: Static validation methods.
- `PieceFactory`, `PieceDirections`: Utilities for piece instantiation and direction control.

---

## ✅ Example Usage

```ts
import { Game, Player, PieceColor } from "chess-ts-lib";

const game = new Game(console.log);

game.start();

game.manager.addPlayer(new Player("Alice"));
game.manager.addPlayer(new Player("Bob"));

if (game.arePlayersReady) {
  game.move([6, 4], [4, 4]); // Example: white pawn e2 to e4
}
```

### Advanced Example: Custom Board Setup

```ts
import { Game, createFreshBoard, PieceFactory } from "chess-ts-lib";

const customBoard = createFreshBoard();
customBoard[0][0] = PieceFactory.create("rook", "black");
customBoard[7][7] = PieceFactory.create("rook", "white");

const game = new Game(console.log);
game.start(customBoard);
```

---

## 🧪 Testing & Debugging

Use the `notifier` function to receive logs or game notifications.

```ts
const game = new Game((msg) => console.log("Event:", msg));
```

You can validate board state, simulate castling or checkmate, and create custom boards using:

```ts
import { createFreshBoard, cloneBoard } from "chess-ts-lib";
```

Run unit tests to ensure functionality:

```bash
pnpm test
```

---

## 🎯 Utilities

- `isInBounds`: Validates if a position is within board limits.
- `isCellEmpty`, `isCellCaptured`, `isCellBlocked`: Helpers to check cell state.
- `logMovement`: Logs a movement.
- `cloneBoard`: Returns a deep copy of the board.
- `PieceFactory`: Instantiates specific pieces.

---

## 📊 Architecture Diagram

Below is a simplified UML diagram of the library's architecture:

```plaintext
+-------------------+
|      Game         |
+-------------------+
         |
         v
+-------------------+
|    ChessBoard     |
+-------------------+
         |
         v
+-------------------+
|      Piece        |
+-------------------+
         |
  +------+-------+
  |      |       |
  v      v       v
Pawn   Rook    Bishop
```

---

## 🧩 Extendability

The code is modular and open for extension. You can:

- Add new game modes
- Implement timers or scoring
- Integrate with UIs or online multiplayer systems

### Adding a New Piece

To add a new piece, extend the `Piece` class and implement its movement logic:

```ts
import { Piece } from "chess-ts-lib";

class CustomPiece extends Piece {
  getAvailableMoves() {
    // Custom movement logic
  }
}
```

---

## ❓ FAQ

### How do I handle special moves like en passant?

Special moves are handled automatically by the library if the board state is valid.

### Can I integrate this library with a frontend?

Yes, the library is designed to be UI-agnostic and can be integrated with any frontend framework.

---

## 📜 License

MIT License

---

## 🙌 Contributions

Pull requests and ideas are welcome! Please ensure your code follows the existing style and includes tests.
