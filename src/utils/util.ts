interface Result<T> {
  success: boolean,
  errmsg?: string,
  data: T
}

export const getResponseData = <T>(data: T, errmsg?: string): Result<T> => {
  if (errmsg) {
    return {
      success: false,
      errmsg,
      data
    };
  }
  return {
    success: true,
    data
  };
};