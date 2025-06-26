import { reactive } from 'vue'
import { Project } from './models/Project.js'
import { Profile } from './models/Profile.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,

  /** @type {Project[]} */
  projects: [],

  /** @type {Profile} */
  profile: null,

  // profileProjects: []
})

