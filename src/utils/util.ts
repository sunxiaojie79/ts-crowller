interface Result {
  success: boolean,
  errmsg?: string,
  data: any
}

export const getResponseData = (data: any, errmsg?: string): Result => {
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