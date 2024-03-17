import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CustomPhotoException } from './custom-validation.exception';

@Injectable()
export class PhotoValidationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const file = request.file;

    if (!file) {
      throw new CustomPhotoException('The photo is required');
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new CustomPhotoException(
        'The photo may not be greater than 5 Mbytes.',
      );
    }

    if (!file.mimetype.match(/\/(jpg|jpeg)$/)) {
      throw new CustomPhotoException(
        'Image is invalid. Only JPG and JPEG formats are allowed.',
      );
    }

    return next.handle();
  }
}
