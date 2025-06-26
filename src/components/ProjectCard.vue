<script setup>
import { Project } from '@/models/Project.js';


defineProps({
  project: { type: Project, required: true }
})

</script>


<template>
  <div class="project-card">
    <img :src="project.coverImg" />
  </div>
</template>


<style lang="scss" scoped>
.project-card {
  margin-bottom: 1rem;
  border-radius: 8px;
  overflow: hidden;
  transition: all .2s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:hover {
    filter: brightness(1.3);
    transform: scale(1.1);
  }
}

img {
  width: 100%;
}
</style>