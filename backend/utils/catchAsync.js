/**
 * Wrapper for async functions to eliminate try-catch blocks
 * and pass errors to the global error handler automatically.
 */
module.exports = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
