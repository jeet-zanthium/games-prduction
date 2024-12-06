import { NextFunction, Request, Response } from 'express';

import { CustomResponse } from '@/@types/response';

type AsyncHandler = (
  req: Request,
  res: CustomResponse,
  next: NextFunction
) => Promise<unknown>;

export const catchAsyncError =
  (asyncHandler: AsyncHandler) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await asyncHandler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
