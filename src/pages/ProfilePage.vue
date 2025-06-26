<script setup>
import { Pop } from '@/utils/Pop.js';
import { profilesService } from '@/services/ProfilesService.js'
import { onMounted } from 'vue';
import { logger } from '@/utils/Logger.js';
import { computed } from 'vue';
import { AppState } from '@/AppState.js';
import { useRoute } from 'vue-router';
import { projectsService } from '@/services/ProjectsService.js';
import ProjectCard from '@/components/ProjectCard.vue';

const profile = computed(() => AppState.profile)
const profileProjects = computed(() => AppState.projects)

const route = useRoute()

onMounted(() => {
  getProfileById()
  getProfileProjectsByProfileId()
})

async function getProfileById() {
  try {
    // NOTE route, comes from the useRoute above, this give us access to the current 'route' location where we are in our application like the browsers url and it's 'params'
    logger.log('🛣️', route, route.params.profileId)
    const profileIdFromRouteParams = route.params.profileId
    await profilesService.getProfileById(profileIdFromRouteParams)
  } catch (error) {
    logger.error(error)
    Pop.error(error, 'Could not get profile', `<img src="https://http.cat/images/${error.response.status}.jpg">`)
  }
}

async function getProfileProjectsByProfileId() {
  try {
    const profileIdFromRouteParams = route.params.profileId
    await projectsService.getProjectsByProfileId(profileIdFromRouteParams)
  } catch (error) {
    logger.error(error)
    Pop.error(error, 'Could not get profile posts')
  }
}

</script>


<template>
  <div class="container">
    <section v-if="profile" class="row justify-content-center profile">
      <img :src="profile.coverImg" alt="">
      <div class="col-8">
        <img :src="profile.picture" alt="">
        <h2 class="text-center">{{ profile.name }}</h2>
        <hr />
        <p>{{ profile.bio }}</p>
      </div>
    </section>
    <!-- SECTION loader until the profile arrives -->
    <section v-else>
      <div class="text-center">
        <h1>Loading your profile, beep boop <i class="mdi mdi-loading mdi-spin"></i></h1>
        <!-- <img src="https://i.redd.it/5w78gh9f9mie1.gif" alt=""> -->
        <img
          src="https://images.steamusercontent.com/ugc/947332576908722296/17668ACFDB9A5BDD28AF88B0ECC6D3D8E68271B2/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
          alt="">
      </div>
    </section>
    <section class="mx-2 mx-md-5 project-cards">
      <ProjectCard v-for="project in profileProjects" :project :key="`profile-project-${project.id}`" />
      <!-- NOTE Mick from Bizzaro world wrote this -->
      <!-- <ProjectCard v-for="proProProp in profileProjects" :project="proProProp" :key="`profile-project-${proProProp.id}`" /> -->
    </section>
  </div>
</template>


<style lang="scss" scoped>
.profile {
  text-align: center;

  img {
    max-height: 300px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: -75px;

  }

  div img {
    height: 150px;
    width: 150px;
    margin-bottom: .5em;
  }

  p {
    text-align: left;
    background-color: rgba(var(--bs-dark-rgb), 5);
    border-radius: 8px;
    padding: 2em;
    border: 1px solid var(--bs-border);
  }
}
</style>