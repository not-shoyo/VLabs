<script setup>
import { defineProps, ref } from "vue";
import QuestionAnswerComponent from "./QuestionAnswerComponent.vue";

const props = defineProps(["quizData", "buttonStyle"]);
const quizContainer = ref(null);
const resultsSection = ref(null);

const showQuizResults = () => {
  const myQuestions = props.quizData.data[0].questions;

  // gather answer containers from our quiz
  const answerContainers = quizContainer.value.querySelectorAll("ul");

  // keep track of user's answers
  let numCorrect = 0;
  let totalNum = 0;

  myQuestions.forEach((currentQuestion, questionNumber) => {
    // find selected answer
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (
      answerContainers[questionNumber].querySelector(selector) || {}
    ).value;

    // Add to total
    totalNum++;

    // check answer
    if (userAnswer === currentQuestion.correctAnswer) {
      numCorrect++;
    } else {
      const selectedWrongAnswer = answerContainers[
        questionNumber
      ].querySelector(`li[name=answer${userAnswer}]`);

      if (selectedWrongAnswer) {
        selectedWrongAnswer.style.color = "red";
      }
    }
  });

  // show number of correct answers out of total
  // alert(`${numCorrect} out of ${totalNum}`);
  resultsSection.value.innerText = `${numCorrect} out of ${totalNum}`;
};
</script>

<template>
  <div ref="quizContainer">
    <QuestionAnswerComponent
      v-for="(questionAnswer, index) in props.quizData.data[0].questions"
      :key="index"
      :questionAnswer="questionAnswer"
      :index="index"
    />

    <button :class="buttonStyle" @click="showQuizResults">Submit Quiz</button>
    <div ref="resultsSection" id="results"></div>
  </div>
</template>
