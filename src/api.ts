import appConfig from './appConfig'

const apiRequest = <T>(path: string): Promise<T> =>
  fetch(appConfig.apiUrl + path)
    .then(response => {
      if (response.ok) {
        return response.json()
      }

      throw new Error(String(response.status))
    })
    .catch(error => {
      console.error('api', path, error)
      throw error
    })

export default apiRequest
