import { Board } from '@src/board/domain/board';
import { Position } from '@src/board/domain/position';

import createMatrix from '@shared/domain/helpers/create-matrix';
import { Piece } from '@shared/domain/piece';

import { ChessPiece } from './chess-piece';
import { ChessPosition, Column, Row } from './chess-position';
import { ChessError } from './chess.error';
import { Color } from './color';
import { King } from './pieces/king';
import { Rook } from './pieces/rook';
import ROWS_AMOUNT from './rows-amount';

const COLUMN_AMOUNT = ROWS_AMOUNT;
const switchPlayer = {
  [Color.Black]: Color.White,
  [Color.White]: Color.Black,
};

export class ChessMatch {
  public readonly piecesOnTheBoard: ChessPiece[] = [];
  public readonly capturedPieces: ChessPiece[] = [];

  private readonly _board = new Board(ROWS_AMOUNT, COLUMN_AMOUNT);
  private _turn = 1;
  private _currentPlayer = Color.White;
  private _check = false;
  private _checkMate = false;

  constructor() {
    this.initialSetup();
  }

  get turn(): number {
    return this._turn;
  }

  get currentPlayer(): Color {
    return this._currentPlayer;
  }

  get isCheck(): boolean {
    return this._check;
  }

  get isCheckMate(): boolean {
    return this._checkMate;
  }

  protected get board(): Board {
    return this._board;
  }

  public pieces(): ChessPiece[][] {
    const { rows, columns } = this._board;
    const matrix = createMatrix<ChessPiece>(rows)(columns);
    this.fillPieces(matrix);
    return matrix;
  }

