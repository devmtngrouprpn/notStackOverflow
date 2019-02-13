import { stringCheck, stringObjectToArray } from "./Logic.js";
describe("testing a string similarity function", () => {
  const dummyTags = [
    "react",
    "redux",
    "javascript",
    "EMCAscript",
    "randomTag",
    "reactjs",
    "wordpress",
    "facebook"
  ];

  test("returns an object", () => {
    expect(typeof stringCheck("react", dummyTags)).toBe("object");
  });

  test("returns one or more items", () => {
    expect(stringCheck("react", dummyTags).length >= 1).toBe(true);
  });

  test("functions with only a partial string", () => {
    expect(stringCheck("re", dummyTags).length >= 1).toBe(true);
  });

  test("", () => { });
});


//McCoy's tests
test('returns an array', () => {
  expect(Array.isArray(stringObjectToArray('{heyo,lol}'))).toBe(true);
})
test('returns correct parsed array', () => {
  expect(stringObjectToArray('{heyo,lol}')).toEqual(['heyo', 'lol']);
})
test('can handle strings', () => {
  expect(stringObjectToArray('heyo,lol')).toEqual(['heyo', 'lol']);
})
test('can handle large objects', () => {
  expect(stringObjectToArray)
})