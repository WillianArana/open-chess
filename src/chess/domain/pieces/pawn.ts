import { Position } from '@src/board/domain/position';

import { BoardInterface } from '@shared/domain/interfaces/board.interface';
import { Matrix } from '@shared/domain/matrix';

import { ChessMatch } from '../chess-match';
import { ChessPiece } from '../chess-piece';
import { Color } from '../color';

const ABOVE = 1;
const BELOW = -1;

type Direction = typeof ABOVE | typeof BELOW;

export class Pawn extends ChessPiece {
  protected readonly chessMatch: ChessMatch;

  readonly #direction: Direction;
  readonly #enPassantDirection: Direction;
  readonly #enPassantRow: 3 | 4;
  constructor(board: BoardInterface, color: Color, chessMatch: ChessMatch) {
    super(board, color);
    this.chessMatch = chessMatch;
    this.#direction = this.isWhite ? ABOVE : BELOW;
    this.#enPassantRow = this.isWhite ? 3 : 4;
    this.#enPassantDirection = (this.#direction * -1) as Direction;
  }

  //@Override
  public possibleMoves(): Matrix<boolean> {
    const possibleMoves = this.createMatrixPossibleMoves();
    this.possibleDirectionMoves(possibleMoves);
    this.possibleOpponentPositionMoves(possibleMoves);
    this.possibleEnPassantMoves(possibleMoves);
    return possibleMoves;
  }

  private possibleDirectionMoves(possibleMoves: Matrix<boolean>): void {
    if (this.position) {
      let position = new Position(this.position.row - this.#direction, this.position.column);
      if (this.canMoveInEmptyPosition(position)) {
        possibleMoves.set(true, position);
        if (this.moveCount == 0) {
          position = new Position(this.position.row - this.#direction * 2, this.position.column);
          if (this.canMoveInEmptyPosition(position)) {
            possibleMoves.set(true, position);
          }
        }
      }
    }
  }

  private possibleOpponentPositionMoves(possibleMoves: Matrix<boolean>): void {
    let createPosition = (row: number, column: number) =>
      new Position(row - this.#direction, column - 1);
    this.setPossibleMoves(possibleMoves, createPosition);

    createPosition = (row: number, column: number) =>
      new Position(row - this.#direction, column + 1);
    this.setPossibleMoves(possibleMoves, createPosition);
  }

  //@Override
  protected setPossibleMoves(
    possibleMoves: Matrix<boolean>,
    createPosition: (row: number, column: number) => Position,
  ): void {
    if (this.position) {
      const position = createPosition(this.position.row, this.position.column);
      if (this.canMoveInOpponentPosition(position)) {
        possibleMoves.set(true, position);
      }
    }
  }

  private possibleEnPassantMoves(possibleMoves: Matrix<boolean>): void {
    if (this.isEnPassantRow(this.position)) {
      this.possibleEnPassantLeftMoves(this.position, possibleMoves);
      this.possibleEnPassantRightMoves(this.position, possibleMoves);
    }
  }

  private isEnPassantRow(position: Position | null): position is Position {
    return position?.row === this.#enPassantRow;
  }

  private possibleEnPassantLeftMoves(position: Position, possibleMoves: Matrix<boolean>): void {
    const left = new Position(position.row, position.column - 1);
    this.setPossibleEnPassantMove(left, possibleMoves);
  }

  private setPossibleEnPassantMove(position: Position, possibleMoves: Matrix<boolean>): void {
    const isPossible = this.isPossibleMoveWhenEnPassantVulnerable(position);
    isPossible &&
      possibleMoves.set(isPossible, {
        row: position.row + this.#enPassantDirection,
        column: position.column,
      });
  }

  private isPossibleMoveWhenEnPassantVulnerable(position: Position): boolean {
    return (
      this.canMoveInOpponentPosition(position) &&
      this.board.piece(position) === this.chessMatch.enPassantVulnerable
    );
  }

  private possibleEnPassantRightMoves(position: Position, possibleMoves: Matrix<boolean>): void {
    const right = new Position(position.row, position.column + 1);
    this.setPossibleEnPassantMove(right, possibleMoves);
  }

  //@Override
  public toString(): string {
    return this.isWhite ? '♙' : '♟';
  }
}
