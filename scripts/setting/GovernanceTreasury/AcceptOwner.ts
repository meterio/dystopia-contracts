import { ethers } from "hardhat";
import { Misc } from "../../Misc";
import { GovernanceTreasury } from "../../../typechain";

async function main() {
  const [deployer, admin] = await ethers.getSigners();

  const treasuryJson = Misc.getContract(await deployer.getChainId(), "GovernanceTreasury");
  if (treasuryJson.address != ethers.constants.AddressZero) {

    let treasury = await ethers.getContractAt(
      "GovernanceTreasury",
      treasuryJson.address,
      admin
    ) as GovernanceTreasury;

    let receipt = await treasury.acceptOwner();
    console.log("acceptOwner:", receipt.hash);
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
