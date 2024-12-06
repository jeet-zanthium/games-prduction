import { CONSTANTS } from '@/config/constants';

export const generateCode = (id: number, length: number = 6) => {
  return CONSTANTS.PREFIX + id.toString().padStart(length, '0');
};
