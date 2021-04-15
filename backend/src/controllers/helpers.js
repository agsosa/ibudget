// Helper function to send an error response
exports.sendFailedResponse = (res, message, code) => {
  // TODO: Implement detailed error codes/messages
  if (typeof message === "object") message = message.message;

  return res.status(code).send({
    error: true,
    message,
  });
};

// Helper function to send a success response
exports.sendSuccessResponse = (res, message, data) => {
  if (typeof message === "object") message = message.message;

  return res.status(200).send({
    error: false,
    message,
    data,
  });
};

// Middleware to only allow authenticated users
exports.checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();

  exports.sendFailedResponse(res, "NOT_AUTHENTICATED", 401);
};
