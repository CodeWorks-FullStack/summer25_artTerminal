<script setup>
import { Pop } from '@/utils/Pop.js';
import { profilesService } from '@/services/ProfilesService.js'
import { onMounted } from 'vue';
import { logger } from '@/utils/Logger.js';
import { computed } from 'vue';
import { AppState } from '@/AppState.js';
import { useRoute } from 'vue-router';

const profile = computed(() => AppState.profile)

const route = useRoute()

onMounted(getProfileById)

async function getProfileById() {
  try {
    logger.log('🛣️', route, route.params.profileId)
    const profileIdFromRouteParams = route.params.profileId
    // NOTE DO NOT DO THIS TIMEOUT STUFF, just simulating a longer load time for the v-else
    setTimeout(async () => {
      await profilesService.getProfileById(profileIdFromRouteParams)
    }, 5000)
  } catch (error) {
    logger.error(error)
    Pop.error(error, 'Could not get profile')
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
    <section v-else>
      <div>
        <h1>Loading your profile, beep boop <i class="mdi mdi-loading mdi-spin"></i></h1>
        <img src="https://i.redd.it/5w78gh9f9mie1.gif" alt="">
      </div>
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