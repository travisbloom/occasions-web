/* eslint-disable no-console */
export default (...args) => {
  if (process.env.NODE_ENV !== 'production') {
    console.info(...args);
  }
};
