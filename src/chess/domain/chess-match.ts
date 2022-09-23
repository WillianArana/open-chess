import { Board } from '@src/board/domain/board';
import { Position } from '@src/board/domain/position';

import { Matrix } from '@shared/domain/matrix';
import { Piece } from '@shared/domain/piece';

import { ChessPiece } from './chess-piece';
import { ChessPosition, Column, Row } from './chess-position';
import { ChessError } from './chess.error';
import { Color } from './color';
import { BishopBlack } from './pieces/black/bishop.black';
import { KingBlack } from './pieces/black/king.black';
import { KnightBlack } from './pieces/black/knight.black';
import { PawnBlack } from './pieces/black/pawn.black';
import { QueenBlack } from './pieces/black/queen.black';
import { RookBlack } from './pieces/black/rook.black';
import { King } from './pieces/king';
import { Pawn } from './pieces/pawn';
import { BishopWhite } from './pieces/white/bishop.white';
import { KingWhite } from './pieces/white/king.white';
import { KnightWhite } from './pieces/white/knight.white';
import { PawnWhite } from './pieces/white/pawn.white';
import { QueenWhite } from './pieces/white/queen.white';
import { RookWhite } from './pieces/white/rook.white';
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
  private _enPassantVulnerable: ChessPiece | null = null;

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

  get enPassantVulnerable(): ChessPiece | null {
    return this._enPassantVulnerable;
  }

  protected get board(): Board {
    return this._board;
  }

  public pieces(): Matrix<ChessPiece> {
    const { rows, columns } = this._board;
    const chessPieces = new Matrix<ChessPiece>(rows, columns);
    const pieces = this._board.pieces();
    chessPieces.fill(pieces as Matrix<ChessPiece>);
    return chessPieces;
  }

  protected initialSetup(): void {
    this.placeWhitePieces();
    this.placeBlackPieces();
  }

  private placeWhitePieces(): void {
    const board = this._board;
    this.placeNewPiece('a', 1, new RookWhite(board));
    this.placeNewPiece('b', 1, new KnightWhite(board));
    this.placeNewPiece('c', 1, new BishopWhite(board));
    this.placeNewPiece('d', 1, new QueenWhite(board));
    this.placeNewPiece('e', 1, new KingWhite(board, this));
    this.placeNewPiece('f', 1, new BishopWhite(board));
    this.placeNewPiece('g', 1, new KnightWhite(board));
    this.placeNewPiece('h', 1, new RookWhite(board));

    for (const column of 'abcdefgh') {
      this.placeNewPiece(column as Column, 2, new PawnWhite(board, this));
    }
  }

  private placeBlackPieces(): void {
    const board = this._board;
    this.placeNewPiece('a', 8, new RookBlack(board));
    this.placeNewPiece('b', 8, new KnightBlack(board));
    this.placeNewPiece('c', 8, new BishopBlack(board));
    this.placeNewPiece('d', 8, new QueenBlack(board));
    this.placeNewPiece('e', 8, new KingBlack(board, this));
    this.placeNewPiece('f', 8, new BishopBlack(board));
    this.placeNewPiece('g', 8, new KnightBlack(board));
    this.placeNewPiece('h', 8, new RookBlack(board));

    for (const column of 'abcdefgh') {
      this.placeNewPiece(column as Column, 7, new PawnBlack(board, this));
    }
  }

  protected placeNewPiece(column: Column, row: Row, piece: ChessPiece): void {
    const position = new ChessPosition(column, row).toPosition();
    this._board.placePiece(piece, position);
    this.piecesOnTheBoard.push(piece);
  }

  public possibleMoves(sourcePosition: ChessPosition): Matrix<boolean> {
    const position = sourcePosition.toPosition();
    this.validateSourcePosition(position);
    return (this._board.piece(position) as Piece).possibleMoves();
  }

  public performChessMove(
    sourcePosition: ChessPosition,
    targetPosition: ChessPosition,
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
    this.setIfHasEnPassantVulnerable(source, target);

    return capturedPiece;
  }

  private setIfHasEnPassantVulnerable(source: Position, target: Position): void {
    const movedPiece = this.board.piece(target) as ChessPiece;
    this._enPassantVulnerable =
      movedPiece instanceof Pawn && (target.row === source.row - 2 || target.row === source.row + 2)
        ? movedPiece
        : null;
  }

  private validateSourcePosition(position: Position): void {
    this.validateThereIsAPiece(position);
    this.validatePieceIsYours(position);
    this.validateIsThereAnyPossibleMove(position);
  }

  private validateThereIsAPiece(position: Position): void {
    if (!this._board.thereIsAPiece(position)) {
      throw new ChessError('There is no piece on source position');
    }
  }

  private validatePieceIsYours(position: Position): void {
    const piece = this._board.piece(position) as ChessPiece;
    if (this._currentPlayer !== piece.color) {
      throw new ChessError('The chosen piece is not yours');
    }
  }

  private validateIsThereAnyPossibleMove(position: Position): void {
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
    const piece = this._board.removePiece(source) as ChessPiece;
    piece.increaseMoveCount();
    let capturedPiece = this._board.removePiece(target);
    this._board.placePiece(piece, target);

    this.specialMoveCastlingKingSideRook(piece, source, target);
    this.specialMoveCastlingQueenSideRook(piece, source, target);
    capturedPiece = this.specialMoveEnPassant(piece, source, target, capturedPiece);

    return capturedPiece;
  }

  private specialMoveEnPassant(
    piece: ChessPiece,
    source: Position,
    target: Position,
    capturedPiece: Piece | null,
  ): Piece | null {
    if (piece instanceof Pawn && source.column !== target.column && capturedPiece === null) {
      const row = piece.isWhite ? target.row + 1 : target.row - 1;
      const pawnPosition = new Position(row, target.column);
      capturedPiece = this.board.removePiece(pawnPosition);
    }
    return capturedPiece;
  }

  private specialMoveCastlingKingSideRook(
    piece: ChessPiece,
    source: Position,
    target: Position,
  ): void {
    if (this.checkCastlingKingSideRook(piece, source, target)) {
      const rookSource = new Position(source.row, source.column + 3);
      const rookTarget = new Position(source.row, source.column + 1);
      this.makeMove(rookSource, rookTarget);
    }
  }

  private checkCastlingKingSideRook(
    piece: ChessPiece,
    source: Position,
    target: Position,
  ): boolean {
    return King.isInstance(piece) && target.column === source.column + 2;
  }

  private specialMoveCastlingQueenSideRook(
    piece: ChessPiece,
    source: Position,
    target: Position,
  ): void {
    if (this.checkCastlingQueenSideRook(piece, source, target)) {
      const rookSource = new Position(source.row, source.column - 4);
      const rookTarget = new Position(source.row, source.column - 1);
      this.makeMove(rookSource, rookTarget);
    }
  }

  private checkCastlingQueenSideRook(
    piece: ChessPiece,
    source: Position,
    target: Position,
  ): boolean {
    return King.isInstance(piece) && target.column === source.column - 2;
  }

  private addPossibleCapturedPiece(piece: ChessPiece | null): void {
    if (piece) {
      this.capturedPieces.push(piece);
      const index = this.piecesOnTheBoard.indexOf(piece);
      if (index !== -1) {
        this.piecesOnTheBoard.splice(index, 1);
      }
    }
  }

  private verifyIfPutYourselfInCheck(
    source: Position,
    target: Position,
    capturedPiece: ChessPiece | null,
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
    const position = this.king(color).chessPosition.toPosition();
    const opponentPieces = this.piecesOnTheBoard.filter((p) => p.color === this.opponent(color));
    const isCheck = opponentPieces.some((p) => p.possibleMoves().get(position));
    return isCheck;
  }

  private undoMove(source: Position, target: Position, capturedPiece: ChessPiece | null): void {
    const piece = this._board.removePiece(target) as ChessPiece;
    this._board.placePiece(piece, source);

    if (capturedPiece) {
      capturedPiece.decreaseMoveCount();
      this._board.placePiece(capturedPiece, target);
      this.removeCapturedPiece(capturedPiece);
    }

    this.specialUndoMoveCastlingKingSideRook(piece, source, target);
    this.specialUndoMoveCastlingQueenSideRook(piece, source, target);
    this.specialUndoMoveEnPassant(piece, capturedPiece, source, target);
  }

  private specialUndoMoveEnPassant(
    piece: ChessPiece,
    capturedPiece: ChessPiece | null,
    source: Position,
    target: Position,
  ): void {
    if (
      piece instanceof Pawn &&
      source.column !== target.column &&
      capturedPiece === this.enPassantVulnerable
    ) {
      const pawn = this.board.removePiece(target) as ChessPiece;
      const row = piece.isWhite ? 3 : 4;
      const pawnPosition = new Position(row, target.column);
      this._board.placePiece(pawn, pawnPosition);
    }
  }

  private specialUndoMoveCastlingKingSideRook(
    piece: ChessPiece,
    source: Position,
    target: Position,
  ): void {
    if (this.checkCastlingKingSideRook(piece, source, target)) {
      const rookSource = new Position(source.row, source.column + 3);
      const rookTarget = new Position(source.row, source.column + 1);
      const rook = this._board.piece(rookSource) as ChessPiece;
      this.undoMove(rookSource, rookTarget, rook);
    }
  }

  protected specialUndoMoveCastlingQueenSideRook(
    piece: ChessPiece,
    source: Position,
    target: Position,
  ): void {
    if (this.checkCastlingQueenSideRook(piece, source, target)) {
      const rookSource = new Position(source.row, source.column - 4);
      const rookTarget = new Position(source.row, source.column - 1);
      const rook = this._board.piece(rookSource) as ChessPiece;
      this.undoMove(rookSource, rookTarget, rook);
    }
  }

  private removeCapturedPiece(piece: ChessPiece): void {
    const index = this.capturedPieces.indexOf(piece);
    if (index !== -1) {
      this.piecesOnTheBoard.push(piece);
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
      (p) => p.color === color && this.tryPullOutCheckMate(color, p),
    );
  }

  private tryPullOutCheckMate(color: Color, piece: ChessPiece): boolean {
    const possibleMoves = piece.possibleMoves();
    for (const isPossibleMove of possibleMoves) {
      if (isPossibleMove) {
        const target = possibleMoves.position;
        const isCheck = this.testMoveToPullOutCheckMate(color, piece, target);
        if (!isCheck) return true;
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
