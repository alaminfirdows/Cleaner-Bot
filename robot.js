// Only allowed directions
const cardinals = ["E", "W", "N", "S"];

// Array to stores the sequence of directions
let commandSequence = [];

// Object that initially stored the command
const command = {
    direction: "N",
    steps: 1
};

// This function makes sure the robot is not told to travel out of bounds
const inBounds = function (position) {
    if (position > 50) {
        position = 50;
    } else if (position < -50) {
        position = -50;
    }

    return position;
}

// This function determines if the robot has already cleaned a certain tile. returns 1 if true, -1 if false
const isCovered = function (arr, point) {
    arr = JSON.stringify(arr);
    point = JSON.stringify(point);
    return arr.indexOf(point);
}

// This function adds a command to the sequence of instructions
const addCommand = function (comms) {
    const newCommand = Object.create(command);

    newCommand.direction = comms[0];
    newCommand.steps = parseInt(comms[1]);

    // Makes sure the direction entered and the number of steps taken are valid inputs
    if (cardinals.includes(newCommand.direction) && Number.isInteger(newCommand.steps)) {
        commandSequence.push(newCommand);
    }
}

// This function asks the user to input commands
const getCommands = function () {
    let comm, more = false;
    // The loop will continue asking for commands until it reaches the limit
    for (let i = 1; i <= 50; i++) {
        comm = prompt("What direction (N,S,E,W) and how many steps?", "");
        // Splits user input into direction and number of steps

        comms = comm.split(" ");
        addCommand(comms);
        if (i < 50) {
            more = confirm("Add another command?");
        }
        // If the user declines to enter more commands, exits loop
        if (more == false) {
            break;
        }
    }

    // Call main function
    cleanRoom();
}

const cleanRoom = function () {
    // Starting coordinates
    const xStart = parseInt(document.getElementById("x_input").value);
    const yStart = parseInt(document.getElementById("y_input").value);
    let currX = xStart;
    let currY = yStart;
    let command;

    // This array to saves visited coordinates
    let coords = [];

    // Add starting coordinates to array
    coords.push([currX, currY]);

    // Output on console
    console.log("Starting position: X =" + currX + " Y = " + currY);

    // Run comands
    while (commandSequence.length != 0) {

        // Next instructions from the queue
        command = commandSequence.shift();
        let posY = currY;
        let posX = currX;

        // Output on console
        console.log("Current position: X = " + currX + " Y = " + currY);

        // Next coordinates are dependent on what direction robot is told to go
        switch (command.direction) {
            case "N":

                // Destination coordinates
                currY = currY + command.steps;
                // Check the destination is not out of bounds
                currY = inBounds(currY);
                for (let i = posY; i <= currY; i++) {
                    // Determine if robot has already covered a space
                    let found = isCovered(coords, [posX, i]);
                    if (found != -1) {
                        continue;
                    };
                    // If it hasn't, push coordinates to array of visited spaces
                    coords.push([posX, i]);
                }
                // Output on console
                console.log("Go to north Coordinate");
                break;
            case "S":
                currY = currY - command.steps;
                currY = inBounds(currY);
                for (let i = posY; i >= currY; i--) {
                    let found = isCovered(coords, [posX, i]);
                    if (found != -1) {
                        continue;
                    };
                    coords.push([posX, i]);
                }
                // Output on console
                console.log("Go to south Coordinate");
                break;
            case "E":
                currX = currX + command.steps;
                currX = inBounds(currX);
                for (let i = posX; i <= currX; i++) {
                    let found = isCovered(coords, [i, posY]);
                    if (found != -1) {
                        continue;
                    };
                    coords.push([i, posY]);
                }
                // Output on console
                console.log("Go to east Coordinate");
                break;
            case "W":
                currX = currX - command.steps;
                currX = inBounds(currX);
                for (let i = posX; i >= currX; i--) {
                    let found = isCovered(coords, [i, posY]);
                    if (found != -1) {
                        continue;
                    };
                    coords.push([i, posY]);
                }
                // Output on console
                console.log("Go to west Coordinate");
                break;
        }
    }

    // Output number of unique spaces visited
    document.querySelector(".result").innerHTML = "Total Cleaned: " + coords.length + " space";
}