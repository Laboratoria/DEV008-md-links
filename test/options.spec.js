const options = require('../src/options');

describe('configuration of validation functions', () => {
 test('function resolves to the text of the link status in "ok" within the array', () => {
    const linkProof = [
      {
        href: 'https://platzi.com/',
        text: 'Platzi',
        file: 'src/sample/draft.md',
    },
    ]; 
    const expectResponse = [
      {
        href: 'https://platzi.com/',
        text: 'Platzi',
        file: 'src/sample/draft.md',
        status: 200,
        OK: 'ok'
    },
    ];
    return expect(options.statusHttp(linkProof)).resolves.toStrictEqual(expectResponse);
  });
});