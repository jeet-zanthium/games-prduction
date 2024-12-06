import { NextFunction, Request } from 'express';

import { CustomResponse } from '@/@types/response';

export const notFoundMiddleware = (
  req: Request,
  res: CustomResponse,
  __: NextFunction
) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
};
