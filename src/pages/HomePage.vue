<script setup>
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { projectsService } from '@/services/ProjectsService.js'
import { onMounted, computed } from 'vue';
import { AppState } from '@/AppState.js'
import ProjectCard from '@/components/ProjectCard.vue'

const projects = computed(() => AppState.projects)

onMounted(getProjects)

async function getProjects() {
  try {
    logger.log('getting projects🎨')
    await projectsService.getProjects()
  }
  catch (error) {
    logger.error(error)
    Pop.error(error);
  }
}

</script>

<template>
  <div class="mx-2 mx-md-5">
    <section v-if="projects.length" class="project-cards p-3">
      <!-- {{ projects }} -->
      <!-- <div v-for="project in projects">{{ project.title }}</div> -->
      <!-- <img v-for="project in projects" :src="project.coverImg" alt=""> -->
      <!-- NOTE alternate way to write a prop, when your prop name matches the name of the data being passed -->
      <!-- NOTE instead of :project="project" i can just write :project -->
      <ProjectCard v-for="project in projects" :key="`project-card-${project.id}`" :project />

    </section>
    <section v-else>
      <h1>
        LOADING...
      </h1>
      <div class="project-cards p-3 placeholder-glow">
        <div v-for="n in 8" class="loading-project-card placeholder" :key="n"
          :style="`--mimic-height: ${(Math.random() * 300) + 200}px`"></div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.loading-project-card {
  display: inline-block;
  width: 100%;
  opacity: .5;
  // background-color: rgba(var(--bs-secondary-rgb), .25);
  height: var(--mimic-height);
  border-radius: 8px;
  margin-bottom: 10px;
}
</style>
