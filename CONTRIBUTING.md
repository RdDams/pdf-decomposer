# Contributing to pdf-decomposer

🎉 Thank you for your interest in contributing to **pdf-decomposer**!  
This open source project aims to extract text and images from PDF files using native tools, with minimal dependencies.

---

## 🧱 Prerequisites

- Node.js >= 18
- Poppler installed (`pdfimages`, `pdftoppm`, etc.)
- Supported OS: Linux, macOS, or Windows (WSL recommended)

Install dependencies:

```bash
npm install
```

## Build project

```bash
npm run build
```

## 🧪 Running Locally

Use a sample PDF from the /test folder:

```bash
npm run test
```

## 📦 Project Structure

src/ — Main TypeScript source code
examples/ — Sample PDF files for testing
test/ — Automated tests (WIP)

## ✨ How to Contribute

### 1. Fork & clone

```bash
git clone git@github.com:RdDams/pdf-decomposer.git
cd pdf-decomposer
git checkout -b your-feature-branch
```

### 2. Code Style

We use ESLint and Prettier.

To lint and format:

```bash
npm run lint
npm run format
```

### 3. Make your changes

- Keep changes minimal and focused

- Add comments for complex logic

- Use clean, debug-friendly logs (in dev mode only)

### 4. Open a Pull Request

Make sure your PR:

- Clearly explains what the change does

- Describes the issue it fixes or the feature it adds

- Includes screenshots or logs if helpful
