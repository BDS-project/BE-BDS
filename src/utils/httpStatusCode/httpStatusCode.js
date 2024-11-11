// module.exports = {
//   StatusCodes: require('./statusCodes'),
//   ReasonPhrases: require('./reasonPhrases'),
// };
// httpStatusCode.js (ES6 export)
export const StatusCodes = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  CREATED: 201,
  // other status codes
};

export const ReasonPhrases = {
  ACCEPTED: 'Accepted',
  BAD_REQUEST: 'Bad Request',
  NOT_FOUND: 'Not Found',
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  CREATED: 'Created',
  // other reason phrases
};
