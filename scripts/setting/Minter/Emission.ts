import { Deploy } from "../../deploy/Deploy";
import { ethers } from "hardhat";
import { Misc } from "../../Misc";
import { MinterUpgradeable } from "../../../typechain";
import { parseUnits } from "ethers/lib/utils";

const VeDistPerWeek = parseUnits('100');
const VoterPerWeek = parseUnits('900');

async function main() {
  const [deployer, admin] = await ethers.getSigners();

  const minterjson = Misc.getContract(await deployer.getChainId(), "Minter");
  if (minterjson.address != ethers.constants.AddressZero) {
    let minter = await ethers.getContractAt("MinterUpgradeable", minterjson.address, admin) as MinterUpgradeable;

    let receipt = await minter.adminSetVeDistPerWeek(VeDistPerWeek);
    console.info(`adminSetVeDistPerWeek:`, receipt.hash);
    receipt = await minter.adminSetVoterPerWeek(VoterPerWeek);
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
