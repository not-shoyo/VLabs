---
layout: doc
aside: false
---

<script setup>
  import { data } from "../../dataLoaders/quiz.data.js"
  import QuizComponent from "../../components/QuizComponent.vue"
</script>

# Position analysis of Grashof four bar mechanism

## Quiz

<QuizComponent :quizData={data} :buttonStyle="$style.button" />

<style module>
  .button {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .25rem;
  }

  .button:hover {
    background-color: #0069d9;
    border-color: #0062cc;
  }
</style>

<!-- #### Which of the following is possible for Input and Output links in case of Grashof linkage?

- a: Crank-Crank
- b: Crank-Rocker
- c: Rocker-Rocker
- d: All

#### In Drag Link Mechanism

- a: Shortest link is fixed
- b: Longest link is fixed
- c: One other than shortest or longest link is fixed
- d: Any link can be fixed

#### If longest link is fixed and shortest link is coupler which type of four bar mechanism would be formed?

- a: Double Rocker
- b: Crank Rocker
- c: Double Crank
- d: Can't be determined

#### According to Grashof Condition

- a: s+l ≥ p+q
- b: s-l ≥ p-q
- c: s+l ≤ p+q
- d: s-l ≤ p-q

#### If Grashof condition is met, which link definitely can complete a rotation

- a: Shortest Link
- b: Longest Link
- c: Shorter of the remaining links
- d: Longer of the remaining two links

<button :class="$style.button">Submit Quiz</button> -->
