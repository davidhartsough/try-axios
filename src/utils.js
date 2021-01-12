const urlPattern = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/;

export function isValidURL(url) {
  if (urlPattern.test(url)) return true;
  if (
    process.env.NODE_ENV === "development" &&
    url.startsWith("http://localhost:")
  ) {
    return true;
  }
  return false;
}

export function isNumeric(str) {
  return (
    !isNaN(str) &&
    !isNaN(parseFloat(str)) &&
    +str === +str &&
    (str.match(/^-?\d+$/) || str.match(/^-?\d+\.\d+$/))
  );
}

export function getErrorMessage(error) {
  const errorResponse = { message: error.message };
  if (error.response) {
    errorResponse.status = error.response.status;
    errorResponse.statusText = error.response.statusText;
    errorResponse.data = error.response.data;
  }
  console.log("Here's your error:");
  console.log(errorResponse);
  return errorResponse;
}
