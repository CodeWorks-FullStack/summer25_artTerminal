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
  <section>
    <!-- {{ projects }} -->
    <!-- <div v-for="project in projects">{{ project.title }}</div> -->
    <!-- <img v-for="project in projects" :src="project.coverImg" alt=""> -->
    <!-- NOTE alternate way to write a prop, when your prop name matches the name of the data being passed -->
    <!-- NOTE instead of :project="project" i can just write :project -->
    <ProjectCard v-for="project in projects" :key="`project-card-${project.id}`" :project />

  </section>
</template>

<style scoped lang="scss"></style>
