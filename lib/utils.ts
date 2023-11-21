export const isStringValid = (value: unknown, maxLength: number) => {
  if (!value || typeof value !== 'string' || value.length > maxLength) {
    return false;
  }
  return true;
};

export const getErrorMessage = (error: unknown): string => {
  let msg: string;
  if (error instanceof Error) {
    msg = String(error.message);
  } else if (error && typeof error === 'object' && 'message' in error) {
    msg = String(error.message);
  } else if (typeof error === 'string') {
    msg = error;
  } else {
    msg = 'Unknown Error';
  }
  return msg;
};
