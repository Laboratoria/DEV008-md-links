const {
  validateFile,
  isAbsolute,
  converAbsolute,
  isFile,
  getPromisesFiles,
  resultLinks,
  validateStats,
  getPromisesHrefArray,
  check,
} = require("../function");

const fs = require("fs");
const path = require("node:path");

jest.mock("fs");
jest.mock("node:path");

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([{ status: "fulfilled", value: { status: 200 } }]),
  })
);

describe("pruebas del archivo function", () => {
  test("probar si existe la ruta", () => {
    fs.existsSync.mockReturnValue(true);
    const result = validateFile("./pruebadsfs");
    // expect(result).toBe(true);
    expect(result).toBeTruthy();
  });
  test("probar que no existe la ruta", () => {
    fs.existsSync.mockReturnValue(false);
    const result = validateFile("./pruebadsfs");
    expect(result).toBeFalsy();
  });
  test("probar si la ruta es absoluta", () => {
    path.isAbsolute.mockReturnValue(true);
    const pathAbsolute = isAbsolute("./pruebadsfs");
    expect(pathAbsolute).toBeTruthy();
  });
  test("probar si convirtio la ruta", () => {
    path.resolve.mockReturnValue(true);
    const pathConver = converAbsolute("./prueba");
    expect(pathConver).toBeTruthy();
  });
  test("probar si es archivo", () => {
    fs.statSync.mockReturnValue({ isFile: () => true });
    const File = isFile("./prueba");
    expect(File).toBeTruthy();
  });
  test("probar el contenido de un archivo", () => {
    fs.readFile.mockImplementation((path, encoding, callback) => {
      return callback(null, "contenido archivo");
    });

    return getPromisesFiles(
      ["./pruebas/README2.md"],
      ["./pruebas/folder2/README4.md"]
    ).then((resultados) => {
      const resultadoEsperado = [
        { status: "fulfilled", value: "contenido archivo" },
      ];
      expect(resultados).toEqual(resultadoEsperado);
    });
  });

  test("probar que al leer el contenido de un archivo de une rror", () => {
    fs.readFile.mockImplementation((path, encoding, callback) => {
      return callback(true, null);
    });

    return getPromisesFiles(
      ["./pruebas/README2.md"],
      ["./pruebas/folder2/README4.md"]
    ).then((resultados) => {
      const resultadoEsperado = [
        {
          status: "rejected",
          reason: Error("Error reading the file: ./pruebas/README2.md"),
        },
      ];
      expect(resultados).toEqual(resultadoEsperado);
    });
  });

  test("probar que el estatus del link sea ok con status 200", () => {
    const links = [{ href: "https", text: "descripcion", file: "ruta" }];
    const results = [{ status: "fulfilled", value: { status: 200 } }];

    const linkWithStatus = resultLinks(links, results);
    const linkStatusExpect = [
      {
        href: "https",
        text: "descripcion",
        file: "ruta",
        status: 200,
        ok: "ok",
      },
    ];
    expect(linkWithStatus).toEqual(linkStatusExpect);
  });

  // que haga lo mismo solo que status: "rejected"
  test("probar el status del link de 404", () => {
    const links = [{ href: "https", text: "descripcion", file: "ruta" }];
    const results = [{ status: "rejected", value: { status: 404 } }];

    const linkWithStatus = resultLinks(links, results);
    const linkStatusExpect = [
      {
        href: "https",
        text: "descripcion",
        file: "ruta",
        status: 404,
        ok: "fail",
      },
    ];
    expect(linkWithStatus).toEqual(linkStatusExpect);
  });
  test("validar el stats", () => {
    const links = [{ href: "https", text: "descripcion", file: "ruta" }];
    const validacion = validateStats(links);
    expect(validacion).toEqual({ total: 1, unique: 1 });
  });

  test("validar fetch", () => {
    const links = [{ href: "https", text: "descripcion", file: "ruta" }];
    const resultsExpected = [{ status: "fulfilled", value: { status: 200 } }];
    return getPromisesHrefArray(links).then((resultados) => {
      expect(resultados[0].status).toEqual(resultsExpected[0].status);
    });
  });

  test("validar check sin opciones", () => {
    const links = [{ href: "https", text: "descripcion", file: "ruta" }];
    const options = undefined;
    const mockResolve = jest.fn().mockReturnValue([]);
    check(links, options, mockResolve);
    expect(mockResolve).toHaveBeenCalledWith(links);
  });

  test("validar check sin opciones requeridas", () => {
    const links = [{ href: "https", text: "descripcion", file: "ruta" }];
    const options = { novalidate: true };
    const mockResolve = jest.fn().mockReturnValue([]);
    check(links, options, mockResolve);
    expect(mockResolve).toHaveBeenCalledWith("tiene opciones no requeridas");
  });

  test("validar check con opciones validate y stats en false", () => {
    const links = [{ href: "https", text: "descripcion", file: "ruta" }];
    const options = { validate: false, stats: false };
    const mockResolve = jest.fn().mockReturnValue([]);
    check(links, options, mockResolve);
    expect(mockResolve).toHaveBeenCalledWith(links);
  });
});
