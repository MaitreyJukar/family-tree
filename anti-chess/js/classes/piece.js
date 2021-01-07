import Move from "./move.js";

const pieceIDs = [];
export default class Piece {
    constructor(color, ID) {
        if (pieceIDs.indexOf(ID) > -1) {
            return console.error("Piece ID needs to be unique");
        }
        this.ID = ID;
        this.color = color;
        this.moved = false;
        return this;
    }
    allowedMoves = [];
    startMoves = this.allowedMoves;
    killMoves = this.allowedMoves;
    specialMoves = [];
}

export class King extends Piece {
    allowedMoves = [
        new Move(1, 0, 1),
        new Move(0, 1, 1),
        new Move(1, 1, 1)
    ]
    specialMoves = [
        new Move(2, 0, 1)
    ];
}

export class Queen extends Piece {
    allowedMoves = [
        new Move(1, 0, Infinity),
        new Move(0, 1, Infinity),
        new Move(1, 1, Infinity)
    ];
}

export class Rook extends Piece {
    allowedMoves = [
        new Move(1, 0, Infinity),
        new Move(0, 1, Infinity)
    ];
}

export class Bishop extends Piece {
    allowedMoves = [
        new Move(1, 1, Infinity)
    ];
}

export class Knight extends Piece {
    allowedMoves = [
        new Move(1, 2, 1),
        new Move(2, 1, 1)
    ];
}

export class Pawn extends Piece {
    allowedMoves = [
        new Move(0, 1, 1)
    ];
    killMoves = [
        new Move(1, 1, 1)
    ];
}