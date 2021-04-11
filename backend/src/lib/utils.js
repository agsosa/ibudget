exports.sendFailedResponse = (res, code, message) => {
  return res.status(code).send({
    error: true,
    message,
  });
};

exports.sendSuccessResponse = (res, message, data) => {
  return res.status(200).send({
    error: false,
    message,
    data,
  });
};
