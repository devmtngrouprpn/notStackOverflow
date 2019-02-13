import { stringCheck } from "./Logic.js";
import { compareTwoStrings } from "string-similarity";

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

  test("returns an array", () => {
    expect(Array.isArray(stringCheck("react", dummyTags))).toBe(true);
  });

  test("returns one or more items", () => {
    expect(stringCheck("react", dummyTags).length >= 1).toBe(true);
  });

  test("functions with only a partial string", () => {
    expect(stringCheck("re", dummyTags).length >= 1).toBe(true);
  });

  test("returns similar strings", () => {
    let res = stringCheck("react", dummyTags);
    res.forEach(tag => {
      expect(compareTwoStrings(tag.target, "react") > 0).toBe(true);
    });
  });

  test("gets highest similarity strings", () => {
    let tagSimilarity = dummyTags.map(tag => compareTwoStrings("react", tag));
    let topTag = stringCheck("react", dummyTags)[0].rating;
    expect(Math.max(...tagSimilarity) === topTag);
  });
});
