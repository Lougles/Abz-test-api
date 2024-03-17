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
