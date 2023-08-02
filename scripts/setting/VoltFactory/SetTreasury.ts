import { Deploy } from "../../deploy/Deploy";
import { ethers } from "hardhat";
import { Misc } from "../../Misc";
import { VoltFactory } from "../../../typechain";

const newTreasury = "0x5C85A7Ae2B6d29C38cdF360553F8aCBC4e684c31";

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
