import { Request, Response, NextFunction } from 'express';

class HttpException extends Error {
  constructor(public status: number, public message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

function errorMiddleware(
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  response.status(status).send({
    status,
    message,
  });
}

export default errorMiddleware;
