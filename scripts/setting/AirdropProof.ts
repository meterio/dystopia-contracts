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
    hashArr[i] = ethers.utils.defaultAbiCoder.encode(
      ["uint256", "address"],
      [BigNumber.from(users[i].amount), users[i].address]
    );
  }

  const leaves = hashArr.map((x) => ethers.utils.keccak256(x));
  const tree = new MerkleTree(leaves, ethers.utils.keccak256, { sort: true });
  const root = "0x" + tree.getRoot().toString("hex");

  for (let i = 0; i < users.length; i++) {
    const leaf = ethers.utils.keccak256(hashArr[i]);
    const proof = tree.getHexProof(leaf);
    console.log("verify:", tree.verify(proof, leaf, root));
    console.log("proof", proof);
    users[i].proof = proof;
  }
  leavesJson.users = users;
  leavesJson.root = root;
  jsonArr[leavesIndex] = leavesJson;
  writeFileSync(json, JSON.stringify(jsonArr));

  console.log("root", root);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
