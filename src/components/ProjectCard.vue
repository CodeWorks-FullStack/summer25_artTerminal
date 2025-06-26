<script setup>
import { Project } from '@/models/Project.js';


defineProps({
  project: { type: Project, required: true }
})

</script>


<template>
  <div>
    THIS IS ONE PROJECT
    <img :src="project.coverImg" />
  </div>
</template>


<style lang="scss" scoped></style>