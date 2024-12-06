import { ZodError } from 'zod';

import { NextFunction, Request } from 'express';

import { CustomError } from '@/utils/custom-error';

import { CustomResponse } from '@/@types/response';

export const errorMiddleware = (
  err: unknown,
  _: Request,
  res: CustomResponse,
  __: NextFunction
) => {
  let statusCode = 500;
  let message = 'Internal server error';

  switch (true) {
    case err instanceof ZodError:
      statusCode = 400;
      message = err.errors[0].message;
      break;

    case err instanceof CustomError:
      statusCode = err.statusCode;
      message = err.message;
      break;

    case err instanceof Error:
      message = err.message;
      break;

    case err && typeof err === 'object' && 'message' in err:
      message = String(err.message);
      break;

    case typeof err === 'string':
      message = err;
      break;

    default:
      break;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};
