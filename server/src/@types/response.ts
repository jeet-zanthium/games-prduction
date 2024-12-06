import { Response } from 'express';

export type CustomResponse = Response<
  { message: string } & ({ success: true; data?: unknown } | { success: false })
>;
