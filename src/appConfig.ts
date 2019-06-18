const apiUrl = process.env.REACT_APP_API_URL
if (!apiUrl) {
  throw new Error('no api url')
}

const appConfig = {
  apiUrl,
}

export default appConfig
