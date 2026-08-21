export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  console.error(`[Express Error Handler - ${statusCode}] ${err.message}`);
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Something went wrong on the server'
  });
};
