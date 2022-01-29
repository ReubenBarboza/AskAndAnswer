const fs = require("fs");
const bayes = require("bayes");

(async () => {
  const classifier = bayes.fromJson(
    fs.readFileSync("./spam-or-ham-classifier.json")
  );

  console.log(await classifier.categorize("the world"));
})();
