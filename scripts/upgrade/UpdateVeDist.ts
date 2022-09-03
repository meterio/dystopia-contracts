import { Deploy } from "../deploy/Deploy";
import { ethers } from "hardhat";
import { Misc } from "../Misc";
import { VeDistUpgradeable, TransparentUpgradeableProxy } from "../../typechain";

async function main() {
  const [deployer, admin] = await ethers.getSigners();

  const veDistJson = Misc.getContract(await deployer.getChainId(), "VeDist");
  if (veDistJson.address != ethers.constants.AddressZero) {

    let veDistImpl = await Deploy.deployContract(deployer, "VeDistUpgradeable") as VeDistUpgradeable;

    let veDistProxy = await ethers.getContractAt("TransparentUpgradeableProxy", veDistJson.address, deployer) as TransparentUpgradeableProxy;

    let receipt = await veDistProxy.upgradeTo(
      veDistImpl.address,
    );
    console.log("upgradeTo:", receipt.hash);

    const data = ''
      + 'update to: ' + veDistImpl.address + '\n'

    console.log(data);
    Misc.saveFile(await deployer.getChainId(), "VeDistImpl", veDistImpl.address);
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
