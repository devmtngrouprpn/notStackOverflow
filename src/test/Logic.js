import stringSimilarity from "string-similarity";

export function stringCheck(value, tagNames) {
  let object = stringSimilarity.findBestMatch(value, tagNames);
  object = object.ratings
    .sort((a, b) => {
      return a.rating * 100 - b.rating * 100;
    })
    .reverse()
    .filter(a => a.rating > 0);
  object = object.slice(0, 6);
  return object;
}
