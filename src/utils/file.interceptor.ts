import { diskStorage } from 'multer';
import * as path from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomPhotoException } from './custom-validation.exception';

export function ImageFileInterceptor(fieldName: string) {
  return FileInterceptor(fieldName, {
    storage: diskStorage({
      destination: './uploads/img',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const fileExtension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg)$/)) {
        return cb(
          new CustomPhotoException('The photo can be only jpg or jpeg format!'),
          false,
        );
      }
      cb(null, true);
    },
    limits: { fileSize: 5 * 1024 * 1024 },
  });
}
