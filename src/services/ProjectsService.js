import { AppState } from '@/AppState.js'
import { Project } from '@/models/Project.js'
import { api } from '@/services/AxiosService.js'
import { logger } from '@/utils/Logger.js'

class ProjectsService {
  async getProjects() {
    const response = await api.get('api/projects') // GET IT
    logger.log('🎨📡', response.data) // LOG IT
    const projects = response.data.map(projo => new Project(projo)) // CLASS IT
    AppState.projects = projects // SAVE IT
  }
}

export const projectsService = new ProjectsService()