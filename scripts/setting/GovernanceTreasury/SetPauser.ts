import { ethers } from "hardhat";
import { Misc } from "../../Misc";
import { GovernanceTreasury } from "../../../typechain";

const newOwner = "0x175FB9401BB5E360FF3c0Ef00097116944128930";

async function main() {
  const [deployer, admin] = await ethers.getSigners();

  const treasuryJson = Misc.getContract(await deployer.getChainId(), "GovernanceTreasury");
  if (treasuryJson.address != ethers.constants.AddressZero) {

    let treasury = await ethers.getContractAt(
      "GovernanceTreasury",
      treasuryJson.address,
      admin
    ) as GovernanceTreasury;

    let receipt = await treasury.setOwner(newOwner);
    console.log("setOwner:", receipt.hash);
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
