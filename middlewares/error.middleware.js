const errorMiddleware = (err, req, res, next) => {
  try {
    let error = { ...err };
    error.message = err.message;

    console.error(err);

    //Mongoosw bad ObjectId

    if (err.name === "CastError") {
      const message = "resource not found";
      error = new Error(message);
      error.statusCode = 404;
    }
    //Mongoose duplicate key
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      const message = `Duplicate value for field: ${field}`;
      error = new Error(message);
      error.statusCode = 409;
    }
    //Mongoose validation error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((val) => val.message);
      error = new Error(message.join(", "));
      error.statusCode = 400;
    }
    if (err.name === "JsonWebTokenError") {
      error = new Error("Invalid token. Please log in again.");
      error.statusCode = 401;
    }

    if (err.name === "TokenExpiredError") {
      error = new Error("Your token has expired. Please log in again.");
      error.statusCode = 401;
    }

    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message || "Server error" });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
