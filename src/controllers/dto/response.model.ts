export interface ResponseModel<T> {
  success: boolean;
  message?: string;
  user_id?: number;
  fails?: { [key: string]: string[] };
}

export function successResponse<T>(
  user_id: number,
  message: string,
): ResponseModel<T> {
  return {
    success: true,
    user_id: user_id,
    message: message,
  };
}

export function errorResponse<T>(
  message: string,
  fails?: { [key: string]: string[] },
): ResponseModel<T> {
  return {
    success: false,
    message: message,
    fails: fails,
  };
}
