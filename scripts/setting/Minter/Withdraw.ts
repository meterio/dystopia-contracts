import { Deploy } from "../../deploy/Deploy";
import { ethers } from "hardhat";
import { Misc } from "../../Misc";
import { MinterUpgradeable, Volt } from "../../../typechain";

async function main() {
  const [deployer, admin] = await ethers.getSigners();

  const minterjson = Misc.getContract(await deployer.getChainId(), "Minter");
  const tokenJson = Misc.getContract(await deployer.getChainId(), "Token");
  if (minterjson.address != ethers.constants.AddressZero
    && tokenJson != ethers.constants.AddressZero) {
    let minter = await ethers.getContractAt("MinterUpgradeable", minterjson.address, admin) as MinterUpgradeable;
    let token = await ethers.getContractAt("Volt", tokenJson.address, admin) as Volt;
    let balance = await token.balanceOf(minterjson.address);

    let receipt = await minter.withdraw(balance);
    console.info(`withdraw:`, receipt.hash);
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
