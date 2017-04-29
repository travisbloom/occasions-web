// @flow

export const CLOSE_ERROR = 'CLOSE_ERROR'
export const closeError = (index: number) => ({
    type: CLOSE_ERROR,
    payload: index,
})
