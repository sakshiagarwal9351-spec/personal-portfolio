
const questions = [

    {
        question: "Which language is used to structure web pages?",
        options: ["CSS", "HTML", "Python", "C++"],
        answer: 1
    },

    {
        question: "Which language is used to style web pages?",
        options: ["JavaScript", "Python", "CSS", "Java"],
        answer: 2
    },

    {
        question: "Which keyword declares a variable in JavaScript?",
        options: ["let", "print", "include", "define"],
        answer: 0
    },

    {
        question: "Which programming language is widely used in AI/ML?",
        options: ["HTML", "Python", "CSS", "SQL"],
        answer: 1
    },

    {
        question: "What does DOM stand for?",
        options: [
            "Data Object Model",
            "Document Object Model",
            "Digital Ordinance Model",
            "Document Orientation Method"
        ],
        answer: 1
    }

];

// Quiz variables
let currentQuestion = 0;
let score = 0;
let answered = false;

// HTML elements
const questionElement = document.getElementById("question");
const numberElement = document.getElementById("question-number");
const progressText = document.getElementById("progress-text");
const progressBar = document.getElementById("progress-bar");

const optionsElement = document.getElementById("options");
const feedbackElement = document.getElementById("feedback");

const nextButton = document.getElementById("next-btn");

const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");


// Display question
function showQuestion() {

    answered = false;

    const q = questions[currentQuestion];

    questionElement.textContent = q.question;

    numberElement.textContent =
        `QUESTION ${currentQuestion + 1} OF ${questions.length}`;

    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    progressText.textContent = `${progress}%`;

    progressBar.style.width = `${progress}%`;

    optionsElement.innerHTML = "";

    feedbackElement.textContent = "";

    nextButton.disabled = true;

    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "See Result →"
            : "Next Question →";

    // Create answer buttons
    q.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.textContent = option;

        button.className = "quiz-option";

        button.type = "button";

        button.addEventListener("click", function () {
            selectAnswer(index);
        });

        optionsElement.appendChild(button);

    });

}


// Check selected answer
function selectAnswer(index) {

    if (answered) return;

    answered = true;

    const correctAnswer = questions[currentQuestion].answer;

    const buttons =
        optionsElement.querySelectorAll(".quiz-option");

    buttons.forEach((button, i) => {

        button.disabled = true;

        if (i === correctAnswer) {
            button.classList.add("correct");
        }

        if (i === index && index !== correctAnswer) {
            button.classList.add("incorrect");
        }

    });

    if (index === correctAnswer) {

        score++;

        feedbackElement.textContent = "✓ Correct answer!";

    } else {

        feedbackElement.textContent =
            "✗ Incorrect! Correct answer: " +
            questions[currentQuestion].options[correctAnswer];

    }

    nextButton.disabled = false;

}


// Next question
nextButton.addEventListener("click", function () {

    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();

    }

});


// Display final result
function showResult() {

    quizBox.hidden = true;

    resultBox.hidden = false;

    document.getElementById("score").textContent =
        `${score}/${questions.length}`;

    let message;

    if (score === 5) {
        message = "Excellent! You got every question correct.";
    } else if (score >= 3) {
        message = "Good job! Keep learning and improving.";
    } else {
        message = "Keep practising! You will get better.";
    }

    document.getElementById("result-message").textContent = message;

}


// Restart quiz
document.getElementById("restart-btn").addEventListener("click", function () {

    currentQuestion = 0;

    score = 0;

    quizBox.hidden = false;

    resultBox.hidden = true;

    showQuestion();

});


// Start quiz
showQuestion();
