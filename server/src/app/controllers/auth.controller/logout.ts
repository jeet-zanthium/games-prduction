import { catchAsyncError } from '@/app/helpers/catch-async-error';

// eslint-disable-next-line
export const logout = catchAsyncError(async (_, res) => {
  res.clearCookie('token');
  res.json({ success: true, message: 'Logout successful' });
});
