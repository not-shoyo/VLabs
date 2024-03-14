<script setup>
import { computed } from "vue";

const props = defineProps(["questionAnswer", "index"]);

const hyphenatedQuestionAnswer = computed(() =>
  props.questionAnswer.question.replaceAll(" ", "-").replaceAll("?", "")
);
</script>

<template>
  <h4 :id="hyphenatedQuestionAnswer" tabindex="-1">
    {{ questionAnswer.question }}
    <a
      class="header-anchor"
      :href="'#' + hyphenatedQuestionAnswer"
      :aria-label="'Permalink to' + questionAnswer.question"
    ></a>
  </h4>
  <ul :ref="`answers${index}`" style="list-style: none">
    <li
      :name="`answer${answerOption}`"
      v-for="answerOption in Object.keys(questionAnswer.answers)"
    >
      <input
        style="margin-right: 1.25rem"
        type="radio"
        :name="'question' + index"
        :value="answerOption"
      />{{ answerOption }}:
      {{ questionAnswer.answers[answerOption] }}
    </li>
  </ul>
</template>
