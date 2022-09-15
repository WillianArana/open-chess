import { Position } from '@src/board/domain/position';

import { BoardInterface } from '@shared/domain/interfaces/board.interface';
import { PositionInterface } from '@shared/domain/interfaces/position.interface';
import { Matrix } from '@shared/domain/matrix';

import { ChessMatch } from '../chess-match';
import { ChessPiece } from '../chess-piece';
import { Color } from '../color';
import { Rook } from './rook';

export class King extends ChessPiece {
  protected readonly chessMatch: ChessMatch;

  constructor(board: BoardInterface, color: Color, chessMatch: ChessMatch) {
    super(board, color);
    this.chessMatch = chessMatch;
  }

  static isInstance(piece: ChessPiece): piece is King {
    return piece instanceof King;
  }

  //@Override
  public possibleMoves(): Matrix<boolean> {
    const possibleMoves = this.createMatrixPossibleMoves();
    this.possibleAboveMove(possibleMoves);
    this.possibleBelowMove(possibleMoves);
    this.possibleLeftMove(possibleMoves);
    this.possibleRightMove(possibleMoves);
    this.possibleNorthwestMove(possibleMoves);
    this.possibleNortheastMove(possibleMoves);
    this.possibleSouthwestMove(possibleMoves);
    this.possibleSoutheastMove(possibleMoves);
    this.possibleCastlingMoves(possibleMoves);
    return possibleMoves;
  }

  private possibleAboveMove(possibleMoves: Matrix<boolean>): void {
    const createPosition = (row: number, column: number) => new Position(row - 1, column);
    this.setPossibleMoves(possibleMoves, createPosition);
  }

  private possibleBelowMove(possibleMoves: Matrix<boolean>): void {
    const createPosition = (row: number, column: number) => new Position(row + 1, column);
    this.setPossibleMoves(possibleMoves, createPosition);
  }

  private possibleLeftMove(possibleMoves: Matrix<boolean>): void {
    const createPosition = (row: number, column: number) => new Position(row, column - 1);
    this.setPossibleMoves(possibleMoves, createPosition);
  }

  private possibleRightMove(possibleMoves: Matrix<boolean>): void {
    const createPosition = (row: number, column: number) => new Position(row, column + 1);
    this.setPossibleMoves(possibleMoves, createPosition);
  }

  private possibleNorthwestMove(possibleMoves: Matrix<boolean>): void {
    const createPosition = (row: number, column: number) => new Position(row - 1, column - 1);
    this.setPossibleMoves(possibleMoves, createPosition);
  }

  private possibleNortheastMove(possibleMoves: Matrix<boolean>): void {
    const createPosition = (row: number, column: number) => new Position(row - 1, column + 1);
    this.setPossibleMoves(possibleMoves, createPosition);
  }

  private possibleSouthwestMove(possibleMoves: Matrix<boolean>): void {
    const createPosition = (row: number, column: number) => new Position(row + 1, column - 1);
    this.setPossibleMoves(possibleMoves, createPosition);
  }

  private possibleSoutheastMove(possibleMoves: Matrix<boolean>): void {
    const createPosition = (row: number, column: number) => new Position(row + 1, column + 1);
    this.setPossibleMoves(possibleMoves, createPosition);
  }

  //@Override
  protected setPossibleMoves(
    possibleMoves: Matrix<boolean>,
    createPosition: (row: number, column: number) => Position,
  ): void {
    if (this.position) {
      const position = createPosition(this.position.row, this.position.column);
      if (this.canMove(position)) {
        possibleMoves.set(true, position);
      }
    }
  }

  private possibleCastlingMoves(possibleMoves: Matrix<boolean>): void {
    if (this.position && this.moveCount === 0 && !this.chessMatch.isCheck) {
      this.possibleCastlingKingSideRookMove(possibleMoves);
      this.possibleCastlingQueenSideRookMove(possibleMoves);
    }
  }

  private possibleCastlingKingSideRookMove(possibleMoves: Matrix<boolean>): void {
    const position = this.position as Position;
    const kingSideRookPosition = new Position(position.row, position.column + 3);
    if (this.testRookCastling(kingSideRookPosition)) {
      const toPosition = new Position(position.row, position.column + 2);
      if (
        !this.board.thereIsAPiece(toPosition) &&
        !this.board.thereIsAPiece(new Position(position.row, position.column + 1))
      ) {
        possibleMoves.set(true, toPosition);
      }
    }
  }

  private possibleCastlingQueenSideRookMove(possibleMoves: Matrix<boolean>): void {
    const position = this.position as Position;
    const queenSideRookPosition = new Position(position.row, position.column - 4);
    if (this.testRookCastling(queenSideRookPosition)) {
      const toPosition = new Position(position.row, position.column - 2);
      if (
        !this.board.thereIsAPiece(toPosition) &&
        !this.board.thereIsAPiece(new Position(position.row, position.column - 1)) &&
        !this.board.thereIsAPiece(new Position(position.row, position.column - 3))
      ) {
        possibleMoves.set(true, toPosition);
      }
    }
  }

  protected testRookCastling(position: PositionInterface): boolean {
    const chessPiece = this.board.piece(position) as ChessPiece;
    return (
      !!chessPiece &&
      chessPiece instanceof Rook &&
      chessPiece.moveCount === 0 &&
      chessPiece.color === this.color
    );
  }

  private canMove(position: Position): boolean {
    return this.canMoveInEmptyPosition(position) || this.canMoveInOpponentPosition(position);
  }

  //@Override
  public toString(): string {
    return this.isWhite ? '♔' : '♚';
  }
}
