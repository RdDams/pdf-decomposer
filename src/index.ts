import fs from 'fs';
import { isFileValid } from './checkFile';
import { extractFromPDF } from './pdfParser';

// Interface pour les images retournées (buffers)
export type Decompose = void;

/**
 * Extract text / images from pdf
 * @param buffer|string buffer or path of file
 * @returns TODO
 */
export async function decompose(
  bufferOrPath: Buffer | string
): Promise<Decompose> {
  const buffer =
    typeof bufferOrPath === 'string'
      ? getFileBuffer(bufferOrPath)
      : bufferOrPath;
  isFileValid(buffer);
  await extractFromPDF(buffer);
}

function getFileBuffer(path: string): Buffer {
  if (!fs.existsSync(path)) throw new Error(`File ${path} does not exist`);
  if (!fs.lstatSync(path).isFile()) throw new Error(`${path} is not a file`);
  return fs.readFileSync(path);
}
