"use strict";

const welcome = document.querySelector(".welcome-container");
const quiz = document.querySelector(".quiz-container");
const questionNumber = document.getElementById("questionNumber");
const submitButton = document.getElementById("submit-answer-btn");
const nextButton = document.getElementById("next-question-btn");
const choiceA = document.getElementById("answerChoiceA");
const categoryContainer = document.getElementById("category-container");

const answerChoice = document.querySelectorAll(".answer-choice-container");

let choiceData = null;

let quizData = null;
fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    quizData = data.quizzes;
    console.log("🚀 ~ file: app.js:13 ~ fetch ~ jsonData:", quizData);
  });

questionNumber.textContent = "1";

console.log("STARTED");

function categoryClick(event) {
  console.log("🚀 ~ file: app.js:21 ~ categoryClick ~ event:", event);
  const choice = event.target.dataset.choice;
  let choiceData = null;
  for (let category of quizData) {
    if (category.title === choice) {
      choiceData = category;
      break;
    }
  }
  if (choiceData === null) {
    // didn't find choice, should not happen
  }
  console.log("🚀 ~ file: app.js:33 ~ categoryClick ~ choiceData:", choiceData);
  if (choice === "HTML") {
    welcome.classList.add("d-none");
    quiz.classList.remove("d-none");
    categoryContainer.classList.remove("d-none");
    categoryContainer.querySelector("span").textContent = choiceData.title;
    categoryContainer.querySelector("img").src = choiceData.icon;
    quiz.querySelector("h2").textContent = choiceData.questions[0].question;
    quiz.querySelector("#answerChoiceA").textContent =
      choiceData.questions[0].options[0];
    quiz.querySelector("#answerChoiceB").textContent =
      choiceData.questions[0].options[1];
    quiz.querySelector("#answerChoiceC").textContent =
      choiceData.questions[0].options[2];
    quiz.querySelector("#answerChoiceD").textContent =
      choiceData.questions[0].options[3];
    let correctAnswer = choiceData.questions[0].answer;

    // Answer selection
    var answers = document.getElementById("answers").querySelectorAll("a");

    for (var i = 0; i < answers.length; i++) {
      answers[i].addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the default behavior of the link
        // Remove the class from all links
        for (var j = 0; j < answers.length; j++) {
          answers[j].classList.remove("selected");
        }
        // Add the class to the clicked link
        this.classList.add("selected");
      });
    }

    document
      .getElementById("submit-answer-btn")
      .addEventListener("click", function () {
        // Needs to check if selected answer is correct
        let finalAnswer = document.querySelector(
          ".selected .answer-choice"
        ).textContent;

        // If it is correct, then apply 'correct' styling
        if (finalAnswer === correctAnswer) {
          document.querySelector(".selected").classList.add("correct");
          document.querySelector(".selected").classList.remove("selected");
        } else {
          // If incorrect, then apply 'incorrect' styling and highlight correct answer in green
          document.querySelector(".selected").classList.add("incorrect");
          document.querySelector(".selected").classList.remove("selected");
        }
        // Then go to next question (this will need to increase the questions[] by 1)
        submitButton.classList.add("d-none");
        nextButton.classList.remove("d-none");
      });

    document
      .getElementById("next-question-btn")
      .addEventListener("click", function () {
        function nextQuestion() {
          let questionArray = choiceData.questions;
          for (let i = 0; i < questionArray.length; i++) {
            quiz.querySelector("h2").textContent =
              choiceData.questions[i].question;
            quiz.querySelector("#answerChoiceA").textContent =
              choiceData.questions[i].options[0];
            quiz.querySelector("#answerChoiceB").textContent =
              choiceData.questions[i].options[1];
            quiz.querySelector("#answerChoiceC").textContent =
              choiceData.questions[i].options[2];
            quiz.querySelector("#answerChoiceD").textContent =
              choiceData.questions[i].options[3];
            let correctAnswer = choiceData.questions[i].answer;
          }

          // Remove correct/incorrect styling
          let answerContainers = document.getElementsByClassName(
            "answer-choice-container"
          );
          for (let i = 0; i < answerContainers.length; i++) {
            answerContainers[i].classList.remove(
              "correct",
              "incorrect",
              "selected"
            );
          }

          // document.querySelector('a.correct', 'a.incorrect').classList.remove('correct', 'incorrect');
        }

        nextQuestion();
        submitButton.classList.remove("d-none");
        nextButton.classList.add("d-none");
      });
  } else if (choice === "CSS") {
  } else if (choice === "JavaScript") {
  } else if (choice === "Accessibility") {
  } else {
    // should never get here
  }
}

const choiceElements = document.querySelectorAll("#category-choices a");
// choiceElements.forEach(el => el.addEventListener('click', categoryClick))
for (let i = 0; i < choiceElements.length; i++) {
  choiceElements[i].addEventListener("click", categoryClick);
}

// document.querySelector('#htmlLink').addEventListener('click', function() {
//     welcome.classList.add('d-none');
//     cssQuiz.classList.remove('d-none')
// });

// document.querySelector('#htmlLink').addEventListener('click', function() {
//     welcome.classList.add('d-none');
//     htmlQuiz.classList.remove('d-none')
// });

// document.querySelector('#htmlLink').addEventListener('click', function() {
//     welcome.classList.add('d-none');
//     htmlQuiz.classList.remove('d-none')
// });

document
  .querySelector("#submit-answer-btn")
  .addEventListener("click", function (count) {
    questionNumber.textContent++;
    count.textContent = questionNumber.toString();
  });
