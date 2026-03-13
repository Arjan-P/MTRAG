export class UnauthorizedError extends Error {
  statusCode = 401;
  constructor(message = "Unauthorized") {
    super(message);
  }
}

export class ConflictError extends Error {
  statusCode = 409;
  constructor(message = "Conflict") {
    super(message);
  }
}
