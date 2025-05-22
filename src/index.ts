import os from 'os';
import path from 'path';
import fs from 'fs';
import { execFile } from 'child_process';
import { promisify } from 'util';
import { randomUUID } from 'crypto';

const execFileAsync = promisify(execFile);

export type PageDecompose = {
  page: number;
  text: string;
  images: Array<Buffer>;
};

// Interface pour les images retournées (buffers)
export type Decompose = Array<PageDecompose>;

/**
 * Extract text / images from pdf
 * @param bufferOrPath buffer or path of file
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

  // Work in temp folder
  const packageDir = path.join(os.tmpdir(), 'pdf-decomposer');

  // Clean old parsing
  if (fs.existsSync(packageDir)) fs.rmSync(packageDir, { recursive: true });

  const tmpDir = path.join(packageDir, randomUUID());
  fs.mkdirSync(tmpDir, { recursive: true });

  const tmpFilePath = path.join(tmpDir, 'original.pdf');
  fs.writeFileSync(tmpFilePath, buffer);
  const nbPages = await getPdfPageCount(tmpFilePath);

  // const pages = await pdfToPng(tmpFilePath);
  const promises: Array<Promise<PageDecompose>> = [];
  for (let i = 1; i <= nbPages; i++) {
    promises.push(
      new Promise<PageDecompose>(async (resolve) => {
        const [text, images] = await Promise.all([
          extractPageText(tmpFilePath, i),
          extractPageImages(tmpFilePath, i),
        ]);

        resolve({
          page: i,
          text,
          images,
        });
      })
    );
  }

  const pages = await Promise.all(promises);
  // Sort pages by page number
  return pages.sort((a, b) => a.page - b.page);
}

/**
 * Check if file is valid throw error if not
 * @param path File path
 * @returns Buffer
 * @throws Error if file does not exist or is not a file
 */
function getFileBuffer(path: string): Buffer {
  if (!fs.existsSync(path)) throw new Error(`File ${path} does not exist`);
  if (!fs.lstatSync(path).isFile()) throw new Error(`${path} is not a file`);
  return fs.readFileSync(path);
}

/**
 * Check if file is valid throw error if not
 * @param buffer File buffer
 * @returns void
 * @throws Error if file is not a pdf
 */
function isFileValid(buffer: Buffer): void {
  if (!isMimeValid(buffer)) {
    throw new Error('File is not a pdf');
  }
}

/**
 * Check if file is a pdf
 * @param buffer File buffer
 * @returns boolean true if pdf
 * @throws Error if not a pdf
 */
function isMimeValid(buffer: Buffer): boolean {
  if (!buffer || buffer.length < 4) return false;

  // PDF: always start with "%PDF"
  return buffer.subarray(0, 4).toString() === '%PDF';
}

/**
 * Get pdf pages count
 * @param pdfPath path to pdf file
 * @returns number of pages
 */
async function getPdfPageCount(pdfPath: string): Promise<number> {
  const { stdout } = await execFileAsync('pdfinfo', [pdfPath]);
  const match = stdout.match(/Pages:\s+(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

// /**
//  * Convert each pdf page into png
//  * @param pdfPath path to pdf file
//  * @returns png buffers
//  * @throws Error if pdftoppm fails
//  */
// function pdfToPng(pdfPath: string): Promise<Array<Buffer>> {
//   const tmpDir = path.dirname(pdfPath);
//   return new Promise((resolve, reject) => {
//     const proc = spawn('pdftoppm', [
//       '-png',
//       pdfPath,
//       path.join(tmpDir, 'page'),
//     ]);

//     proc.on('close', (code) => {
//       if (code === 0) {
//         resolve(
//           fs.readdirSync(tmpDir).map((f) => fs.readFileSync(`${tmpDir}/${f}`))
//         );
//       } else {
//         reject(new Error(`pdftoppm exited with code ${code}`));
//       }
//     });

//     proc.stderr.on('data', (err) => {
//       throw new Error(`Fail to parse pdf ${err.toString()}`);
//     });
//   });
// }

/**
 * Get one pdf page text
 * @param pdfPath path to pdf file
 * @param pageIndex number of the page
 * @returns string text
 * @throws Error if pdftotext fails
 */
async function extractPageText(
  pdfPath: string,
  pageIndex: number
): Promise<string> {
  const { stdout } = await execFileAsync('pdftotext', [
    '-f',
    `${pageIndex}`,
    '-l',
    `${pageIndex}`,
    '-layout',
    pdfPath,
    '-', // <--- important : "-" = use stdout
  ]);

  return stdout;
}

/**
 * Get one pdf page images
 * @param pdfPath path to pdf file
 * @param pageIndex number of the page
 * @returns image buffers
 * @throws Error if pdfimages fails
 */
async function extractPageImages(
  pdfPath: string,
  pageIndex: number
): Promise<Array<Buffer>> {
  const tmpDir = path.join(path.dirname(pdfPath), 'img-extract');
  const outputPrefix = path.join(tmpDir, `page-${pageIndex}-img`);
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

  await execFileAsync('pdfimages', [
    '-f',
    `${pageIndex}`,
    '-l',
    `${pageIndex}`,
    '-png',
    pdfPath,
    outputPrefix,
  ]);

  const imageFiles = fs
    .readdirSync(tmpDir)
    .filter((name) => name.startsWith(`page-${pageIndex}-img`))
    .map((name) => path.join(tmpDir, name));

  return imageFiles.map((file) => fs.readFileSync(file));
}
