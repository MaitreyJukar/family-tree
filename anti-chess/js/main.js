var AntiChess = function (p1, p2) {
    return {
        board: new Board(),
        players: [
            new Player(p1.name, "white"),
            new Player(p2.name, "black")
        ]
    }
}