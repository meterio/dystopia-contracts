import { ethers } from "hardhat";
import { Bribe } from "../../typechain";
import { readFileSync } from "fs";
import { parseUnits } from "ethers/lib/utils";
import { BigNumber, ContractTransaction, constants } from "ethers";
const mtrg = "0x228ebBeE999c6a7ad74A6130E81b12f9Fe237Ba3";
async function main() {
  const [deployer] = await ethers.getSigners();
  const path = `./scripts/setting/`;
  const file = "Bribes.csv";
  const csv = readFileSync(path + file).toString();
  const line = csv.split(/\r\n/);
  let bribe: Bribe;
  let receipt: ContractTransaction;
  let field: string[];
  let allowance: BigNumber;
  const MTRG = await ethers.getContractAt("Token", mtrg, deployer);

  for (let i = 0; i < line.length; i++) {
    field = line[i].split(",");
    allowance = await MTRG.allowance(deployer.address, field[1]);
    if (allowance.lt(parseUnits(field[2]))) {
      receipt = await MTRG.approve(field[1], constants.MaxUint256);
      console.log("MTRG approve ", field[0], " tx:", receipt.hash);
    }
    bribe = await ethers.getContractAt("Bribe", field[1], deployer);
    receipt = await bribe.notifyRewardAmount(mtrg, parseUnits(field[2]));
    console.log("Refill ", field[0], " tx:", receipt.hash);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
