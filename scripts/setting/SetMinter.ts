import { Deploy } from "../deploy/Deploy";
import { ethers } from "hardhat";
import { Misc } from "../Misc";
import { MinterUpgradeable, TransparentUpgradeableProxy } from "../../typechain";
import { parseUnits } from "ethers/lib/utils";

async function main() {
  const [deployer, admin] = await ethers.getSigners();

  const minterjson = Misc.getContract(await deployer.getChainId(), "Minter");
  if (minterjson.address != ethers.constants.AddressZero) {
    let minter = await ethers.getContractAt("MinterUpgradeable", minterjson.address, admin) as MinterUpgradeable;

    let receipt = await minter.adminSetVeDistPerWeek(parseUnits('30000'));
    console.info(`adminSetVeDistPerWeek:`, receipt.hash);
    receipt = await minter.adminSetVoterPerWeek(parseUnits('70000'));
    console.info(`adminSetVoterPerWeek:`, receipt.hash);
  } else {
    console.log("No Minter address")
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
