import debug from './debug'

const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response
    }
    const error = new Error(response.statusText)
    error.response = response
    throw error
}
const parseJSON = response => response.json()

/* eslint-disable no-console */
export default (...args) => (
    fetch(...args)
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
          debug('request succeeded with JSON response', data)
          return data
      })
      .catch((error) => {
          debug('request failed', error)
          return error
      })
)
/* eslint-enable no-console */
