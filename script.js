var testLen = 0;
var correctAnswers = 0;
var wrongAnswers = 0;

const quizSection1 = document.querySelector("#quizSection1");
const scoreboard = document.querySelector("#scoreboard");

document.querySelector("#startBtn").addEventListener("click", function () {
    testLen = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    quizSection1.style.display = "block";
    testLen = document.querySelector("#quizSections").children.length - 1;
    document.querySelector("#quizSections").style.display = "flex";
    document.querySelector("#scoreboard").style.display = "none";
    document.querySelector("#prequizSection").style.display = "none";
    document.querySelector("#finalResults").style.display = "none";
    startTimer();
});

function startTimer() {
    var timeLeft = 60;
    document.querySelector("#timer").style.display = "flex";
    document.querySelector("#time").textContent = timeLeft;

    var timeInterval = setInterval(function () {
        timeLeft--;
        document.querySelector("#time").textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timeInterval);
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    // hide all quiz elements
    document.querySelector("#timer").style.display = "none";
    var allQuizSections = document.querySelector("#quizSections").children;
    for (let i = 0; i < allQuizSections.length - 1; i++) {
        document.querySelector(`#quizSection${i + 1}`).style.display = "none";
    }
    document.querySelector(".result").style.display = "none";
    document.querySelector("#quizSections").style.display = "none";
    // show final results
    document.querySelector("#prequizSection").style.display = "flex";
    document.querySelector("#finalResults").style.display = "flex";
    document.querySelector("#correctAnswers").textContent = correctAnswers;
    document.querySelector("#wrongAnswers").textContent = wrongAnswers;
}

document.querySelectorAll(".inputBtn").forEach((item) => {
    item.addEventListener("click", function () {
        console.log(correctAnswers);
        var questionNumber = this.getAttribute("data-q");
        var correct = this.value;

        if (correct === "correct") {
            correctAnswers++;
        } else {
            wrongAnswers++;
        }

        document.querySelector(".result").textContent = correct;

        document.querySelector(
            `#quizSection${parseInt(questionNumber)}`
        ).style.display = "none";

        let nextSection = document.querySelector(
            `#quizSection${parseInt(questionNumber) + 1}`
        );

        if (nextSection === null) {
            endQuiz();
        } else {
            nextSection.style.display = "block";
        }
    });
});

document.querySelector("#personForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var name = this.name.value;

    // console.log(allHighScores);

    var HighScore = JSON.parse(localStorage.getItem("allHighScores"));

    if (HighScore === null) {
        HighScore = [];
    }

    console.log(HighScore);

    HighScore.push([
        {
            name: name,
            correct: correctAnswers,
            wrong: wrongAnswers,
        },
    ]);

    console.log(HighScore);

    HighScore = JSON.stringify(HighScore);

    localStorage.setItem("allHighScores", HighScore);
    showHighScore();
});

document.querySelector("#highScore").addEventListener("click", function () {
    showHighScore();
});

function showHighScore() {
    document.querySelector("#finalResults").style.display = "none";
    scoreboard.style.display = "flex";

    var userScores = document.querySelector("#userScores");
    userScores.textContent = "";

    highScores = JSON.parse(localStorage.getItem("allHighScores"));
    for (let i = 0; i < highScores.length; i++) {
        let pTag = document.createElement("p");
        pTag.textContent = `${highScores[i][0].name} got a total correct of ${highScores[i][0].correct}`;
        userScores.append(pTag);
    }
}
