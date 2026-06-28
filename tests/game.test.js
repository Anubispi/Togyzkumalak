// Simple test runner because we don't have npm/jest in this env
const fs = require('fs');

// Use a simple trick to make the class available globally in Node
const gameCode = fs.readFileSync('js/game.js', 'utf8');
const TogyzkumalakGame = new Function(gameCode + "; return TogyzkumalakGame;")();

function assert(condition, message) {
    if (!condition) {
        console.error("FAILED: " + message);
        process.exit(1);
    } else {
        console.log("PASSED: " + message);
    }
}

function testInitialState() {
    const game = new TogyzkumalakGame();
    assert(game.board.length === 18, "Board should have 18 holes");
    assert(game.board.every(val => val === 9), "Every hole should have 9 stones");
    assert(game.kazan[0] === 0 && game.kazan[1] === 0, "Kazans should be empty");
}

function testBasicMove() {
    const game = new TogyzkumalakGame();
    game.makeMove(0); // Player 1 moves from hole 0
    assert(game.board[0] === 1, "Starting hole should have 1 stone left (since it had > 1)");
    assert(game.board[1] === 10, "Next hole should have 10 stones");
    assert(game.currentPlayer === 2, "Turn should switch to player 2");
}

function testCapture() {
    const game = new TogyzkumalakGame();
    game.board = Array(18).fill(0);
    game.board[0] = 10;
    game.board[9] = 1; // index 9 is opponent side (1st hole)

    game.makeMove(0);
    assert(game.kazan[0] === 2, "Should have captured 2 stones from index 9. Kazan: " + game.kazan[0]);
    assert(game.board[9] === 0, "Captured hole should be empty");
}

testInitialState();
testBasicMove();
testCapture();

console.log("\nAll core logic tests passed!");
