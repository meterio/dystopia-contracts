import { ethers } from "hardhat";
import { readFileSync, writeFileSync } from "fs";
import { MerkleTree } from "merkletreejs";
import { BigNumber } from "ethers";

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
      "./scripts/setting/proofs/" + users[i].address.toLowerCase() + ".json",
      JSON.stringify(users[i])
    );
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
