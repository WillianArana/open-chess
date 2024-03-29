import { Board } from '@src/board/domain/board';
import { ChessMatch } from './chess-match';
import { ChessPosition, Column, Row } from './chess-position';
import { Color } from './color';
import { Bishop } from './pieces/bishop';
import { King } from './pieces/king';
import { Knight } from './pieces/knight';
import { Pawn } from './pieces/pawn';
import { Queen } from './pieces/queen';
import { Rook } from './pieces/rook';

describe('ChessMatch', () => {
  it('should be create', () => {
    expect(new ChessMatch()).toBeDefined();
  });

  it('should be start match with "WHITE" player', () => {
    const chessMatch = new ChessMatch();
    expect(chessMatch.currentPlayer).toBe(Color.White);
  });

  it('should be start match with turn one', () => {
    const chessMatch = new ChessMatch();
    expect(chessMatch.turn).toBe(1);
  });

  it('should be not is check', () => {
    const chessMatch = new ChessMatch();
    expect(chessMatch.isCheck).toBe(false);
  });

  describe('pieces', () => {
    it('should get pieces', () => {
      const chessMatch = new ChessMatch();
      const pieces = chessMatch.pieces();
      expect(pieces).toBeDefined();
      expect(pieces.rows).toBe(8);
      expect(pieces.columns).toBe(8);
    });

    it('should get pieces in right places (WHITE)', () => {
      const white = Color.White;
      const chessMatch = new ChessMatch();
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
      const chessMatch = new ChessMatch();
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

  describe('possibleMoves', () => {
    it('should get possible moves', () => {
      const chessMatch = new ChessMatch();
      const source = new ChessPosition('e', 2);
      const possibleMoves = chessMatch.possibleMoves(source);
      expect(possibleMoves.get(new ChessPosition('e', 3).toPosition())).toBeTruthy();
      expect(possibleMoves.get(new ChessPosition('e', 4).toPosition())).toBeTruthy();
      expect(possibleMoves.get(new ChessPosition('e', 5).toPosition())).toBeFalsy();
    });
  });

  describe('performChessMove', () => {
    it('should be perform chess move', () => {
      const chessMatch = new ChessMatch();
      const source = new ChessPosition('e', 2);
      const target = new ChessPosition('e', 3);
      const capturedPiece = chessMatch.performChessMove(source, target);
      expect(capturedPiece).toEqual(null);
    });

    it('should be captured piece', () => {
      class ChessMatchMock extends ChessMatch {
        get isCheck(): boolean {
          return true;
        }

        protected initialSetup(): void {
          const board = this.board;
          this.placeNewPiece('e', 1, new King(board, Color.White, this));
          this.placeNewPiece('e', 2, new Rook(board, Color.White));

          this.placeNewPiece('e', 8, new King(board, Color.Black, this));
          this.placeNewPiece('e', 7, new Rook(board, Color.Black));
        }
      }

      const chessMatchMock = new ChessMatchMock();
      const source = new ChessPosition('e', 2);
      const target = new ChessPosition('e', 7);
      const capturedPiece = chessMatchMock.performChessMove(source, target);
      expect(capturedPiece).not.toEqual(null);
    });

    it('should throw an error when there is no piece on source position', () => {
      const chessMatch = new ChessMatch();
      const source = new ChessPosition('a', 3);
      const target = new ChessPosition('a', 5);

      expect(() => chessMatch.performChessMove(source, target)).toThrowError(
        'There is no piece on source position',
      );
    });

    it('should throw an error when there is no possible moves for the chosen piece', () => {
      const chessMatch = new ChessMatch();
      const source = new ChessPosition('e', 1);
      const target = new ChessPosition('e', 2);

      expect(() => chessMatch.performChessMove(source, target)).toThrowError(
        'There is no possible moves for the chosen piece',
      );
    });

    it(`should throw an error when there chose piece can't move to target position`, () => {
      const chessMatch = new ChessMatch();
      const source = new ChessPosition('e', 2);
      const target = new ChessPosition('e', 1);

      expect(() => chessMatch.performChessMove(source, target)).toThrowError(
        `There chose piece can't move to target position`,
      );
    });

    it('should throw an error when piece is not yours', () => {
      const chessMatch = new ChessMatch();
      const source = new ChessPosition('e', 7);
      const target = new ChessPosition('e', 6);

      expect(() => chessMatch.performChessMove(source, target)).toThrowError(
        'The chosen piece is not yours',
      );
    });

    it('should throw an error when player put yourself in check', () => {
      class ChessMatchMock extends ChessMatch {
        protected initialSetup(): void {
          const board = this.board;
          this.placeNewPiece('e', 1, new King(board, Color.White, this));
          this.placeNewPiece('e', 2, new Rook(board, Color.White));
          this.placeNewPiece('d', 2, new Rook(board, Color.White));
          this.placeNewPiece('f', 2, new Rook(board, Color.White));
          this.placeNewPiece('d', 1, new Rook(board, Color.White));
          this.placeNewPiece('f', 1, new Rook(board, Color.White));

          this.placeNewPiece('e', 8, new King(board, Color.Black, this));
          this.placeNewPiece('d', 8, new Rook(board, Color.Black));
          this.placeNewPiece('f', 8, new Rook(board, Color.Black));
          this.placeNewPiece('d', 7, new Rook(board, Color.Black));
          this.placeNewPiece('e', 7, new Rook(board, Color.Black));
          this.placeNewPiece('f', 7, new Rook(board, Color.Black));
        }
      }

      const chessMatchMock = new ChessMatchMock();
      let source = new ChessPosition('e', 2);
      let target = new ChessPosition('e', 7);
      chessMatchMock.performChessMove(source, target);

      source = new ChessPosition('d', 7);
      target = new ChessPosition('e', 7);
      chessMatchMock.performChessMove(source, target);

      source = new ChessPosition('d', 2);
      target = new ChessPosition('d', 8);

      expect(() => chessMatchMock.performChessMove(source, target)).toThrowError(
        `You can't put yourself in check`,
      );
    });

    it('should be checkmate', () => {
      class ChessMatchMock extends ChessMatch {
        get isCheck(): boolean {
          return true;
        }

        protected initialSetup(): void {
          const board = this.board;
          this.placeNewPiece('h', 7, new Rook(board, Color.White));
          this.placeNewPiece('d', 1, new Rook(board, Color.White));
          this.placeNewPiece('e', 1, new King(board, Color.White, this));

          this.placeNewPiece('b', 8, new Rook(board, Color.Black));
          this.placeNewPiece('a', 8, new King(board, Color.Black, this));
        }
      }

      const chessMatchMock = new ChessMatchMock();
      let source = new ChessPosition('d', 1);
      let target = new ChessPosition('a', 1);
      chessMatchMock.performChessMove(source, target);

      expect(chessMatchMock.isCheck).toBeTruthy();
      expect(chessMatchMock.isCheckMate).toBeTruthy();
    });

    it('should be draw', () => {
      class ChessMatchMock extends ChessMatch {
        protected initialSetup(): void {
          const board = this.board;
          this.placeNewPiece('e', 1, new King(board, Color.White, this));

          this.placeNewPiece('e', 2, new Pawn(board, Color.Black, this));
          this.placeNewPiece('e', 8, new King(board, Color.Black, this));
        }
      }

      const chessMatchMock = new ChessMatchMock();
      let source = new ChessPosition('e', 1);
      let target = new ChessPosition('e', 2);
      const piece = chessMatchMock.performChessMove(source, target);

      expect(piece).toBeInstanceOf(Pawn);
      expect(chessMatchMock.isDraw).toBeTruthy();
    });

    describe('castling', () => {
      it('should be perform castling move (KING SIDE ROOK)', () => {
        let board!: Board;
        class ChessMatchMock extends ChessMatch {
          protected initialSetup(): void {
            board = this.board;
            this.placeNewPiece('e', 1, new King(board, Color.White, this));
            this.placeNewPiece('a', 1, new Rook(board, Color.White));
            this.placeNewPiece('h', 1, new Rook(board, Color.White));

            this.placeNewPiece('e', 8, new King(board, Color.Black, this));
            this.placeNewPiece('a', 8, new Rook(board, Color.Black));
            this.placeNewPiece('h', 8, new Rook(board, Color.Black));
          }
        }

        const chessMatchMock = new ChessMatchMock();
        let source = new ChessPosition('e', 1);
        let target = new ChessPosition('g', 1);
        const capturedPiece = chessMatchMock.performChessMove(source, target);
        const king = board.piece(target.toPosition());
        const rook = board.piece(new ChessPosition('f', 1).toPosition());

        expect(capturedPiece).toBeNull();
        expect(king).toBeInstanceOf(King);
        expect(rook).toBeInstanceOf(Rook);
        expect(chessMatchMock.isCheck).toBeFalsy();
        expect(chessMatchMock.isCheckMate).toBeFalsy();
      });

      it('should be perform castling move (QUEEN SIDE ROOK)', () => {
        let board!: Board;
        class ChessMatchMock extends ChessMatch {
          protected initialSetup(): void {
            board = this.board;
            this.placeNewPiece('e', 1, new King(board, Color.White, this));
            this.placeNewPiece('a', 1, new Rook(board, Color.White));
            this.placeNewPiece('h', 1, new Rook(board, Color.White));

            this.placeNewPiece('e', 8, new King(board, Color.Black, this));
            this.placeNewPiece('a', 8, new Rook(board, Color.Black));
            this.placeNewPiece('h', 8, new Rook(board, Color.Black));
          }
        }

        const chessMatchMock = new ChessMatchMock();
        let source = new ChessPosition('e', 1);
        let target = new ChessPosition('c', 1);
        const capturedPiece = chessMatchMock.performChessMove(source, target);
        const king = board.piece(target.toPosition());
        const rook = board.piece(new ChessPosition('d', 1).toPosition());

        expect(capturedPiece).toBeNull();
        expect(king).toBeInstanceOf(King);
        expect(rook).toBeInstanceOf(Rook);
        expect(chessMatchMock.isCheck).toBeFalsy();
        expect(chessMatchMock.isCheckMate).toBeFalsy();
      });

      it('should throw an error when player put yourself in check (KING SIDE ROOK)', () => {
        let board!: Board;
        class ChessMatchMock extends ChessMatch {
          protected initialSetup(): void {
            board = this.board;
            this.placeNewPiece('e', 1, new King(board, Color.White, this));
            this.placeNewPiece('a', 1, new Rook(board, Color.White));
            this.placeNewPiece('h', 1, new Rook(board, Color.White));

            this.placeNewPiece('e', 8, new King(board, Color.Black, this));
            this.placeNewPiece('c', 8, new Rook(board, Color.Black));
            this.placeNewPiece('g', 8, new Rook(board, Color.Black));
          }
        }

        const chessMatchMock = new ChessMatchMock();
        let source = new ChessPosition('e', 1);
        let target = new ChessPosition('g', 1);

        expect(() => chessMatchMock.performChessMove(source, target)).toThrowError(
          `You can't put yourself in check`,
        );

        const king = board.piece(source.toPosition());
        const rook = board.piece(new ChessPosition('h', 1).toPosition());
        expect(king).toBeInstanceOf(King);
        expect(rook).toBeInstanceOf(Rook);
      });

      it('should throw an error when player put yourself in check (QUEEN SIDE ROOK)', () => {
        let board!: Board;
        class ChessMatchMock extends ChessMatch {
          protected initialSetup(): void {
            board = this.board;
            this.placeNewPiece('e', 1, new King(board, Color.White, this));
            this.placeNewPiece('a', 1, new Rook(board, Color.White));
            this.placeNewPiece('h', 1, new Rook(board, Color.White));

            this.placeNewPiece('e', 8, new King(board, Color.Black, this));
            this.placeNewPiece('c', 8, new Rook(board, Color.Black));
            this.placeNewPiece('g', 8, new Rook(board, Color.Black));
          }
        }

        const chessMatchMock = new ChessMatchMock();
        let source = new ChessPosition('e', 1);
        let target = new ChessPosition('c', 1);

        expect(() => chessMatchMock.performChessMove(source, target)).toThrowError(
          `You can't put yourself in check`,
        );

        const king = board.piece(source.toPosition());
        const rook = board.piece(new ChessPosition('a', 1).toPosition());
        expect(king).toBeInstanceOf(King);
        expect(rook).toBeInstanceOf(Rook);
      });
    });

    describe('en passant', () => {
      describe('with white piece', () => {
        it('should be perform en passant move (RIGHT)', () => {
          let board!: Board;
          let pawn!: Pawn;
          class ChessMatchMock extends ChessMatch {
            protected initialSetup(): void {
              board = this.board;
              this.placeNewPiece('e', 1, new King(board, Color.White, this));
              this.placeNewPiece('e', 3, new Pawn(board, Color.White, this));

              this.placeNewPiece('e', 8, new King(board, Color.Black, this));

              pawn = new Pawn(board, Color.Black, this);
              this.placeNewPiece('f', 7, pawn);
            }
          }

          const chessMatchMock = new ChessMatchMock();
          let source = new ChessPosition('e', 3);
          let target = new ChessPosition('e', 5);
          let capturedPiece = chessMatchMock.performChessMove(source, target);
          expect(capturedPiece).toBeNull();

          source = new ChessPosition('f', 7);
          target = new ChessPosition('f', 5);
          capturedPiece = chessMatchMock.performChessMove(source, target);
          expect(capturedPiece).toBeNull();

          source = new ChessPosition('e', 5);
          target = new ChessPosition('f', 6);
          capturedPiece = chessMatchMock.performChessMove(source, target);
          expect(capturedPiece).toStrictEqual(pawn);
        });

        it('should be perform en passant move (LEFT)', () => {
          let board!: Board;
          let pawn!: Pawn;
          class ChessMatchMock extends ChessMatch {
            protected initialSetup(): void {
              board = this.board;
              this.placeNewPiece('e', 1, new King(board, Color.White, this));
              this.placeNewPiece('e', 3, new Pawn(board, Color.White, this));

              this.placeNewPiece('e', 8, new King(board, Color.Black, this));

              pawn = new Pawn(board, Color.Black, this);
              this.placeNewPiece('d', 7, pawn);
            }
          }

          const chessMatchMock = new ChessMatchMock();
          let source = new ChessPosition('e', 3);
          let target = new ChessPosition('e', 5);
          let capturedPiece = chessMatchMock.performChessMove(source, target);
          expect(capturedPiece).toBeNull();

          source = new ChessPosition('d', 7);
          target = new ChessPosition('d', 5);
          capturedPiece = chessMatchMock.performChessMove(source, target);
          expect(capturedPiece).toBeNull();

          source = new ChessPosition('e', 5);
          target = new ChessPosition('d', 6);
          capturedPiece = chessMatchMock.performChessMove(source, target);
          expect(capturedPiece).toStrictEqual(pawn);
        });

        it('should throw an error when player put yourself in check with en passant', () => {
          let board!: Board;
          class ChessMatchMock extends ChessMatch {
            protected initialSetup(): void {
              board = this.board;
              this.placeNewPiece('e', 1, new King(board, Color.White, this));
              this.placeNewPiece('d', 3, new Pawn(board, Color.White, this));

              this.placeNewPiece('a', 8, new Rook(board, Color.Black));
              this.placeNewPiece('e', 8, new King(board, Color.Black, this));
              this.placeNewPiece('c', 7, new Pawn(board, Color.Black, this));
            }
          }

          const chessMatchMock = new ChessMatchMock();
          let source = new ChessPosition('d', 3);
          let target = new ChessPosition('d', 5);
          let capturedPiece = chessMatchMock.performChessMove(source, target);
          expect(capturedPiece).toBeNull();

          source = new ChessPosition('a', 8);
          target = new ChessPosition('d', 8);
          capturedPiece = chessMatchMock.performChessMove(source, target);
          expect(capturedPiece).toBeNull();

          source = new ChessPosition('e', 1);
          target = new ChessPosition('d', 1);
          capturedPiece = chessMatchMock.performChessMove(source, target);
          expect(capturedPiece).toBeNull();

          source = new ChessPosition('c', 7);
          target = new ChessPosition('c', 5);
          capturedPiece = chessMatchMock.performChessMove(source, target);
          expect(capturedPiece).toBeNull();

          source = new ChessPosition('d', 5);
          target = new ChessPosition('c', 6);
          expect(() => chessMatchMock.performChessMove(source, target)).toThrowError(
            `You can't put yourself in check`,
          );

          const pawnWhite = board.piece(source.toPosition());
          expect(pawnWhite).toBeInstanceOf(Pawn);
          const pawnBlack = board.piece(new ChessPosition('c', 5).toPosition());
          expect(pawnBlack).toBeInstanceOf(Pawn);
        });
      });

      describe('with black piece', () => {
        it('should be perform en passant move (LEFT)', () => {
          let board!: Board;
          let pawn!: Pawn;
          class ChessMatchMock extends ChessMatch {
            protected initialSetup(): void {
              board = this.board;
              this.placeNewPiece('e', 1, new King(board, Color.White, this));
              pawn = new Pawn(board, Color.White, this);
              this.placeNewPiece('e', 2, pawn);

              this.placeNewPiece('e', 8, new King(board, Color.Black, this));
              this.placeNewPiece('f', 6, new Pawn(board, Color.Black, this));
            }
          }

          const chessMatchMock = new ChessMatchMock();
          let source = new ChessPosition('e', 1);
          let target = new ChessPosition('f', 1);
          let capturedPiece = chessMatchMock.performChessMove(source, target);
          expect(capturedPiece).toBeNull();

          source = new ChessPosition('f', 6);
          target = new ChessPosition('f', 4);
          capturedPiece = chessMatchMock.performChessMove(source, target);
          expect(capturedPiece).toBeNull();

          source = new ChessPosition('e', 2);
          target = new ChessPosition('e', 4);
          capturedPiece = chessMatchMock.performChessMove(source, target);

          source = new ChessPosition('f', 4);
          target = new ChessPosition('e', 3);
          capturedPiece = chessMatchMock.performChessMove(source, target);
          expect(capturedPiece).toStrictEqual(pawn);
        });

        it('should be perform en passant move (RIGHT)', () => {
          let board!: Board;
          let pawn!: Pawn;
          class ChessMatchMock extends ChessMatch {
            protected initialSetup(): void {
              board = this.board;
              this.placeNewPiece('e', 1, new King(board, Color.White, this));
              pawn = new Pawn(board, Color.White, this);
              this.placeNewPiece('e', 2, pawn);

              this.placeNewPiece('e', 8, new King(board, Color.Black, this));
              this.placeNewPiece('d', 6, new Pawn(board, Color.Black, this));
            }
          }

          const chessMatchMock = new ChessMatchMock();
          let source = new ChessPosition('e', 1);
          let target = new ChessPosition('f', 1);
          let capturedPiece = chessMatchMock.performChessMove(source, target);
          expect(capturedPiece).toBeNull();

          source = new ChessPosition('d', 6);
          target = new ChessPosition('d', 4);
          capturedPiece = chessMatchMock.performChessMove(source, target);
          expect(capturedPiece).toBeNull();

          source = new ChessPosition('e', 2);
          target = new ChessPosition('e', 4);
          capturedPiece = chessMatchMock.performChessMove(source, target);

          source = new ChessPosition('d', 4);
          target = new ChessPosition('e', 3);
          capturedPiece = chessMatchMock.performChessMove(source, target);
          expect(capturedPiece).toStrictEqual(pawn);
        });

        it('should throw an error when player put yourself in check with en passant', () => {
          let board!: Board;
          class ChessMatchMock extends ChessMatch {
            protected initialSetup(): void {
              board = this.board;
              this.placeNewPiece('a', 1, new Rook(board, Color.White));
              this.placeNewPiece('e', 1, new King(board, Color.White, this));
              this.placeNewPiece('e', 2, new Pawn(board, Color.White, this));

              this.placeNewPiece('e', 8, new King(board, Color.Black, this));
              this.placeNewPiece('d', 6, new Pawn(board, Color.Black, this));
            }
          }

          const chessMatchMock = new ChessMatchMock();
          let source = new ChessPosition('a', 1);
          let target = new ChessPosition('b', 1);
          let capturedPiece = chessMatchMock.performChessMove(source, target);
          expect(capturedPiece).toBeNull();

          source = new ChessPosition('e', 8);
          target = new ChessPosition('d', 8);
          capturedPiece = chessMatchMock.performChessMove(source, target);
          expect(capturedPiece).toBeNull();

          source = new ChessPosition('b', 1);
          target = new ChessPosition('d', 1);
          capturedPiece = chessMatchMock.performChessMove(source, target);
          expect(capturedPiece).toBeNull();

          source = new ChessPosition('d', 6);
          target = new ChessPosition('d', 4);
          capturedPiece = chessMatchMock.performChessMove(source, target);
          expect(capturedPiece).toBeNull();

          source = new ChessPosition('e', 2);
          target = new ChessPosition('e', 4);
          capturedPiece = chessMatchMock.performChessMove(source, target);

          source = new ChessPosition('d', 4);
          target = new ChessPosition('e', 3);
          expect(() => chessMatchMock.performChessMove(source, target)).toThrowError(
            `You can't put yourself in check`,
          );

          const pawnBlack = board.piece(source.toPosition());
          expect(pawnBlack).toBeInstanceOf(Pawn);
          const pawnWhite = board.piece(new ChessPosition('e', 4).toPosition());
          expect(pawnWhite).toBeInstanceOf(Pawn);
        });
      });
    });
  });
});
