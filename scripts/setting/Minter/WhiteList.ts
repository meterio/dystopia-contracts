import { ethers } from "hardhat";
import { Misc } from "../../Misc";
import { MinterUpgradeable } from "../../../typechain";

const tokenAddress = "0x160361ce13ec33C993b5cCA8f62B6864943eb083"; // WMTR meter main

async function main() {
  const [deployer, admin] = await ethers.getSigners();

  const minterjson = Misc.getContract(await deployer.getChainId(), "Minter");
  if (minterjson.address != ethers.constants.AddressZero) {
    let minter = await ethers.getContractAt("MinterUpgradeable", minterjson.address, admin) as MinterUpgradeable;

    let receipt = await minter.whiteList([tokenAddress]);
    console.info(`whiteList:`, receipt.hash);
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