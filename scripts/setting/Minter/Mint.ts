import { ethers } from "hardhat";
import { Misc } from "../../Misc";
import { MinterUpgradeable } from "../../../typechain";
import { parseUnits } from "ethers/lib/utils";

const receiver = "0x175FB9401BB5E360FF3c0Ef00097116944128930";
const amount = parseUnits('100000');

async function main() {
  const [deployer, admin] = await ethers.getSigners();

  const minterjson = Misc.getContract(await deployer.getChainId(), "Minter");
  if (minterjson.address != ethers.constants.AddressZero) {
    let minter = await ethers.getContractAt("MinterUpgradeable", minterjson.address, admin) as MinterUpgradeable;

    let receipt = await minter.mint(receiver, amount);
    console.info(`mint:`, receipt.hash);
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
