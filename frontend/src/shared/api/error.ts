const isAxiosErr = (error: any): error is { response?: any; message: string } => {
  return error?.isAxiosError === true;
};

export const getErrorMessage = (error: unknown): string => {
  if (isAxiosErr(error)) {
    return (
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Request failed"
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong";
};
