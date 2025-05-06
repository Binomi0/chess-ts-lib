import { PieceType, PieceColor } from "../piece";
import SingleMoveValidator from "../singleMoveValidator";
import PieceFactory from "./factory";

describe("PieceFactory", () => {
  it("should create a piece with the correct color and type", () => {
    const whiteKing = PieceFactory.getPiece(PieceType.King, PieceColor.White);
    expect(whiteKing.color).toBe(PieceColor.White);
    expect(whiteKing.type).toBe(PieceType.King);

    const blackQueen = PieceFactory.getPiece(PieceType.Queen, PieceColor.Black);
    expect(blackQueen.color).toBe(PieceColor.Black);
    expect(blackQueen.type).toBe(PieceType.Queen);
  });

  it("should return the same piece instance for the same color and type", () => {
    const whiteKing1 = PieceFactory.getPiece(PieceType.King, PieceColor.White);
    const whiteKing2 = PieceFactory.getPiece(PieceType.King, PieceColor.White);
    expect(whiteKing1 === whiteKing2).toBe(true);
  });

  it("should throw an error if invalid piece type or color is provided", () => {
    // @ts-expect-error test
    expect(() => PieceFactory.getPiece("", PieceColor.White)).toThrow(
      "Invalid piece type or color"
    );
    // @ts-expect-error test
    expect(() => PieceFactory.getPiece(PieceType.King, "")).toThrow(
      "Invalid piece type or color"
    );
  });

  it("should throw an error if invalid piece type is provided", () => {
    // @ts-expect-error test
    expect(() => PieceFactory.getPiece("", PieceColor.White)).toThrow(
      "Invalid piece type or color"
    );
  });

  it("should throw an error if invalid piece color is provided", () => {
    // @ts-expect-error test
    expect(() => PieceFactory.getPiece(PieceType.King, "")).toThrow(
      "Invalid piece type or color"
    );
  });

  it("should throw an error if invalid piece provided", () => {
    expect(() =>
      // @ts-expect-error test
      PieceFactory.getPiece("InvalidType", PieceColor.White)
    ).toThrow("Invalid piece type");
  });

  it("should repect Liskov", () => {
    const whiteKing = PieceFactory.getPiece(PieceType.King, PieceColor.White);
    expect(whiteKing.validateMove).toBeDefined();

    const blackKing = PieceFactory.getPiece(PieceType.King, PieceColor.Black);
    expect(blackKing.validateMove).toBeDefined();
  });
});
