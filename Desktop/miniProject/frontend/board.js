straights = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]
outsides = [
    0, 0, 0, 0, 0, 0
]

horizontalSplits = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]
verticalSplits = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]

const coinValue = 100;
var betType = Infinity;
score = 0;

squares = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
]


var currBet;
var splitBet;

function chipSelector(chip) {
    selectedChip = {
        'chip': chip.id,
        'value': chip.value
    };
    console.log(selectedChip);
}

function straightBet(element) {
    betType = "straight";
    selected = parseInt(element.getAttribute("data-num"));
    straights[selected - 1] = selected;
    currBet = selected;
    var chipImage = document.createElement("img");
    chipImage.src = "assets/chip_blue.png";
    chipImage.height = 25;
    chipImage.width = 25;
    console.log("image not added")
    element.appendChild(chipImage);
    console.log(straights);
}

function horizontalSplitBet(element) {
    betType = "split";
    selected = parseInt(element.innerHTML[0]);
    horizontalSplits[selected - 1] = selected;
}

function verticalSplitBet(element) {
    betType = "split";
    selected = parseInt(element.innerHTML[0]);
    verticalSplits[selected - 1] = selected;
}


function lowerRangeBet() {
    betType = "lower";
    outsides[0]++;
    console.log(outsides);
}

function upperRangeBet() {
    betType = "upper";
    outsides[5]++;
    console.log(outsides);
}

function evenBet() {
    betType = "even";
    outsides[1]++;
    console.log(outsides);
}

function oddBet() {
    betType = "odd";
    outsides[4]++;
    console.log(outsides);
}

function redBet() {
    betType = "red";
    outsides[2]++;
    console.log(outsides);
}

function blackBet() {
    betType = "black";
    outsides[3]++;
    console.log(outsides);
}

function checkStraightBet(result) {
    console.log("spinnning result : ", result);
    if (parseInt(result) == currBet) {
        score += (35 * coinValue);
        document.getElementById("final-value").innerHTML = `you won the bet\ncurrent score :` + score;
    } else {
        score = Math.max(0, score - coinValue);
        document.getElementById("final-value").innerHTML = "you lost the bet\ncurrent score :" + score;
    }
}

function checkSplitBet(result) {
    console.log("spinnning result : ", result);
    if (parseInt(result) == splitBet[0] || parseInt(result) == splitBet[1]) {
        score += (17 * coinValue);
        document.getElementById("final-value").innerHTML = `you won the bet\ncurrent score :` + score
    } else {
        score = Math.max(0, score - coinValue);
        document.getElementById("final-value").innerHTML = "you lost the bet\ncurrent score :" + score;
    }
}

function checkOddBet(result) {
    console.log("spinnning result : ", result);
    if (result % 2) {
        score += (coinValue);
        document.getElementById("final-value").innerHTML = `you won the bet\ncurrent score :` + score;
    } else {
        score = Math.max(0, score - coinValue);
        document.getElementById("final-value").innerHTML = "you lost the bet\ncurrent score :" + score;
    }
}

function checkLower(result) {
    console.log("spinnning result : ", result);
    res = parseInt(result);
    if (res >= 1 && res <= 18) {
        score += (coinValue);
        document.getElementById("final-value").innerHTML = `you won the bet\ncurrent score :` + score;
    } else {
        score = Math.max(0, score - coinValue);
        document.getElementById("final-value").innerHTML = "you lost the bet\ncurrent score :" + score;
    }
}

function checkUpper(result) {
    console.log("spinnning result : ", result);
    res = parseInt(result);
    if (res >= 19 && res <= 36) {
        score += (coinValue);
        document.getElementById("final-value").innerHTML = `you won the bet\ncurrent score :` + score;
    } else {
        score = Math.max(0, score - coinValue);
        document.getElementById("final-value").innerHTML = "you lost the bet\ncurrent score :" + score;
    }
}

function checkEvenBet(result) {
    console.log("spinnning result : ", result);
    if (!(result % 2)) {
        score += coinValue;
        document.getElementById("final-value").innerHTML = `you won the bet\ncurrent score :` + score;
    } else {
        score = Math.max(0, score - coinValue);
        document.getElementById("final-value").innerHTML = "you lost the bet\ncurrent score :" + score;
    }
}

document.addEventListener('spinCompleted',
    function(event) {
        var res = event.detail;
        switch (betType) {
            case 'straight':
                checkStraightBet(res);
                break;
            case 'split':
                checkSplitBet(res);
                break;
            case 'even':
                checkEvenBet(res);
                break;
            case 'odd':
                checkOddBet(res);
                break;
            case 'upper':
                checkUpper(res);
                break;
            case 'lower':
                checkLower(res);
                break;
        }
    })


function playerTurn(event) {
    var element = event
    if (element.target.classList.contains("btn") &&
        (element.target.classList.contains("m")) &&
        (element.target.classList.contains("rm")) &&
        (element.target.classList.contains("cm"))) {
        var betVal = parseInt(element.getAttribute("data-num"));
        console.log(betVal);
    }
}