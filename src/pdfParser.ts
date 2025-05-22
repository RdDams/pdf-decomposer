import os from 'os';
import path from 'path';
import fs from 'fs';
import { randomUUID } from 'crypto';
import { pdfToPng } from './pdfToPng';
import { extractTextFromPdf } from './extract/extractText';

/**
 * Extract all from pdf
 * @param buffer file buffer
 */
export async function extractFromPDF(buffer: Buffer): Promise<void> {
  // Work in temp folder
  const tmpDir = path.join(os.tmpdir(), 'pdf-decomposer');

  // Clean old parsing
  if (fs.existsSync(tmpDir)) {
    fs.rmSync(tmpDir, { recursive: true });
  }
  fs.mkdirSync(tmpDir);

  const tmpFilePath = path.join(tmpDir, `${randomUUID()}.pdf`);
  fs.writeFileSync(tmpFilePath, buffer);
  const pages = await pdfToPng(tmpFilePath);
  console.log(await extractTextFromPdf(tmpFilePath));
  console.log(`Successfully convert ${pages.length} pdf pages`);
}
