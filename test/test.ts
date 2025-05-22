import { decompose } from '../src/index';

decompose('examples/lorem-ipsum.pdf', {
  ocr: false,
})
  .then(() => process.exit(0))
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Erreur pendant le test :', err);
    process.exit(1);
  });
