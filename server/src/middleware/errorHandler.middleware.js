
const HttpStatusCodes = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  OK: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  IMUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  URITooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  IAmATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HTTPVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode;
  // console.log(err)
  switch (statusCode) {
    case HttpStatusCodes.BadRequest:
      res.status(statusCode).json({ title: "Bad Request", message: err.message, stackTrace: err.stack });
      break;
    case HttpStatusCodes.Unauthorized:
      res.status(statusCode).json({ title: "Unauthorized", message: err.message, stackTrace: err.stack });
      break;
    case HttpStatusCodes.Forbidden:
      res.status(statusCode).json({ title: "Forbidden", message: err.message, stackTrace: err.stack });
      break;
    case HttpStatusCodes.NotFound:
      res.status(statusCode).json({ title: "Not Found", message: err.message, stackTrace: err.stack });
      break;
    case HttpStatusCodes.MethodNotAllowed:
      res.status(statusCode).json({ title: "Method Not Allowed", message: err.message, stackTrace: err.stack });
      break;
    case HttpStatusCodes.Conflict:
      res.status(statusCode).json({ title: "Conflict", message: err.message, stackTrace: err.stack });
      break;
    case HttpStatusCodes.InternalServerError:
      res.status(statusCode).json({ title: "Internal Server Error", message: err.message, stackTrace: err.stack });
      break;
    case HttpStatusCodes.ServiceUnavailable:
      res.status(statusCode).json({ title: "Service Unavailable", message: err.message, stackTrace: err.stack });
      break;
    default:
      res.status(500).json({ title: "Unknown Error", message: err.message, stackTrace: err.stack });
      break;
  }


}

module.exports = errorHandler

