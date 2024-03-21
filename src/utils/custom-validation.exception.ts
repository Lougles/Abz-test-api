import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomValidationException extends HttpException {
  constructor(response) {
    super(response, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}

export class CustomPhotoException extends HttpException {
  constructor(errorText: string) {
    const response = {
      success: false,
      message: 'Validation failed',
      fails: {
        photo: [errorText],
      },
    };
    super(response, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}

export class CustomTokenException extends HttpException {
  constructor(message: string) {
    const response = {
      success: false,
      message,
    };
    super(response, HttpStatus.UNAUTHORIZED);
  }
}

export class CustomExceptions extends HttpException {
  constructor(errorText: string | string[], errorKey: string, status: number) {
    const response = {
      success: false,
      message: 'Validation failed',
      fails: {
        [errorKey]: Array.isArray(errorText) ? errorText : [errorText],
      },
    };
    super(response, status);
  }
}
