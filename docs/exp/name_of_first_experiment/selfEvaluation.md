---
layout: doc
aside: false
---

<script setup>
  import { data } from "../../dataLoaders/name_of_first_experiment/selfEvaluation.data.js"
  import QuizComponent from "../../components/QuizComponent.vue"
</script>

# <name_of_experiment>

## Self Evaluation

<QuizComponent :quizData={data} :buttonStyle="$style.button" />

<style module>
  .button {
      color: #fff;
      background-color: #007bff;
      border-color: #007bff;
      padding: 0.375rem 0.75rem;
      font-size: 1rem;
      line-height: 1.5;
      border-radius: 0.25rem;
    }

  .button:hover {
    background-color: #0069d9;
    border-color: #0062cc;
  }
  </style>
