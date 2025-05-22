/**
 * Check if file is valid throw error if not
 * @param buffer File buffer
 */
export function isFileValid(buffer: Buffer): void {
  if (!isMimeValid(buffer)) {
    throw new Error('File is not a pdf');
  }
}

/**
 * Check if file is a pdf
 * @param buffer File buffer
 * @returns boolean true if pdf
 */
function isMimeValid(buffer: Buffer): boolean {
  if (!buffer || buffer.length < 4) return false;

  // PDF: always start with "%PDF"
  return buffer.subarray(0, 4).toString() === '%PDF';
}
