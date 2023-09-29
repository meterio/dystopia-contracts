import { readFileSync, writeFileSync } from "fs";

const json = "./scripts/setting/leaves.json";
const leavesIndex = 0;

async function main() {
  let jsonArr = JSON.parse(readFileSync(json).toString());
  let leavesJson = jsonArr[leavesIndex];
  let hashArr: any[] = [];
  let users = leavesJson.users;
  for (let i = 0; i < users.length; i++) {
    console.log(users[i]);
    writeFileSync(
      "./scripts/setting/proofs2/" + users[i].address.toLowerCase() + ".json",
      JSON.stringify(users[i], null, 2)
    );
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
