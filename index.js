const fs = require("fs");

const args = process.argv;
const path = args[2];
let keys = args;

try {
  for (let index = 0; index < 3; index++) {
    keys.shift();
  }

  let dir = path.split("/");
  dir.pop();

  let filename = keys.pop();
  dir = dir.join("/") + "/";

  const content = fs.readFileSync(path, "utf-8");
  const datas = JSON.parse(content);

  fs.writeFileSync(
    dir+filename,
    JSON.stringify(datas.map((data) => {
      let row = {};
      keys.forEach((key) => {
        if (!data[key]) {
          return;
        }
        row = {
          ...row,
          [key]: data[key],
        };
      });
      return row;
    }))
  );
  
} catch (exception) {
  console.log("Erreur !", exception);
  return;
}