  private fillPieces(pieces: ChessPiece[][]): void {
    const { rows, columns } = this._board;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        pieces[i][j] = this._board.piece({ row: i, column: j }) as ChessPiece;
      }
    }
  }

  protected initialSetup(): void {
    const board = this._board;

    //#region WHITE PIECES
    this.placeNewPiece('e', 1, new King(board, Color.White));
    this.placeNewPiece('e', 2, new Rook(board, Color.White));
    this.placeNewPiece('d', 2, new Rook(board, Color.White));
    this.placeNewPiece('f', 2, new Rook(board, Color.White));
    this.placeNewPiece('d', 1, new Rook(board, Color.White));
    this.placeNewPiece('f', 1, new Rook(board, Color.White));
    //#endregion

    //#region BLACK PIECES
    this.placeNewPiece('e', 8, new King(board, Color.Black));
    this.placeNewPiece('d', 8, new Rook(board, Color.Black));
    this.placeNewPiece('f', 8, new Rook(board, Color.Black));
    this.placeNewPiece('d', 7, new Rook(board, Color.Black));
    this.placeNewPiece('e', 7, new Rook(board, Color.Black));
    this.placeNewPiece('f', 7, new Rook(board, Color.Black));
    //#endregion
  }

  protected placeNewPiece(column: Column, row: Row, piece: ChessPiece): void {
    const position = new ChessPosition(column, row).toPosition();
    this._board.placePiece(piece, position);
    this.piecesOnTheBoard.push(piece);
  }

  public possibleMoves(sourcePosition: ChessPosition): boolean[][] {
    const position = sourcePosition.toPosition();
    this.validateSourcePosition(position);
    return (this._board.piece(position) as Piece).possibleMoves();
  }

  public performChessMove(
    sourcePosition: ChessPosition,
    targetPosition: ChessPosition
  ): ChessPiece | null {
    const source = sourcePosition.toPosition();
    const target = targetPosition.toPosition();
    this.validateSourcePosition(source);
    this.validateTargetPosition(source, target);
    const capturedPiece = this.makeMove(source, target) as ChessPiece | null;
    this.addPossibleCapturedPiece(capturedPiece);
    this.verifyIfPutYourselfInCheck(source, target, capturedPiece);
    this.loadStatus();
    this.isCheckMate || this.nextTurn();
    return capturedPiece;
  }

  private validateSourcePosition(position: Position): void {
    if (!this._board.thereIsAPiece(position)) {
      throw new ChessError('There is no piece on source position');
    }
    const piece = this._board.piece(position) as ChessPiece;
    if (this._currentPlayer !== piece.color) {
      throw new ChessError('The chosen piece is not yours');
    }
    if (!this._board.piece(position)?.isThereAnyPossibleMove()) {
      throw new ChessError('There is no possible moves for the chosen piece');
    }
  }

  private validateTargetPosition(source: Position, target: Position): void {
    if (!this._board.piece(source)?.possibleMove(target)) {
      throw new ChessError(`There chose piece can't move to target position`);
    }
  }

  private makeMove(source: Position, target: Position): Piece | null {
    const piece = this._board.removePiece(source) as Piece;
    const capturedPiece = this._board.removePiece(target);
    this._board.placePiece(piece, target);
    return capturedPiece;
  }

  private addPossibleCapturedPiece(piece: ChessPiece | null): void {
    if (piece) {
      this.capturedPieces.push(piece);
      const index = this.piecesOnTheBoard.indexOf(piece);
      if (index > -1) {
        this.piecesOnTheBoard.splice(index, 1);
      }
    }
  }

  private verifyIfPutYourselfInCheck(
    source: Position,
    target: Position,
    capturedPiece: ChessPiece | null
  ): void {
    if (this.testCheck(this._currentPlayer)) {
      this.undoMove(source, target, capturedPiece);
      throw new ChessError(`You can't put yourself in check`);
    }
  }

  private loadStatus(): void {
    const opponent = this.opponent(this._currentPlayer);
    this._check = this.testCheck(opponent);
    this._checkMate = this._check && this.testCheckMate(opponent);
  }

  private testCheck(color: Color): boolean {
    const { row, column } = this.king(color).chessPosition.toPosition();
    const opponentPieces = this.piecesOnTheBoard.filter((p) => p.color === this.opponent(color));
    const isCheck = opponentPieces.some((p) => p.possibleMoves()[row][column]);
    return isCheck;
  }

  private undoMove(source: Position, target: Position, capturedPiece: ChessPiece | null): void {
    const piece = this._board.removePiece(target) as ChessPiece;
    this._board.placePiece(piece, source);

    if (capturedPiece) {
      this._board.placePiece(capturedPiece, target);
      this.removeCapturedPiece(capturedPiece);
    }
  }

  private removeCapturedPiece(piece: ChessPiece): void {
    this.piecesOnTheBoard.push(piece);
    const index = this.capturedPieces.indexOf(piece);
    if (index > -1) {
      this.capturedPieces.splice(index, 1);
    }
  }

  private nextTurn(): void {
    this._turn++;
    this._currentPlayer = this.opponent(this._currentPlayer);
  }

  private opponent(color: Color): Color {
    return switchPlayer[color];
  }

  private king(color: Color): ChessPiece {
    return this.piecesOnTheBoard.find((p) => p instanceof King && p.color === color) as ChessPiece;
  }

  private testCheckMate(color: Color): boolean {
    return !this.piecesOnTheBoard.some(
      (p) => p.color === color && this.tryPullOutCheckMate(color, p)
    );
  }

  private tryPullOutCheckMate(color: Color, piece: ChessPiece): boolean {
    const possibleMoves = piece.possibleMoves();
    for (let row = 0; row < this._board.rows; row++) {
      for (let column = 0; column < this._board.columns; column++) {
        if (possibleMoves[row][column]) {
          const target = new Position(row, column);
          const isCheck = this.testMoveToPullOutCheckMate(color, piece, target);
          if (!isCheck) return true;
        }
      }
    }
    return false;
  }

  private testMoveToPullOutCheckMate(color: Color, piece: ChessPiece, target: Position): boolean {
    const source = piece.chessPosition.toPosition();
    const capturedPiece = this.makeMove(source, target) as ChessPiece | null;
    const testCheck = this.testCheck(color);
    this.undoMove(source, target, capturedPiece);
    return testCheck;
  }
}
