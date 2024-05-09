import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log("The exception thrown is " + typeof exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    let errorMessage = "Internal Server Error";

    if (exception instanceof BadRequestException) {
      const errors = exception.getResponse() as { message: string[] };
      errorMessage = errors.message.join(", ");
      status = HttpStatus.BAD_REQUEST;
    } else if (exception instanceof HttpException) {
      errorMessage = exception.message;
      status = exception.getStatus();
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: errorMessage,
    });
  }
}
