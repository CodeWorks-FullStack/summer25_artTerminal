import { logger } from '@/utils/Logger.js'
import { api } from './AxiosService.js'
import { Profile } from '@/models/Profile.js'
import { AppState } from '@/AppState.js'

class ProfilesService {
  async getProfileById(profileId) {
    AppState.profile = null
    const response = await api.get(`api/profiles/${profileId}`)
    logger.log('👲📡', response.data)
    const profile = new Profile(response.data)
    AppState.profile = profile
  }
}

export const profilesService = new ProfilesService()