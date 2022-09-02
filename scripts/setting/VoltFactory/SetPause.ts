import { Deploy } from "../../deploy/Deploy";
import { ethers } from "hardhat";
import { Misc } from "../../Misc";
import { VoltFactory } from "../../../typechain";

async function main() {
  const [deployer, admin] = await ethers.getSigners();

  const factoryJson = Misc.getContract(await deployer.getChainId(), "Factory");
  if (factoryJson.address != ethers.constants.AddressZero) {

    let factory = await ethers.getContractAt("VoltFactory", factoryJson.address, admin) as VoltFactory;
    let pause = await factory.isPaused();
    console.log("isPaused:", pause);
    let receipt = await factory.setPause(!pause);
    console.log("setPause:", receipt.hash);
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
