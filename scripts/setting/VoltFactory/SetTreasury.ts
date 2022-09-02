import { Deploy } from "../../deploy/Deploy";
import { ethers } from "hardhat";
import { Misc } from "../../Misc";
import { VoltFactory } from "../../../typechain";

const newTreasury = "0xbb7ed4365d2c80e47df533e72bded9642f801ab2";

async function main() {
  const [deployer, admin] = await ethers.getSigners();

  const factoryJson = Misc.getContract(await deployer.getChainId(), "Factory");
  if (factoryJson.address != ethers.constants.AddressZero) {

    let factory = await ethers.getContractAt("VoltFactory", factoryJson.address, admin) as VoltFactory;

    let receipt = await factory.setTreasury(newTreasury);
    console.log("setTreasury:", receipt.hash);
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
