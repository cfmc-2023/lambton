// Success Response
exports.successResponse = (data, message) => {
  const response = {};
  if (Object.keys(data).length > 0) {
    response.data = data;
    response.status = 200;
    response.message = message;
  } else {
    response.data = data;
    response.status = 400;
    response.message = message;
  }
  return response;
};

// Error response
exports.errorResponse = (message) => {
  const response = {};
  response.status = 400;
  response.message = message;
  return response;
};
