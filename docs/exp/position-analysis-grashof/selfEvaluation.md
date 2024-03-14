---
layout: doc
aside: false
---

<script setup>
  import { data } from "../../dataLoaders/selfEvaluation.data.js"
  import QuizComponent from "../../components/QuizComponent.vue"
</script>

# Position analysis of Grashof four bar mechanism

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

<!-- #### Grashof's condition is the necessary condition for?

- a Continuous motion
- b Non Continuous motion
- c Intermittent motion
- d None of these

#### Which of the following is the inversion of four bar chain?

- a Beam engine
- b Pendulum pump
- c Oscillating cylinder
- d None of these

#### The links in a four bar mechanism is ?

- a Binary link
- b Ternary link
- c Flexible link
- d None of these

#### Coupled wheel of locomotive is an inversion of

- a Four bar mechanism
- b Double slider crank mechanism
- c Slider crank mechanism
- d Six bar mechanism

#### Watts indicator is an inversion of

- a Four bar mechanism
- b Double slider crank mechanism
- c Slider crank mechanism
- d Six bar mechanism

#### The part of IC engine which acts as coupler is

- a Connecting rod
- b Piston
- c Piston ring
- d Fly wheel

#### Beam engine is

- a Crank and lever mechanism
- b Crank and crank mechanism
- c Double crank mechanism
- d None of these

#### In the beam engine which link connects piston rod coupler and frame?

- a Lever
- b Crank
- c Coupler
- d None of these -->
