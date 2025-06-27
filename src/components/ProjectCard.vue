<script setup>
import { Project } from '@/models/Project.js';


defineProps({
  project: { type: Project, required: true }
})

console.log('🪵🪵🪵')

const secret_api_key = 'super_super_abc_xyz_123_baby_dont_eat_me'

</script>


<template>
  <div class="project-card">

    <!-- <RouterLink :to="`profile/${project.creator.id}`"> -->
    <RouterLink :to="{ name: 'Profile Page', params: { profileId: project.creator.id } }">
      <img class="profile-img" :src="project.creator.picture" :alt="`picture of ${project.creator.name}`">
    </RouterLink>
    <img height="400" :src="project.coverImg" />
    <label class="project-title">{{ project.title }}</label>
  </div>
</template>


<style lang="scss" scoped>
.project-card {
  margin-bottom: 1rem;
  border-radius: 8px;
  overflow: hidden;
  transition: all .2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;

  img {
    height: auto;
  }

  &:hover {
    filter: brightness(1.3);
    transform: scale(1.1);
  }
}

.profile-img {
  position: absolute;
  top: 5px;
  right: 5px;
  height: 50px;
  width: 50px;
  object-fit: cover;
  border-radius: 50%;
}

// NOTE this CSS is currently pending trademark do not steal
.project-title {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.616) 20%, transparent);
  width: 100%;
  height: 40%;
  color: var(--bs-white);
  padding: 1em;
  font-weight: 600;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: end;
}

img {
  width: 100%;
}
</style>