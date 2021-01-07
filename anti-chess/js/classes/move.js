export default class Move {
    constructor(x, y, factor = 1) {
        this._deltaX = x;
        this._deltaY = y;
        this._factor = factor;
        return this;
    }
    validate(src, dest) {
        const xDiff = Math.abs(dest.x - src.x);
        const yDiff = Math.abs(dest.y - src.y);
        if (this._factor != Infinity) {
            return xDiff == this._deltaX && yDiff == this._deltaY;
        } else {
            // Need to figure this out
        }
    }
}