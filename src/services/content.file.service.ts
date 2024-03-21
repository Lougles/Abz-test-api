import { ContentFile } from '../entity/content.file.entity';
import { EntityManager } from 'typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';
import { TINY_SECRET } from '../../config';
import * as fs from 'fs';
import { CustomExceptions } from '../utils/custom-validation.exception';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sharp = require('sharp');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const tinify = require('tinify');
tinify.key = TINY_SECRET;

@Injectable()
export class ContentFileService {
  constructor(private readonly entityManager: EntityManager) {}

  async uploadFile(file: Express.Multer.File): Promise<ContentFile> {
    try {
      const optimizedFile = await this.optimizedImage(file);
      const contentFile = new ContentFile();
      contentFile.type = optimizedFile.mimetype;
      contentFile.path = optimizedFile.path;
      await this.entityManager.save(ContentFile, contentFile);
      return contentFile;
    } catch (e) {
      console.error('Error uploading file:', e);
      throw new CustomExceptions(
        ['Failed to upload file', e.message],
        'photo',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
  private async optimizedImage(file: Express.Multer.File) {
    try {
      const fileBuffer = fs.readFileSync(file.path);
      const resizedBuffer = await sharp(fileBuffer)
        .resize({
          width: 70,
          height: 70,
          fit: sharp.fit.cover,
          position: 'center',
        })
        .jpeg({ quality: 100 })
        .toBuffer();
      const optimizedBuffer = await tinify.fromBuffer(resizedBuffer).toBuffer();

      fs.writeFileSync(file.path, optimizedBuffer);

      file.size = optimizedBuffer.length;
      file.buffer = optimizedBuffer;

      return file;
    } catch (e) {
      console.error('Error optimizing photo:', e);
      throw new CustomExceptions(
        ['Failed to optimizing file', e.message],
        'photo',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
