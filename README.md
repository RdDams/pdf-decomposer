# pdf-decomposer

📚 Extract text and images (as buffers) from PDF files using native parsing and OCR with Tesseract.

## Features

- 📄 Extract raw text from PDFs (including OCR for scanned documents)
- 🖼️ Convert PDF pages to image buffers
- 🧠 Use Tesseract OCR for image-to-text extraction
- ⚡ Buffer-based API — easy to integrate in Node.js pipelines
- 🛠️ Built with TypeScript for better type safety

## Prerequisites

## 🛠 Installing Poppler

This package (`pdf-decomposer`) relies on **Poppler** command-line tools (`pdftotext`, `pdfimages`, `pdftoppm`) to extract content from PDF files. These tools must be installed on your system and accessible from the terminal.

---

### ✅ Ubuntu / Debian

```bash
sudo apt update
sudo apt install poppler-utils
```

### ✅ MacOS

```bash
brew install poppler
```

## 🛠 Installing Tesseract (only if using OCR)

This package (`pdf-decomposer`) relies on **Tesseract OCR** to extract content from PNG files. These tools must be installed on your system and accessible from the terminal if you want to use OCR on PDF.

---

### ✅ Ubuntu / Debian

```bash
sudo apt update
sudo apt install tesseract-ocr
```

### ✅ MacOS

```bash
brew install tesseract
```

## Installation

```bash
npm install pdf-decomposer
```

## Usage

```ts
import { decompose } from 'pdf-decomposer';

// Optional options
const options = {
  ocr: true, // use ocr to extract text
};

const result = await decompose(bufferOrPath, options);
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](./CONTRIBUTING.md) before submitting a pull request.

We are committed to fostering a welcoming and respectful environment for everyone. By participating in this project, you agree to abide by our [Code of Conduct](./CODE_OF_CONDUCT.md).
