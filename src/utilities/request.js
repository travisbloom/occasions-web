import debug from './debug'

const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response
    }
    const error = new Error(response.statusText)
    error.response = response
    throw error
}

const NO_CONTENT_STATUS = 204

const parseJSON = (response) => {
    if (response.status === NO_CONTENT_STATUS) {
        return null
    }
    return response.json()
}

export default (...args) =>
    fetch(...args)
        .then((response) => {
            try {
                return parseJSON(checkStatus(response))
            } catch (e) {
                throw parseJSON(e.response)
            }
        })
        .then((data) => {
            debug('request succeeded with JSON response', data)
            return data
        })
        .catch((error) => {
            debug('request failed', error.response)
            throw error
        })
