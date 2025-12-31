class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  // Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue).join(", ")} entered`;
    err = new ErrorHandler(message, 400);
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    err = new ErrorHandler("JSON Web Token is invalid, try again", 401);
  }

  if (err.name === "TokenExpiredError") {
    err = new ErrorHandler("JSON Web Token is expired, try again", 401);
  }

  // Cast Error
  if (err.name === "CastError") {
    err = new ErrorHandler(`Resource not found. Invalid: ${err.path}`, 400);
  }

  // ✅ SAFE validation error handling
  let message = err.message;
  if (err.name === "ValidationError" && err.errors) {
    message = Object.values(err.errors)
      .map((error) => error.message)
      .join(" ");
  }

  return res.status(err.statusCode).json({
    success: false,
    message
  });
};

export default ErrorHandler;
