import { HTTP_STATUS } from "data";

// Custom Error API
export class CustomError extends Error {
  constructor(message: string) {
    super(message);
  }
}

// Bad request error
export class BadRequestError extends CustomError {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = HTTP_STATUS.BAD;
  }
}

// Not found error
export class NotFoundError extends CustomError {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = HTTP_STATUS.NOT_FOUND;
  }
}

// Unauthenticated error
export class UnauthenticatedError extends CustomError {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = HTTP_STATUS.UNAUTHORIZED;
  }
}
