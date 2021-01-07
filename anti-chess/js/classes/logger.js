export default class Logger {
    constructor() {
        return this;
    }
    _log(message) {
        console.log(message);
    }
    logMove(piece, src, dest) {
        this._log(`${piece.ID} moved from ${src.x}, ${src.y} to ${dest.x}, ${dest.y}`);
    }
}