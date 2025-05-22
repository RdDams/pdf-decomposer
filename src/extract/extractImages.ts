import { spawn } from 'child_process';
import fs from 'fs';

function extractImages(pdfPath: string, outputPrefix = 'img') {
  return new Promise((resolve, reject) => {
    const pdfimages = spawn('pdfimages', ['-all', pdfPath, outputPrefix]);

    pdfimages.on('close', (code) => {
      if (code === 0) {
        const files = fs
          .readdirSync('.')
          .filter((f) => f.startsWith(outputPrefix));
        resolve(files);
      } else {
        reject(new Error(`pdfimages exited with code ${code}`));
      }
    });

    pdfimages.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
  });
}

// Exemple d’utilisation
extractImages('sample.pdf').then(console.log);
