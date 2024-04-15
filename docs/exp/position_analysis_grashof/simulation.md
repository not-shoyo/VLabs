---
layout: doc
aside: false
---

<script setup>

import { defineClientComponent } from 'vitepress'

console.log("in simulation.md")

const SimulationComponent = defineClientComponent(() => {
  console.log("getting client component")
  return import('../../components/SimulationComponent.vue')
})
console.log("out simulation.md")

// import SimulationComponent from "../../components/SimulationComponent.vue"
</script>

# Position analysis of Grashof four bar mechanism

## Simulation

<SimulationComponent />