import { spawn } from 'child_process';

export async function extractTextFromPdf(pdfPath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const pdftotext = spawn('pdftotext', ['-layout', pdfPath, '-']);

    let output = '';
    pdftotext.stdout.on('data', (data) => {
      output += data.toString();
    });

    pdftotext.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    pdftotext.on('close', (code) => {
      if (code === 0) resolve(output);
      else reject(new Error(`pdftotext exited with code ${code}`));
    });
  });
}
