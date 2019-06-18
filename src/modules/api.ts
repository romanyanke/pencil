import appConfig from '../appConfig'

const apiRequest = <T>(path: string): Promise<T> => {
  return fetch(appConfig.apiUrl + path)
    .then(response => response.json())
    .catch(error => {
      console.error('api', path, error)
      throw error
    })
}

export default apiRequest
