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
    return validation.statusHttp(linkProof)
    .then((promiseSuccess) => {
    expect(promiseSuccess).toStrictEqual(expectResponse)
    })
  });

  test('should be rejected with an error when fetch fails', () => {
    const linkProof = [
      {
        href: 'http://otherpagerandom.net/',
        text: 'Other Page Random',
        file: 'src/sample/folderA/folderA.1/folderA.1.1/firstfile.md',
      },
    ];
    const expectResponse = [
      {
        href: 'http://otherpagerandom.net/',
        text: 'Other Page Random',
        file: 'src/sample/folderA/folderA.1/folderA.1.1/firstfile.md',
        status: null,
        OK: 'fail',
      },
    ];
    const response = validation.statusHttp(linkProof);
    return expect(response).resolves.toStrictEqual(expectResponse);
  });

  test('should return the number of total, unique and/or broken links', () => {
    const linkProof = [
      {
        href: 'https://hackernoon.com/',
        text: 'Hackernoon',
        file: 'C:\\Users\\kingk\\Laboratoria\\MD-links\\src\\sample\\folderA\\folderA.1\\folderA.1.1\\firstfile.md',
        status: 200,
        OK: 'ok',
      },
      {
        href: 'https://hackernoon.com/',
        text: 'Hackernoon',
        file: 'C:\\Users\\kingk\\Laboratoria\\MD-links\\src\\sample\\folderA\\folderA.1\\folderA.1.1\\firstfile.md',
        status: 200,
        OK: 'ok',
      },
      {
        href: 'https://docs.npmjs.com/',
        text: 'Docs NPM',
        file: 'C:\\Users\\kingk\\Laboratoria\\MD-links\\src\\sample\\folderA\\folderA.1\\secondfile.md',
        status: 200,
        OK: 'ok',
      },
      {
        href: 'https://open.spotify.com/exit',
        text: 'Spotify',
        file: 'C:\\Users\\kingk\\Laboratoria\\MD-links\\src\\sample\\folderA\\folderA.1\\secondfile.md',
        status: 404,
        OK: 'fail',
      },
    ];
    const expectResponse = { Total: 4, Unique: 3, Broken: 1 };
    const response = validation.statusHref(linkProof)
    expect(response).toStrictEqual(expectResponse)
  });

});
