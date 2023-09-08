const { validateFile, isAbsolute, isFile, getLinks, converAbsolute, } = require("../function");
const mdLinks = require("../index");
const {getFilesWithRecursively} = require("../api")
jest.mock("markdown-link-extractor", () =>
  jest.fn().mockImplementation(() => ({
    links: [
      {
        href: "https://es.wikipedia.org/wiki/Markdown",
        text: "Markdown1",
        route: "",
        direction: "calle",
      },
      {
        href: "https://es.wikipedia.org/wiki/Markdown",
        text: "Markdown2",
        route: "",
        direction: "calle",
      },
    ],
  }))
);
jest.mock("../function");
jest.mock("../api");

describe("Pruebas para la funcion de mdLinks", () => {
  test("Deberia mostrar mensaje de que no existe la ruta", () => {
    return mdLinks("")
      .then((results) => {})
      .catch((error) => {
        expect(error.message).toBe("No existe la ruta");
      });
  });

  test("Deberia mostrar mensaje de que no es un archivo md", () => {
    validateFile.mockReturnValue(true);
    isAbsolute.mockReturnValue(true);
    isFile.mockReturnValue(true);
    return mdLinks("./pruebas/texto.txt")
      .then((results) => {})
      .catch((error) => {
        expect(error.message).toBe("No es un archivo md");
      });
  });

  test("Deberia haber ejecutado getLinks con un archivo", () => {
    validateFile.mockReturnValue(true);
    isAbsolute.mockReturnValue(true);
    isFile.mockReturnValue(true);
    getLinks.mockImplementation((ruta, options, resolve) => (resolve([])));
    return mdLinks("./pruebas/README2.md").then((results) => {
      expect(results).toEqual([]);
      expect(getLinks).toHaveBeenCalled();
    });
  });

  test("Deberia haber ejecutado getLinks con un folder", () => {
    validateFile.mockReturnValue(true);
    isAbsolute.mockReturnValue(false);
    converAbsolute .mockReturnValue(true);
    isFile.mockReturnValue(false);
    getFilesWithRecursively.mockReturnValue(true);
    getLinks.mockImplementation((ruta, options, resolve) => (resolve([])));
    return mdLinks(["./pruebas"]).then((results) => {
      expect(results).toEqual([]);
      expect(getLinks).toHaveBeenCalled();
    });
  });
});
