import { AppState } from '@/AppState.js'
import { Project } from '@/models/Project.js'
import { api } from '@/services/AxiosService.js'
import { logger } from '@/utils/Logger.js'

class ProjectsService {
  async getProjects() {
    AppState.projects = [] // change to starting value in appstate, to clear "👻 Data"
    const response = await api.get('api/projects') // GET IT
    logger.log('🎨📡', response.data) // LOG IT
    const projects = response.data.map(projo => new Project(projo)) // CLASS IT
    AppState.projects = projects // SAVE IT
  }

  async getProjectsByProfileId(profileId) {
    // const response = await api.get(`api/profiles/${profileId}/projects`) this works sometimes (just not right now)
    AppState.projects = [] // change to starting value in appstate, to clear "👻 Data"
    const response = await api.get(`api/projects?creatorId=${profileId}`)
    logger.log('👲🎨📡', response.data)
    const profileProjects = response.data.map(proprojo => new Project(proprojo))
    AppState.projects = profileProjects
  }
}

export const projectsService = new ProjectsService()