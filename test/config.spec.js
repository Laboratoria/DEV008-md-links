const config = require("../src/config");

describe("Config", () => {
  it("should return a absolute path", () => {
    const expectedResponse = 'C:\\Users\\kingk\\Laboratoria\\MD-links\\src\\sample';
    const pathExample = 'src/sample';
    const response = config.absolutePathConverter(pathExample)
    expect(response).toBe(expectedResponse);
    
  });
  it("should return array files", () => {
    const expectedResponse = [
        'C:\\Users\\kingk\\Laboratoria\\MD-links\\src\\sample\\folderA\\folderA.1\\folderA.1.1\\firstfile.md',
        'C:\\Users\\kingk\\Laboratoria\\MD-links\\src\\sample\\folderA\\folderA.1\\secondfile.md',
];
    const pathExample = 'src/sample/folderA';
    const response = config.scanDirectories(pathExample)
    expect(response).toStrictEqual(expectedResponse);
    
  });
});
