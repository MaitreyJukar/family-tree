export default class Player {
    constructor(name, team) {
        this.name = name;
        this.team = team;
        this.active = false;
        return this;
    }
    startTurn() {
        this.active = true;
    }
    endTurn() {
        this.active = false;
    }
}