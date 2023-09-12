jest.mock('node-fetch');
const validation = require('../src/validation');

describe('configuration of validation functions', () => {
  test('function resolves to the text of the link status in "ok" within the array', () => {
    const linkProof = [
      {
        href: 'https://docs.npmjs.com/',
        text: 'Docs NPM',
        file: 'src/sample/folderA/folderA.1/secondfile.md',
      },
    ];
    const expectResponse = [
      {
        href: 'https://docs.npmjs.com/',
        text: 'Docs NPM',
        file: 'src/sample/folderA/folderA.1/secondfile.md',
        status: 200,
        OK: 'ok',
      },
    ];
    validation.statusHttp.mockReturnValue('')
    return expect(validation.statusHttp(linkProof)).resolves.toStrictEqual(expectResponse);
  });

  test('should be rejected with an error when fetch fails', () => {
    const linkProof = [
      {
        href: 'https://docs.npmjs.com/',
        text: 'Docs NPM',
        file: 'src/sample/folderA/folderA.1/secondfile.md',
      },
    ];
    const expectResponse = [
      {
        href: 'https://docs.npmjs.com/',
        text: 'Docs NPM',
        file: 'src/sample/folderA/folderA.1/secondfile.md',
        status: 200,
        OK: 'ok',
      },
    ];
    validation.statusHttp.mockReturnValue('')
    return expect(validation.statusHttp(linkProof)).rejects.toStrictEqual(expectResponse);
  });
});
