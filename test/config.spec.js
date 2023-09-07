const config = require('../src/config');

describe('configuration of auxiliary functions', () => {
  test('the path must exist ', () => {
    const response = config.pathExist('src/sample/folderA/folderA.1/secondfile.md');
    expect(response).toBe(true);
  });

  test('should return an array with md files', () => {
    const pathExample = ['src/sample/draft.md'];
    const expectFile = config.fileValidation(pathExample);
    expect(expectFile).toStrictEqual(pathExample);
  })

  test('should return a absolute path', () => {
    const expectedResponse = 'C:\\Users\\kingk\\Laboratoria\\MD-links\\src\\sample';
    const pathExample = 'src/sample';
    const response = config.absolutePathConverter(pathExample);
    expect(response).toBe(expectedResponse);
  });

  test('should return an array with a file', () => {
    const expectedResponse = ['src/sample/folderA/folderA.1/secondfile.md'];
    const response = config.identifyFile('src/sample/folderA/folderA.1/secondfile.md');
    expect(response).toStrictEqual(expectedResponse);
  });

  test('should return array files', () => {
    const expectedResponse = [
      'C:\\Users\\kingk\\Laboratoria\\MD-links\\src\\sample\\folderA\\folderA.1\\folderA.1.1\\firstfile.md',
      'C:\\Users\\kingk\\Laboratoria\\MD-links\\src\\sample\\folderA\\folderA.1\\secondfile.md',
    ];
    const pathExample = 'src/sample/folderA';
    const response = config.scanDirectories(pathExample);
    expect(response).toStrictEqual(expectedResponse);
  });

  test('return an array with the properties of the link', () => {
    const expectedResponse =  [
      {
        href: 'https://platzi.com/',
        text: 'Platzi',
        file: 'src/sample/draft.md'
      },
      {
        href: 'https://www.universia.net/es/home.html',
        text: 'Universia',
        file: 'src/sample/draft.md'
      },
      {
        href: 'http://asinglepage.net/',
        text: 'asinglepage',
        file: 'src/sample/draft.md'
      },
      {
        href: 'http://asinglepage.net/',
        text: 'asinglepage',
        file: 'src/sample/draft.md'
      }
    ]
    return config.extractLinks(['src/sample/draft.md']).then(response => {
      expect(response).toStrictEqual(expectedResponse);
    });
  });
});
