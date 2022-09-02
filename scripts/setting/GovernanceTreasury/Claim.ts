import { ethers } from "hardhat";
import { Misc } from "../../Misc";
import { GovernanceTreasury } from "../../../typechain";
import { readFileSync } from "fs";

async function main() {
  const [deployer, admin] = await ethers.getSigners();
  const chainId = await deployer.getChainId();
  const path = `../../Addresses/${chainId}/`;
  const file = 'Tokens.json';
  const TokenJson = JSON.parse(readFileSync(path + file).toString());

  const treasuryJson = Misc.getContract(await deployer.getChainId(), "GovernanceTreasury");
  if (treasuryJson.address != ethers.constants.AddressZero) {

    let treasury = await ethers.getContractAt(
      "GovernanceTreasury",
      treasuryJson.address,
      admin
    ) as GovernanceTreasury;

    let receipt = await treasury.claim(TokenJson);
    console.log("claim:", receipt.hash);
  } else {
    console.log("No factory address")
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
