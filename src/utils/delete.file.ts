import { promisify } from 'util';
import * as fs from 'fs';

const unlinkAsync = promisify(fs.unlink);

export const removeFile = async (filePath: string) => {
  await unlinkAsync(filePath);
};
