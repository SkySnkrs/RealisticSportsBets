// #region state
let bank = 100
let bankHighScore = 0
let maxBets = 10

const players = [
    { teamNumber: 1, emoji: '🏃‍♂️', skill: 10, name: "D'Marcus Williams" },
    { teamNumber: 1, emoji: '🤾‍♂️', skill: 30, name: "Tire Smoothie-Wallace" },
    { teamNumber: 1, emoji: '🏇', skill: 88, name: "Jack Tackle" },
    { teamNumber: 1, emoji: '🏌️‍♀️', skill: 15, name: "Java Jamar Java-Lamar" },
    { teamNumber: 1, emoji: '🏋️‍♂️', skill: 77, name: "Desperate Poopsie" },
    { teamNumber: 1, emoji: '🏌️‍♂️', skill: 21, name: "D'Jasper Probed III" },
    { teamNumber: 1, emoji: '🤾', skill: 5, name: "Leo Maxwell Jill" },
    { teamNumber: 1, emoji: '🏂', skill: 99, name: "Hinge McCringe" },
    { teamNumber: 1, emoji: '🧘‍♀️', skill: 50, name: "L'Carpet Doo" },
    { teamNumber: 1, emoji: '🚶‍♀️', skill: 1, name: "Xmas Jax Flax-Wax" },
    { teamNumber: 2, emoji: '🏋️‍♀️', skill: 61, name: "Saggy Jeff" },
    { teamNumber: 2, emoji: '🤺', skill: 34, name: "Quat Quat" },
    { teamNumber: 2, emoji: '🏄', skill: 71, name: "X-Wing @Alice" },
    { teamNumber: 2, emoji: '🧜‍♂️', skill: 76, name: "Bis Tristan" },
    { teamNumber: 2, emoji: '🤸', skill: 47, name: "Scott Velocity Melon" },
    { teamNumber: 2, emoji: '⛹️‍♀️', skill: 23, name: "Donkey Teeth" },
    { teamNumber: 2, emoji: '🕴️', skill: 58, name: "T.J. A.J. R.J. BackSlashInFourth V" },
    { teamNumber: 2, emoji: '💃', skill: 99, name: "FirstName LastName" },
    { teamNumber: 2, emoji: '🧍‍♂️', skill: 3, name: "Dan Smith" },
    { teamNumber: 2, emoji: '🐅', skill: 100, name: "Tiger" },
]

// #endregion state


// #region

let playerOneElm = document.getElementById('teamOneMembers')
let playerTwoElm = document.getElementById('teamTwoMembers')
let bankBal = document.getElementById('bankBalance')
let highScoreElm = document.getElementById('HighScore')

function findTeam() {
    playerOneElm.innerHTML = ''
    playerTwoElm.innerHTML = ''

    for (let i = 0; i < players.length; i++) {
        let player = players[i]
        if (player.teamNumber == 1) {
            playerOneElm.innerHTML += `<span class='fs-1'>${player.emoji}</span>`;
        }
        if (player.teamNumber == 2) {
            playerTwoElm.innerHTML += `<span class='fs-1'>${player.emoji}</span>`;
        }
    }
}

function bankBalance() {
    bankBal.innerHTML = `<h4>$${bank}</h4>`
}

function teamSkill() {
    let team1Skill = 0
    let team2Skill = 0

    for (let i = 0; i < players.length; i++) {
        let player = players[i]
        if (player.teamNumber == 1) {
            team1Skill += player.skill
        } if (player.teamNumber == 2) {
            team2Skill += player.skill
        }
    }
    return { team1Skill, team2Skill };
}

function betTeam1(betSize) {
    let { team1Skill, team2Skill } = teamSkill();

    if (team1Skill > team2Skill) {
        bank += betSize

    } else {
        bank -= betSize
        checkForLoss()
    }
    maxBets -= 1
    bankBalance()
    highestScore()
    randomNumber()
    maxBetsLeft()
}

function betTeam2(betSize) {
    let { team1Skill, team2Skill } = teamSkill();

    if (team1Skill < team2Skill) {
        bank += betSize
    } else {
        bank -= betSize
        checkForLoss()
    }
    maxBets -= 1
    bankBalance()
    highestScore()
    randomNumber()
    maxBetsLeft()
}

function checkForLoss() {
    if (bank == 0) {
        showLossPopup("Game Over! You've lost the game.", 'popupLose')
        bank = 100
        bankBalance()
        randomNumber()
        maxBets = 10
    }
}

function showLossPopup(message, color) {

    const overlay = document.createElement('div');
    overlay.className = 'overlay';


    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.classList.add(color);
    popup.innerHTML = `
        <p>${message}</p>
        <button onclick="closePopup()">Close</button>
    `;
    overlay.appendChild(popup);
    document.body.appendChild(overlay);


    setTimeout(() => popup.remove(), 5000);


    window.closePopup = function () {
        document.body.removeChild(overlay);
    };


}


function randomNumber() {
    for (let i = 0; i < players.length; i++) {
        let player = players[i]
        let randomTeamNumber = Math.ceil(Math.random() * 2)
        player.teamNumber = randomTeamNumber
    }
    findTeam()
}

function highestScore() {
    if (bank > bankHighScore) {
        bankHighScore = bank;
        highScoreElm.innerHTML = `${bankHighScore}`;
    }
}

function resetHighScore() {
    highScoreElm.innerHTML = `${bankHighScore}`
}

function maxBetsLeft() {
    if (maxBets == 0) {
        showLossPopup(`Congrats You Have Reached The Max Bets, Your Score Was: ${bank}`, `popupWin`)
        bank = 100
        maxBets = 10
        bankBalance()
        randomNumber()
    }
}

bankBalance()
randomNumber()
resetHighScore()

//#endregion