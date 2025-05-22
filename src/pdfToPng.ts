import { spawn } from 'child_process';
import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';

/**
 * Convert each pdf page into pdf
 * @param pdfPath path to pdf file
 * @returns png buffers
 */
export function pdfToPng(pdfPath: string): Promise<Array<Buffer>> {
  const tmpDir = path.join(path.dirname(pdfPath), randomUUID());
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir);
  }

  return new Promise((resolve, reject) => {
    const proc = spawn('pdftoppm', [
      '-png',
      pdfPath,
      path.join(tmpDir, 'page'),
    ]);

    proc.on('close', (code) => {
      if (code === 0) {
        resolve(
          fs.readdirSync(tmpDir).map((f) => fs.readFileSync(`${tmpDir}/${f}`))
        );
      } else {
        reject(new Error(`pdftoppm exited with code ${code}`));
      }
    });

    proc.stderr.on('data', (err) => {
      throw new Error(`Fail to parse pdf ${err.toString()}`);
    });
  });
}
