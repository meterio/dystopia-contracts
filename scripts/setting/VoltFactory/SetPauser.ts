import { Deploy } from "../../deploy/Deploy";
import { ethers } from "hardhat";
import { Misc } from "../../Misc";
import { VoltFactory } from "../../../typechain";

const newPauser = "0x175FB9401BB5E360FF3c0Ef00097116944128930";

async function main() {
  const [deployer, admin] = await ethers.getSigners();

  const factoryJson = Misc.getContract(await deployer.getChainId(), "Factory");
  if (factoryJson.address != ethers.constants.AddressZero) {

    let factory = await ethers.getContractAt("VoltFactory", factoryJson.address, admin) as VoltFactory;

    let receipt = await factory.setPauser( newPauser );
    console.log("setPauser:",receipt.hash);
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
