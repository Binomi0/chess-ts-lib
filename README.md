Claro, aquí tienes un ejemplo de `README.md` profesional y completo basado en las definiciones TypeScript que has compartido. Está estructurado para documentar un motor de ajedrez orientado a objetos, ideal para desarrolladores que quieran integrarlo o contribuir:

---

````markdown
# Chess Engine - TypeScript

Un motor de ajedrez escrito en TypeScript, altamente modular, con clases para cada tipo de pieza, lógica de movimiento, validaciones, turnos, enroques, promoción, y gestión de partida. Diseñado para ser utilizado como base para aplicaciones de ajedrez, IA, interfaces gráficas o servicios backend.

## 🧠 Arquitectura

El motor está basado en clases orientadas a objetos, separando claramente la lógica del juego en módulos como:

- `Piece` y subclases (`King`, `Queen`, `Rook`, etc.)
- `ChessBoard` para gestionar el tablero y movimientos
- `GameManager` para gestionar estado global y jugadores
- `BoardValidations` para verificar jaque y jaque mate
- `CastlingManager` para manejar enroques
- `PieceFactory` para instanciar piezas
- `PieceDirections` para definir direcciones válidas de movimiento

## 🔧 Instalación

```bash
npm install chess-ts-lib
```
````

_(Este proyecto asume que se empaquetará y publicará como librería. Adapta el nombre del paquete si no es el caso.)_

## 🧩 Uso básico

```ts
import { Game, PieceColor, Position } from "chess-ts-lib";

const game = new Game(console.log);

game.start();

// Movimiento desde E2 a E4
game.move([6, 4], [4, 4]);
```

## 📦 Clases principales

### `Game`

Punto de entrada principal. Maneja las reglas, jugadores y tablero.

### `ChessBoard`

Contiene la lógica para ejecutar movimientos, validaciones y cambios de turno.

### `Piece`

Clase abstracta base para todas las piezas (`King`, `Queen`, etc.). Define las interfaces `getAllAvailableMoves()` y `validateMove()`.

### `BoardValidations`

Contiene funciones estáticas para verificar jaque, jaque mate y otros aspectos legales del movimiento.

### `CastlingManager`

Gestiona condiciones, ejecución y derechos de enroque.

## 📌 Tipos y enums

- `type Position = [number, number];` — Coordenadas del tablero
- `type Movement` — Describe un movimiento con origen, destino y pieza
- `enum PieceColor` — `'white'` | `'black'`
- `enum PieceType` — `'King'`, `'Queen'`, etc.
- `enum Castling` — `'queen'` | `'king'`

## ♟️ Piezas disponibles

Cada clase de pieza implementa su lógica de movimiento:

- `Pawn`
- `Knight`
- `Bishop`
- `Rook`
- `Queen`
- `King`

## 🧠 Funciones utilitarias

- `isInBounds(position)`
- `isCellEmpty(cell)`
- `isCellBlocked(...)`
- `cloneBoard(board)`
- `createFreshBoard()`

## 🧪 Ejemplo de validación de jaque mate

```ts
import { ChessBoardValidations, PieceColor } from "chess-ts-lib";

const board = game.chessBoard.getBoard();
const isMate = ChessBoardValidations.isCheckMate(board, PieceColor.Black);
```

## 🚧 Pendiente / Posibles mejoras

- Soporte para empate por repetición o 50 movimientos
- Contador de tiempos por jugador
- Soporte para múltiples variantes (Chess960, etc.)
- Evaluación de jugadas para IA

## 📜 Licencia

MIT License. Abierto a contribuciones.

---

Desarrollado con ❤️ en TypeScript.

```

```
