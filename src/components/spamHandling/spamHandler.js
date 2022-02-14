const fs = require("fs");
const bayes = require("bayes");

export const handleSpam = async () => {
  const classifier = bayes.fromJson(
    fs.readFileSync("./spam-or-ham-classifier.json")
  );

  return await classifier.categorize("the world");
};
