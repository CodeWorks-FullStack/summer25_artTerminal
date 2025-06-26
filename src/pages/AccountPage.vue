<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import { Pop } from '@/utils/Pop.js';
import { logger } from '@/utils/Logger.js';
import { ref } from 'vue';
import { accountService } from '@/services/AccountService.js'
import { watch } from 'vue';

const account = computed(() => AppState.account)

const editableAccount = ref({
  name: '',
  picture: '',
  coverImg: '',
  bio: ''
})
// NOTE  watches the account, and if the account or it's values change, run the following function
// this function creates a copies the AppState.account's keys and values into a new object by using ...
watch(account, () => editableAccount.value = { ...AppState.account })

async function saveAccount() {
  try {
    logger.log('💾', editableAccount.value)
    await accountService.editAccount(editableAccount.value)
  } catch (error) {
    Pop.error(error, "Could not save account")
    logger.error(error)
  }
}

</script>

<template>
  <div class="about text-center">
    <div v-if="account">
      <h1>Welcome {{ account.name }}</h1>
      <img class="rounded" :src="account.picture" alt="" />
      <p>{{ account.email }}</p>

      <section class="container">

        <form @submit.prevent="saveAccount" class="row">
          <div class="col-md-4 mb-3">
            <label for="account-name">Name</label>
            <input v-model="editableAccount.name" type="text" id="account-name" class="form-control">
          </div>
          <div class="col-md-4 mb-3">
            <label for="account-picture">Picture</label>
            <input v-model="editableAccount.picture" type="text" id="account-picture" class="form-control">
          </div>
          <div class="col-md-4 mb-3">
            <label for="account-cover-image">Cover Image</label>
            <input v-model="editableAccount.coverImg" type="text" id="account-cover-image" class="form-control">
          </div>
          <div class="col-md-4 mb-3">
            <label for="account-bio">Bio</label>
            <textarea v-model="editableAccount.bio" name="account-bio" id="account-bio" rows="6"
              class="form-control"></textarea>
          </div>
          <div class="mb-3">
            <button class="btn btn-indigo">Submit</button>
          </div>

        </form>

      </section>

    </div>
    <div v-else>
      <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}
</style>
