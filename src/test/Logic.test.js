import { stringCheck, stringObjectToArray } from "./Logic.js";
import { timeFunction, Ads, getUserData, getQuestions } from "./Logic";
// RYAN TEST START
describe("Tests The difference of time between NOW and posted Date", () => {
  test("when date posted is 2019-01-30T01:37:54.015Z return 103680000", () => {
    expect(timeFunction("2019-01-30T01:37:54.015Z")).toBe(103680000);
  });
});
describe("Tests the random ad to return random ad", () => {
  test("when we want ad name in index 0 we want Pyrofex Corporation ", () => {
    expect(Ads(0)).toBe("Pyrofex Corporation");
  });
});
describe("gather indv user", () => {
  test("user1 not to be anything but HGIRyan", () => {
    expect(getUserData("user1")).not.toBe("Payton Whipple");
  });
});
describe("check if datatype is string", () => {
  test("check if name is string", () => {
    expect(typeof Ads(0)).toBe("string");
  });
});
describe("getting length of returned object with arrays", () => {
  test("when getting interesting have length of 66", () => {
    expect(getQuestions()).not.toBe(66);
  });
});
// RYAN TEST END
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
