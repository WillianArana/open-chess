import { ChessMatchCMD } from './chess-match.cmd';
import { ChessPosition, Column, Row } from './chess-position';
import { Color } from './color';
import { Bishop } from './pieces/bishop';
import { King } from './pieces/king';
import { Knight } from './pieces/knight';
import { Pawn } from './pieces/pawn';
import { Queen } from './pieces/queen';
import { Rook } from './pieces/rook';

describe('ChessMatchCMD', () => {
  it('should be create', () => {
    expect(new ChessMatchCMD()).toBeDefined();
  });

  it('should get pieces in right places (WHITE)', () => {
    const white = Color.White;
    const chessMatch = new ChessMatchCMD();
    const pieces = chessMatch.pieces();

    let position = new ChessPosition('a', 1).toPosition();
    expect(pieces.get(position)).toBeInstanceOf(Rook);
    expect(pieces.get(position).color).toBe(white);

    position = new ChessPosition('b', 1).toPosition();
    expect(pieces.get(position)).toBeInstanceOf(Knight);
    expect(pieces.get(position).color).toBe(white);

    position = new ChessPosition('c', 1).toPosition();
    expect(pieces.get(position)).toBeInstanceOf(Bishop);
    expect(pieces.get(position).color).toBe(white);

    position = new ChessPosition('d', 1).toPosition();
    expect(pieces.get(position)).toBeInstanceOf(Queen);
    expect(pieces.get(position).color).toBe(white);

    position = new ChessPosition('e', 1).toPosition();
    expect(pieces.get(position)).toBeInstanceOf(King);
    expect(pieces.get(position).color).toBe(white);

    position = new ChessPosition('f', 1).toPosition();
    expect(pieces.get(position)).toBeInstanceOf(Bishop);
    expect(pieces.get(position).color).toBe(white);

    position = new ChessPosition('g', 1).toPosition();
    expect(pieces.get(position)).toBeInstanceOf(Knight);
    expect(pieces.get(position).color).toBe(white);

    position = new ChessPosition('h', 1).toPosition();
    expect(pieces.get(position)).toBeInstanceOf(Rook);
    expect(pieces.get(position).color).toBe(white);

    for (let row of 'abcdefgh') {
      position = new ChessPosition(row as Column, 2).toPosition();
      expect(pieces.get(position)).toBeInstanceOf(Pawn);
      expect(pieces.get(position).color).toBe(white);

      for (let i = 3; i < 5; i++) {
        position = new ChessPosition(row as Column, i as Row).toPosition();
        expect(pieces.get(position)).toBeNull();
      }
    }
  });

  it('should get pieces in right places (BLACK)', () => {
    const black = Color.Black;
    const chessMatch = new ChessMatchCMD();
    const pieces = chessMatch.pieces();

    let position = new ChessPosition('a', 8).toPosition();
    expect(pieces.get(position)).toBeInstanceOf(Rook);
    expect(pieces.get(position).color).toBe(black);

    position = new ChessPosition('b', 8).toPosition();
    expect(pieces.get(position)).toBeInstanceOf(Knight);
    expect(pieces.get(position).color).toBe(black);

    position = new ChessPosition('c', 8).toPosition();
    expect(pieces.get(position)).toBeInstanceOf(Bishop);
    expect(pieces.get(position).color).toBe(black);

    position = new ChessPosition('d', 8).toPosition();
    expect(pieces.get(position)).toBeInstanceOf(Queen);
    expect(pieces.get(position).color).toBe(black);

    position = new ChessPosition('e', 8).toPosition();
    expect(pieces.get(position)).toBeInstanceOf(King);
    expect(pieces.get(position).color).toBe(black);

    position = new ChessPosition('f', 8).toPosition();
    expect(pieces.get(position)).toBeInstanceOf(Bishop);
    expect(pieces.get(position).color).toBe(black);

    position = new ChessPosition('g', 8).toPosition();
    expect(pieces.get(position)).toBeInstanceOf(Knight);
    expect(pieces.get(position).color).toBe(black);

    position = new ChessPosition('h', 8).toPosition();
    expect(pieces.get(position)).toBeInstanceOf(Rook);
    expect(pieces.get(position).color).toBe(black);

    for (let row of 'abcdefgh') {
      position = new ChessPosition(row as Column, 7).toPosition();
      expect(pieces.get(position)).toBeInstanceOf(Pawn);
      expect(pieces.get(position).color).toBe(black);

      for (let i = 5; i < 7; i++) {
        position = new ChessPosition(row as Column, i as Row).toPosition();
        expect(pieces.get(position)).toBeNull();
      }
    }
  });
});
