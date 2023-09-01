const config = require("../src/config");

describe("configuration of auxiliary functions", () => {

  test("the path must exist ", () => {
    const response = config.pathExist('src/sample/folderA/folderA.1/secondfile.md')
    expect(response).toBe(true);
    
  });

  test("should return a absolute path", () => {
    const expectedResponse = 'C:\\Users\\kingk\\Laboratoria\\MD-links\\src\\sample';
    const pathExample = 'src/sample';
    const response = config.absolutePathConverter(pathExample)
    expect(response).toBe(expectedResponse);
    
  });

  test("should return an array with a file", () => {
    const expectedResponse = ['src/sample/folderA/folderA.1/secondfile.md'];
    const response = config.identifyFile('src/sample/folderA/folderA.1/secondfile.md');
    expect(response).toStrictEqual(expectedResponse);
    
  });

  test("should return array files", () => {
    const expectedResponse = [
      'C:\\Users\\kingk\\Laboratoria\\MD-links\\src\\sample\\folderA\\folderA.1\\folderA.1.1\\firstfile.md',
      'C:\\Users\\kingk\\Laboratoria\\MD-links\\src\\sample\\folderA\\folderA.1\\secondfile.md',
    ];
    const pathExample = 'src/sample/folderA';
    const response = config.scanDirectories(pathExample)
    expect(response).toStrictEqual(expectedResponse);
    
  }); 
});
