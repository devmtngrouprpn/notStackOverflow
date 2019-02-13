import { timeFunction, Ads, getUserData, getQuestions } from "./Logic";
// RYAN TEST START
describe("Tests The difference of time between NOW and posted Date", () => {
  test("when date posted is 2019-01-30T01:37:54.015Z return 103680000", () => {
    expect(timeFunction("2019-01-30T01:37:54.015Z")).toBe(103680000);
  });
});
describe("Tests the random ad to return random ad", () => {
  test("when we want ad name in index 0 we want Pyrofex Corporation ", () => {
    expect(Ads(0).name).toBe("Pyrofex Corporation");
  });
});
describe("gather indv user", () => {
  test("user1 not to be anything but HGIRyan", () => {
    expect(getUserData("user1")).not.toBe("Payton Whipple");
  });
});
describe("", () => {
  test("", () => {
    expect().toBe();
  });
});
describe("", () => {
  test("", () => {
    expect(getQuestions()).toHaveLength(66);
  });
});
// RYAN TEST END
import { stringCheck } from "./Logic.js";

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

  test("", () => {});
});
